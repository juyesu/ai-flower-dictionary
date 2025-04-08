import { useState, ChangeEvent, DragEvent } from 'react'
import { CustomMobileNet } from '@teachablemachine/image'
import { fetchChatGptResponse } from '@/utils/fetchChatGptResponse'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useRouter } from 'next/router'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import usePlantDetectionModelLoad from '@/components/ai-flower-detection/hooks/usePlantDetectionModelLoad'

const useFileUploadModel = () => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileUrl, setUploadedFileUrl] = useState('')
  const [model, setModel] = useState<CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [useGptResponse, setUseGptResponse] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { data, isLoading, error } = usePlantIndexFetchData(1, 300)
  const { setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()
  usePlantDetectionModelLoad({
    model,
    setModel,
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
      alert('지원하지 않는 파일 형식입니다.')
      return
    }

    setUploadedFileName(file.name)
    setUploadedFileUrl(URL.createObjectURL(file))
    setIsAnalyzing(true)
    setLabel('')
    setUseGptResponse(false)
    setImage(file)
    predict(file)
  }

  const predict = async (file: File) => {
    if (model) {
      const imgURL = URL.createObjectURL(file)
      const img = new Image()
      img.src = imgURL

      img.onload = async () => {
        const predictions = await model.predict(img)
        let highestPrediction = { className: '', probability: 0 }

        for (let i = 0; i < maxPredictions; i++) {
          const className = predictions[i].className
          const probability = Number(predictions[i].probability.toFixed(2))

          if (probability > highestPrediction.probability) {
            highestPrediction = { className, probability }
          }
        }

        if (highestPrediction.probability > 0.7) {
          setImageUrl(imgURL)
          setFlowerName(highestPrediction.className)
          checkPlantMatch(highestPrediction.className)
        } else {
          setIsAnalyzing(false)
          setLabel('일치하는 꽃을 발견하지 못했습니다.')
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
          sort: 'file',
        },
      })
    } else {
      try {
        const gptResponse = await fetchChatGptResponse(className)
        setUseGptResponse(true)
        setLabel(gptResponse)
      } catch {
        setLabel('인공지능 생성 답변을 불러오는데 실패하였습니다.')
        console.error('GPT API 호출 실패:', error)
      }
    }
    setIsAnalyzing(false)
  }

  return {
    uploadedFileUrl,
    isAnalyzing,
    image,
    useGptResponse,
    flowerName,
    label,
    uploadedFileName,
    handleFileChange,
  }
}

export default useFileUploadModel
