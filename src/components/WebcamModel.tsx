'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as tmImage from '@teachablemachine/image'
import styles from './../../styles/ItemList.module.css'
import { CustomMobileNet } from '@teachablemachine/image'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem } from '@/types/type'
import Link from 'next/link'

const WebcamModel = () => {
  const [model, setModel] = useState<CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerDetails, setFlowerDetails] = useState({
    name: '',
    meaning: '',
    season: '',
  })
  const [isPredicting, setIsPredicting] = useState(false)

  const webcamRef = useRef<tmImage.Webcam | null>(null)

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (!model) {
          // 모델이 이미 로드된 상태인지 확인
          const loadedModel = await tmImage.load(
            process.env.NEXT_PUBLIC_TEACHABLE_MACHINE_MODEL_API_URL,
            process.env.NEXT_PUBLIC_TEACHABLE_MACHINE_METADATA_API_URL
          )
          setModel(loadedModel)
          setMaxPredictions(loadedModel.getTotalClasses())
          console.log('Model loaded successfully.')
        }
      } catch (error) {
        console.error('Model loading failed: ', error)
      }
    }

    loadModel()
  }, [model]) // model이 변경될 때만 useEffect 실행

  const { data, isLoading } = plantIndexFetchData()
  const famlNmList = data?.data.response.body.items.item.map(
    (item: PlantIndexItem) => {
      return item.famlNm
    }
  )

  if (isLoading) return

  const initWebcam = async () => {
    const flip = true
    const webcam = new tmImage.Webcam(200, 200, flip)

    try {
      await webcam.setup()
      console.log('Webcam setup complete.')
      await webcam.play()

      webcamRef.current = webcam
      window.requestAnimationFrame(loop)

      webcam.canvas.style.width = '100%'

      document.getElementById('webcam-container')?.appendChild(webcam.canvas)
    } catch (error) {
      console.error('Webcam initialization failed: ', error)
    }
  }

  const loop = async () => {
    if (webcamRef.current) {
      webcamRef.current.update()
      await predict()
      window.requestAnimationFrame(loop)
    }
  }

  const predict = async () => {
    if (model && webcamRef.current && !isPredicting) {
      // 웹캠에 모델이 로드 및 활성화되고, 현재 예측중이 아닌 경우
      const predictions = await model.predict(webcamRef.current.canvas)
      // 모델을 통해 웹캠의 이미지를 예측하고, 결과를 가져옴
      let foundPrediction = false
      // 모델이 꽃을 예측했는지 여부를 초기화
      for (let i = 0; i < maxPredictions; i++) {
        const className = predictions[i].className
        const probability = Number(predictions[i].probability.toFixed(2))
        // 꽃의 이름과 확률을 가져옴
        if (probability == 1.0) {
          // 예측에 성공한 경우
          foundPrediction = true
          setIsPredicting(true)
          // setFlowerName(className)
          setFlowerDetails((prev) => {
            return { ...prev, name: className }
          })

          const description = await fetchChatGPTDescription(
            `${className} 꽃에 대한 설명을 한 문장으로 적어줘`
          )
          setLabel(description)

          const flowerMeaning = await fetchChatGPTDescription(
            `${className}의 꽃말을 한 단어로 알려줘`
          )
          setFlowerDetails((prev) => {
            return { ...prev, meaning: flowerMeaning }
          })

          const bloomSeason = await fetchChatGPTDescription(
            `${className}을 볼 수 있는 계절을 단어로 알려줘`
          )
          setFlowerDetails((prev) => {
            return { ...prev, season: bloomSeason }
          })

          setIsPredicting(false)
          break
        }
      }
      if (!foundPrediction && label === '꽃에 대한 설명입니다.') {
        setLabel('꽃을 아직 인식하지 못했습니다.')
      }
    }
  }

  const fetchChatGPTDescription = async (content: string) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHATGPT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATGPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content },
          ],
          max_tokens: 60,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          `Error: ${response.status} ${response.statusText} - ${errorText}`
        )
        return '설명을 가져올 수 없습니다'
      }

      const data = await response.json()
      if (
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        return data.choices[0].message.content.trim()
      } else {
        return '설명을 가져올 수 없습니다'
      }
    } catch (error) {
      console.error('Error fetching description:', error)
      return '설명을 가져올 수 없습니다'
    }
  }

  console.log('WebcamModel render function')

  return (
    <div className="flex flex-col items-center w-[420px]">
      <h1 className={styles.main}>AI 꽃 판별기</h1>
      <p className="ml-1 mt-1.5 font-semibold text-rose-400 text-sm">
        웹 캠에 꽃을 비추면 해당 꽃의 이름과 정보를 알려드립니다.
      </p>
      <hr className="mt-6 w-full border-rose-300" />
      <div
        id="webcam-container"
        className="flex mt-10 h-80 border border-4 border-gray-400 rounded w-full max-w-full"
      />
      <button
        type="button"
        className="h-12 w-48 mt-6 border border-2 rounded-full text-xl font-bold text-rose-300 border-rose-200 hover:bg-rose-400 hover:text-white"
        onClick={initWebcam}
      >
        open cam
      </button>

      <hr />
      <p className="mt-12 w-full text-center text-xl font-semibold text-rose-400">
        분석 결과 {flowerDetails.name} 입니다.
        {famlNmList.includes(flowerDetails.name) &&
          data?.data.response.body.items.item.map(
            (item: PlantIndexItem) =>
              item.famlNm == flowerDetails.name && (
                <Link
                  key={item.famlNm}
                  href={{
                    pathname: `/view/${item.famlNm}`,
                    query: {
                      imgUrl: item.imgUrl,
                      krnm: item.krnm,
                      famlNm: item.famlNm,
                      fturCn: item.fturCn,
                    },
                  }}
                >
                  상세 페이지로 이동
                </Link>
              )
          )}
      </p>

      <section>
        <h2 className="mt-16 w-full text-center text-lg font-semibold text-rose-400">
          설명
        </h2>
        <p className="mt-2 mx-3 w-full text-center font-normal text-gray-600">
          {label}
        </p>
      </section>

      <section>
        <h2 className="mt-12 w-full text-center text-lg font-semibold text-rose-400">
          꽃말
        </h2>
        <p className="mt-2 mx-3 w-full text-center font-normal text-gray-600">
          {flowerDetails.meaning}
        </p>
      </section>

      <section>
        <h2 className="mt-12 w-full text-center text-lg font-semibold text-rose-400">
          피는 계절
        </h2>
        <p className="mt-2 mx-3 w-full text-center font-normal text-gray-600">
          {flowerDetails.season}
        </p>
      </section>
    </div>
  )
}

export default WebcamModel
