import { useState, ChangeEvent, DragEvent } from 'react'
import { CustomMobileNet } from '@teachablemachine/image'
import { fetchChatGptResponse } from '@/utils/fetchChatGptResponse'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useRouter } from 'next/router'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import usePlantDetectionModelLoad from '@/components/ai-flower-detection/hooks/usePlantDetectionModelLoad'
import { useModalStore } from '@/store/useModalStore'

const useFileUploadModel = () => {
  const [uploadedImage, setUploadedImage] = useState({ name: '', url: '' })
  const [plantDetectionModel, setPlantDetectionModel] =
    useState<CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [plantDescription, setPlantDescription] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [useGptResponse, setUseGptResponse] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { data, isLoading, error } = usePlantIndexFetchData(1, 300)
  const { setCapturedImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()
  const { openModal } = useModalStore()
  usePlantDetectionModelLoad({
    plantDetectionModel,
    setPlantDetectionModel,
    setMaxPredictions,
    data,
    isLoading,
    error,
  })

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) => {
    let file: File | null = null

    if ('dataTransfer' in event) {
      file = event.dataTransfer.files?.[0] ?? null
    } else if ('target' in event && event.target instanceof HTMLInputElement) {
      file = event.target.files?.[0] ?? null
    }

    if (!file) return

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!validTypes.includes(file.type)) {
      openModal({ type: 'ALERT', message: '지원하지 않는 파일 형식입니다.' })
      return
    }

    setUploadedImage({ name: file.name, url: URL.createObjectURL(file) })
    setIsAnalyzing(true)
    setPlantDescription('')
    setUseGptResponse(false)
    setImage(file)
    predict(file)
  }

  const predict = async (file: File) => {
    if (plantDetectionModel) {
      const imgURL = URL.createObjectURL(file)
      const img = new Image()
      img.src = imgURL

      img.onload = async () => {
        const predictions = await plantDetectionModel.predict(img)
        let highestPrediction = { className: '', probability: 0 }

        for (let i = 0; i < maxPredictions; i++) {
          const className = predictions[i].className
          const probability = Number(predictions[i].probability.toFixed(2))

          if (probability > highestPrediction.probability) {
            highestPrediction = { className, probability }
          }
        }

        if (highestPrediction.probability > 0.7) {
          setCapturedImageUrl(imgURL)
          setFlowerName(highestPrediction.className)
          checkPlantMatch(highestPrediction.className)
        } else {
          setIsAnalyzing(false)
          setPlantDescription('일치하는 꽃을 발견하지 못했습니다.')
        }
      }
    }
  }

  const checkPlantMatch = async (className: string) => {
    const matchedPlant = data?.krnmList?.find(
      (name: string) => name === className
    )

    if (matchedPlant) {
      sessionStorage.setItem('cameFromAiFlowerDetection', 'true')
      router.push({
        pathname: '/view/plant-detail',
        query: {
          plantName: matchedPlant,
          prevPage: 'ai-flower-detection',
          sort: 'imageUpload',
        },
      })
    } else {
      try {
        const gptResponse = await fetchChatGptResponse(className)
        setUseGptResponse(true)
        setPlantDescription(gptResponse)
      } catch {
        setPlantDescription('인공지능 생성 답변을 불러오는데 실패하였습니다.')
        console.error('GPT API 호출 실패:', error)
      }
    }
    setIsAnalyzing(false)
  }

  return {
    uploadedImage,
    isAnalyzing,
    image,
    useGptResponse,
    flowerName,
    plantDescription,
    handleFileChange,
  }
}

export default useFileUploadModel
