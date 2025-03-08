import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import Webcam from 'react-webcam'
import * as tmImage from '@teachablemachine/image'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { AIModelProps } from '@/types/type'
import { useCapturedPlantImageStore } from '@/store/imageStore'

const WebcamModel = ({ AIErrorModalOpen }: AIModelProps) => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [useWebcam, setUseWebcam] = useState(false)
  const [highestPrediction, setHighestPrediction] = useState({
    className: '',
    probability: 0.0,
  })
  const { data, isLoading, error } = plantIndexFetchData(1, 300)
  const consecutiveMatchCountRef = useRef(0)
  const isGptFetchingRef = useRef(false)
  const { imageUrl, setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()

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

  const fetchChatGptResponse = async (plantName: string) => {
    const API_URL = process.env.NEXT_PUBLIC_CHATGPT_API_URL
    const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                '당신은 식물 전문가입니다. 사용자가 제공한 식물에 대해 간단한 설명을 150자 이내로 제공하세요.',
            },
            {
              role: 'user',
              content: `${plantName} 식물에 대해 간단히 150자 이내로 설명해줘.`,
            },
          ],
          max_tokens: 150,
          stop: ['\n\n'],
        }),
      })

      const data = await response.json()
      return (
        data?.choices?.[0]?.message?.content || '식물 정보를 찾을 수 없습니다.'
      )
    } catch (error) {
      console.error('ChatGPT API 호출 오류:', error)
      return '식물 정보를 가져오는 데 실패했습니다.'
    }
  }

  const checkPlantMatch = async (className: string) => {
    if (isGptFetchingRef.current) return
    isGptFetchingRef.current = true
    const matchedPlant = data?.krnmList?.find(
      (name: string) => name === className
    )

    if (matchedPlant) {
      sessionStorage.setItem('cameFromAiFlowerDetection', 'true')
      router.push({
        pathname: `/view/${matchedPlant}`,
        query: { prevPage: 'ai-flower-detection', sort: 'webcam' },
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

  const webcamRef = useRef<Webcam | null>(null)

  useEffect(() => {
    console.log('webcam 가동:', useWebcam)
    if (useWebcam) {
      const interval = setInterval(() => {
        handleWebcamCapture()
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [useWebcam, handleWebcamCapture])

  return (
    <>
      <div className="flex flex-col items-center px-80 w-full">
        <div
          id="webcam-container"
          className="flex mt-6 w-full max-w-[832px] max-h-[624px] aspect-[4/3] border border-2 border-zinc-500 bg-zinc-100 rounded"
        >
          {useWebcam && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: 'user',
              }}
            />
          )}
          {!useWebcam && flowerName && imageUrl && (
            <img src={imageUrl} alt="촬영된 이미지" className="w-full h-full" />
          )}
        </div>
        {useWebcam && (
          <p className="mt-6 text-2xl font-semibold text-center">
            예측이 진행중입니다... 현재
            <span
              className={`ml-1.5 font-bold
            ${
              highestPrediction.probability <= 0.5
                ? 'text-zinc-500'
                : highestPrediction.probability < 0.7
                ? 'text-lime-500'
                : highestPrediction.probability < 0.95
                ? 'text-cyan-400'
                : 'text-amber-300'
            }
          `}
            >
              {highestPrediction.probability * 100}%
            </span>
            의 확률로
            <span className="ml-1.5 bold text-fuchsia-400">
              {highestPrediction.className}
            </span>
            식물로 예측하고 있습니다.
          </p>
        )}
        {highestPrediction.className && flowerName && !useWebcam && (
          <div>
            <p className="mt-12 text-zinc-400 text-center">
              ※ 인덱스에 식물 정보가 존재하지 않아, 인공지능 생성 답변으로 대체
              됩니다.
            </p>
            <p className="mt-2 w-full text-center text-3xl font-bold text-cyan-600">
              예측 결과 : {flowerName}
            </p>
            <p className="mt-6 text-center text-lg">{label}</p>
          </div>
        )}
        <button
          type="button"
          className="my-16 flex items-center justify-center w-[5.5rem] h-[5.5rem] bg-zinc-300 border border-zinc-400 rounded-full"
          onClick={() => {
            setUseWebcam(!useWebcam)
            setFlowerName('')
            setLabel('')
            isGptFetchingRef.current = false
          }}
          aria-label="카메라 실행"
        >
          <img src="/images/camera.png" className="w-12 h-auto" />
        </button>
      </div>
    </>
  )
}

export default WebcamModel
