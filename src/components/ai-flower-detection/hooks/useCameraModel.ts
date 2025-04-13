import { useEffect, useRef, useState, useCallback, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import * as tmImage from '@teachablemachine/image'
import { fetchChatGptResponse } from '@/utils/fetchChatGptResponse'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import usePlantDetectionModelLoad from '@/components/ai-flower-detection/hooks/usePlantDetectionModelLoad'

const useCameraModel = () => {
  const [plantDetectionModel, setPlantDetectionModel] =
    useState<tmImage.CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [plantDescription, setPlantDescription] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [useWebcam, setUseWebcam] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [highestPrediction, setHighestPrediction] = useState({
    className: '',
    probability: 0.0,
  })
  const { data, isLoading, error } = usePlantIndexFetchData(1, 300)
  const consecutiveMatchCountRef = useRef(0)
  const isGptFetchingRef = useRef(false)
  const { capturedImageUrl, setCapturedImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()
  const cameraRef = useRef<Webcam | null>(null)
  usePlantDetectionModelLoad({
    plantDetectionModel,
    setPlantDetectionModel,
    setMaxPredictions,
    data,
    isLoading,
    error,
  })

  // 모바일 환경
  const isMobileDevice = () => {
    if (typeof navigator !== 'undefined') {
      return /Mobi|Android/i.test(navigator.userAgent)
    }
    return false
  }

  useEffect(() => {
    if (highestPrediction.probability > 0.7) {
      setFlowerName(highestPrediction.className)
    }
  }, [highestPrediction])

  const processPredictions = (
    predictions: { className: string; probability: number }[],
    imgSrc: string | null
  ) => {
    let tempHighestPrediction = { className: '', probability: 0 }

    for (let i = 0; i < maxPredictions; i++) {
      const className = predictions[i].className
      const probability = Number(predictions[i].probability.toFixed(2))

      if (probability > tempHighestPrediction.probability) {
        tempHighestPrediction = { className, probability }
        setHighestPrediction(tempHighestPrediction)
      }
    }

    if (tempHighestPrediction.probability > 0.7) {
      setFlowerName((prevName) => {
        if (prevName === tempHighestPrediction.className) {
          consecutiveMatchCountRef.current += 1
          if (consecutiveMatchCountRef.current >= 3) {
            checkPlantMatch(tempHighestPrediction.className)
            if (imgSrc) {
              setCapturedImageUrl(imgSrc)
            }
          }
        } else {
          consecutiveMatchCountRef.current = 1
        }
        return tempHighestPrediction.className
      })
    } else {
      consecutiveMatchCountRef.current = 0
    }
  }

  const checkPlantMatch = async (className: string) => {
    if (isGptFetchingRef.current) return
    isGptFetchingRef.current = true
    setIsAnalyzing(true)
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
          sort: 'camera',
        },
      })
      setUseWebcam(false)
    } else {
      try {
        const gptResponse = await fetchChatGptResponse(className)
        setPlantDescription(gptResponse)
      } catch {
        setPlantDescription('인공지능 생성 답변을 불러오는데 실패하였습니다.')
        console.error('GPT API 호출 실패:', error)
      } finally {
        setUseWebcam(false)
      }
    }
    setIsAnalyzing(false)
  }

  const handleWebcamCapture = useCallback(() => {
    if (useWebcam && cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot()
      if (imageSrc) {
        const img = new Image()
        img.src = imageSrc

        img.onload = async () => {
          if (plantDetectionModel) {
            const predictions = await plantDetectionModel.predict(img)
            processPredictions(predictions, img.src)
          }
        }
      }
    }
  }, [plantDetectionModel, useWebcam])

  useEffect(() => {
    console.log('webcam 가동:', useWebcam)
    if (useWebcam) {
      const interval = setInterval(() => {
        handleWebcamCapture()
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [useWebcam, handleWebcamCapture])

  // 모바일 환경
  const handleMobileCapture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imgURL = URL.createObjectURL(file)
      const img = new Image()
      img.src = imgURL

      img.onload = async () => {
        if (plantDetectionModel) {
          const predictions = await plantDetectionModel.predict(img)
          processPredictions(predictions, img.src)
        }
      }
    }
  }

  return {
    isMobileDevice,
    useWebcam,
    setUseWebcam,
    cameraRef,
    flowerName,
    setFlowerName,
    capturedImageUrl,
    plantDescription,
    setPlantDescription,
    isGptFetchingRef,
    isAnalyzing,
    highestPrediction,
    handleMobileCapture,
  }
}

export default useCameraModel
