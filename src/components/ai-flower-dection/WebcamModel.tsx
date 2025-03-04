import React, { useEffect, useState } from 'react'
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
  const consecutiveMatchCountRef = React.useRef(0)
  const { imageUrl, setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (!model) {
          const loadedModel = await tmImage.load(
            '/plants_detection_model/model.json',
            '/plants_detection_model/metadata.json'
          )
          setModel(loadedModel)
          setMaxPredictions(loadedModel.getTotalClasses())
        }
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

  const checkPlantMatch = (className: string) => {
    const matchedPlant = data?.krnmList?.find(
      (name: string) => name === className
    )

    if (matchedPlant) {
      router.push({
        pathname: `/view/${matchedPlant}`,
        query: { prevPage: 'ai-flower-detection', sort: 'webcam' },
      })
      setUseWebcam(false)
    } else {
      setLabel(
        `인식한 식물은 ${className}입니다. 해당 식물에 대한 데이터는 현재 존재하지 않습니다.`
      )
      setUseWebcam(false)
    }
  }

  const handleWebcamCapture = React.useCallback(() => {
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

  const webcamRef = React.useRef<Webcam | null>(null)

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
        {highestPrediction.className && (
          <p className="mt-12 w-full text-center text-xl font-semibold text-zinc-800">
            {label}
          </p>
        )}
        <button
          type="button"
          className="my-16 flex items-center justify-center w-[5.5rem] h-[5.5rem] bg-zinc-300 border border-zinc-400 rounded-full"
          onClick={() => setUseWebcam(!useWebcam)}
          aria-label="카메라 실행"
        >
          <img src="/images/camera.png" className="w-12 h-auto" />
        </button>
      </div>
    </>
  )
}

export default WebcamModel
