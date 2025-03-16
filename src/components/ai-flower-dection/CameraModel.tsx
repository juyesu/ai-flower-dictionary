import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import * as tmImage from '@teachablemachine/image'
import * as tf from '@tensorflow/tfjs'
import NextImage from 'next/image'
import { fetchChatGptResponse } from '@/utils/fetchChatGptResponse'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { AIModelProps } from '@/types/type'
import { useCapturedPlantImageStore } from '@/store/imageStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const CameraModel = ({ AIErrorModalOpen }: AIModelProps) => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [useWebcam, setUseWebcam] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [highestPrediction, setHighestPrediction] = useState({
    className: '',
    probability: 0.0,
  })
  const { data, isLoading, error } = plantIndexFetchData(1, 300)
  const consecutiveMatchCountRef = useRef(0)
  const isGptFetchingRef = useRef(false)
  const { imageUrl, setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()
  const webcamRef = useRef<Webcam | null>(null)

  // 모바일 환경
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent)
  }

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (model) return

        const loadedModel = await tmImage.load(
          '/plants_detection_model/model.json',
          '/plants_detection_model/metadata.json'
        )

        setModel(loadedModel)
        setMaxPredictions(loadedModel.getTotalClasses())
      } catch (modelError) {
        console.error('Error loading model:', modelError)
        if (!isLoading && (!data || modelError || error)) {
          model?.dispose()
          tf.engine().disposeVariables()
          setModel(null)
          AIErrorModalOpen()
        }
      }
    }

    loadModel()
  }, [model])

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
              setImageUrl(imgSrc)
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
        pathname: `/view/${matchedPlant}`,
        query: { prevPage: 'ai-flower-detection', sort: 'camera' },
      })
      setUseWebcam(false)
    } else {
      try {
        const gptResponse = await fetchChatGptResponse(className)
        setLabel(gptResponse)
      } catch {
        setLabel('인공지능 생성 답변을 불러오는데 실패하였습니다.')
        console.error('GPT API 호출 실패:', error)
      } finally {
        setUseWebcam(false)
      }
    }
    setIsAnalyzing(false)
  }

  const handleWebcamCapture = useCallback(() => {
    if (useWebcam && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const img = new Image()
        img.src = imageSrc

        img.onload = async () => {
          if (model) {
            const predictions = await model.predict(img)
            processPredictions(predictions, img.src)
          }
        }
      }
    }
  }, [model, useWebcam])

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
        if (model) {
          const predictions = await model.predict(img)
          processPredictions(predictions, img.src)
        }
      }
    }
  }

  return (
    <div className="flex w-full flex-col items-center px-80">
      <div
        id="camera-display-container"
        className="relative mt-6 flex aspect-[4/3] max-h-[624px] w-full max-w-[832px] rounded border-2 border-zinc-500 bg-zinc-100 dark:bg-gray-800"
      >
        {useWebcam && (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="h-full w-full"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user',
            }}
          />
        )}
        {!useWebcam && flowerName && imageUrl && (
          <NextImage
            src={imageUrl}
            alt="촬영된 이미지"
            className="h-full w-full"
            width={832}
            height={624}
          />
        )}
        {isAnalyzing && <LoadingSpinner />}
      </div>
      {useWebcam && (
        <p className="mt-6 text-center text-2xl font-semibold">
          예측이 진행중입니다... 현재
          <span
            className={`ml-1.5 font-bold ${
              highestPrediction.probability <= 0.5
                ? 'text-zinc-500'
                : highestPrediction.probability < 0.7
                  ? 'text-lime-500'
                  : highestPrediction.probability < 0.95
                    ? 'text-cyan-400'
                    : 'text-amber-300'
            } `}
          >
            {highestPrediction.probability * 100}%
          </span>
          의 확률로
          <span className="bold ml-1.5 text-fuchsia-400">
            {highestPrediction.className}
          </span>
          식물로 예측하고 있습니다.
        </p>
      )}
      {highestPrediction.className && flowerName && !useWebcam && (
        <div>
          <p className="mt-12 text-center text-zinc-400">
            ※ 인덱스에 식물 정보가 존재하지 않아, 인공지능 생성 답변으로 대체
            됩니다.
          </p>
          <p className="mt-2 w-full text-center text-3xl font-bold text-cyan-600">
            예측 결과 : {flowerName}
          </p>
          <p className="mt-6 text-center text-lg">{label}</p>
        </div>
      )}
      {!isMobileDevice() ? (
        <button
          type="button"
          className="my-16 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-zinc-400 bg-zinc-300 dark:bg-zinc-500"
          onClick={() => {
            setUseWebcam(!useWebcam)
            setFlowerName('')
            setLabel('')
            isGptFetchingRef.current = false
          }}
          aria-label="카메라 실행"
        >
          <NextImage
            src="/images/camera.png"
            alt=""
            className="h-auto w-12"
            aria-hidden="true"
            width={48}
            height={48}
          />
        </button>
      ) : (
        <>
          <label
            htmlFor="cameraInput"
            className="my-8 flex h-[3rem] w-[7rem] cursor-pointer items-center justify-center rounded-full border border-zinc-400 bg-zinc-300 px-1.5 py-0.5 dark:bg-zinc-500"
          >
            <NextImage
              src="/images/camera.png"
              alt=""
              className="h-auto w-6"
              aria-hidden="true"
              width={24}
              height={24}
            />
            카메라 열기
          </label>
          <input
            type="file"
            id="cameraInput"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleMobileCapture}
          />
        </>
      )}
    </div>
  )
}

export default CameraModel
