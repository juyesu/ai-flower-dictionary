'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as tmImage from '@teachablemachine/image'
import styles from './../../styles/ItemList.module.css'

export default function WebcamModel() {
  const [model, setModel] = useState<any>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [flowerMeaning, setFlowerMeaning] = useState('')
  const [flowerSeason, setFlowerSeason] = useState('')
  const [isPredicting, setIsPredicting] = useState(false)

  const MODEL_URL =
    'https://teachablemachine.withgoogle.com/models/6_FbZjcBE/model.json'
  const METADATA_URL =
    'https://teachablemachine.withgoogle.com/models/6_FbZjcBE/metadata.json'

  const webcamRef = useRef<tmImage.Webcam | null>(null)

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (!model) {
          // 모델이 이미 로드된 상태인지 확인
          const loadedModel = (await tmImage.load(
            MODEL_URL,
            METADATA_URL
          )) as any
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
        const probability = predictions[i].probability.toFixed(2)
        // 꽃의 이름과 확률을 가져옴
        if (probability == 1.0) {
          // 예측에 성공한 경우
          foundPrediction = true
          setIsPredicting(true)
          setFlowerName(className)

          const description = await fetchChatGPTDescription(
            className,
            `${className} 꽃에 대한 설명을 한 문장으로 적어줘`
          )
          setLabel(description)

          const meaning = await fetchChatGPTDescription(
            className,
            `${className}의 꽃말을 한 단어로 알려줘`
          )
          setFlowerMeaning(meaning)

          const season = await fetchChatGPTDescription(
            className,
            `${className}을 볼 수 있는 계절을 단어로 알려줘`
          )
          setFlowerSeason(season)

          setIsPredicting(false)
          break
        }
      }
      if (!foundPrediction && label === '꽃에 대한 설명입니다.') {
        setLabel('꽃을 아직 인식하지 못했습니다.')
      }
    }
  }

  const fetchChatGPTDescription = async (flowerName: any, content: string) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions'
    const API_KEY = 'sk-proj-QQyolp7hNhbAsufJ3UDyT3BlbkFJ4zGmSpl9UGkexFEIrHbB'

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
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
      <h1 className="ml-1 mt-1.5 font-semibold text-rose-400 text-sm">
        웹 캠에 꽃을 비추면 해당 꽃의 이름과 정보를 알려드립니다.
      </h1>
      <hr className="mt-6 w-full border-rose-300" />
      <div
        id="webcam-container"
        className="flex mt-10 h-80 border border-4 border-gray-400 rounded w-full max-w-full"
      ></div>
      <button
        type="button"
        className="h-12 w-48 mt-6 border border-2 rounded-full text-xl font-bold text-rose-300 border-rose-200 hover:bg-rose-400 hover:text-white"
        onClick={initWebcam}
      >
        open cam
      </button>

      <hr />
      <p className="mt-12 w-full text-center text-xl font-semibold text-rose-400">
        분석 결과 <span>{flowerName}</span> 입니다.
      </p>
      <p className="mt-16 w-full text-center text-lg font-semibold text-rose-400">
        설명
      </p>
      <p
        id="label-container"
        className="mt-2 mx-3 w-full text-center font-normal text-gray-600"
      >
        {label}
      </p>
      <p className="mt-12 w-full text-center text-lg font-semibold text-rose-400">
        꽃말
      </p>
      <p className="mt-2 mx-3 w-full text-center font-normal text-gray-600">
        {flowerMeaning}
      </p>
      <p className="mt-12 w-full text-center text-lg font-semibold text-rose-400">
        피는 계절
      </p>
      <p className="mt-2 mx-3 w-full text-center font-normal text-gray-600">
        {flowerSeason}
      </p>
    </div>
  )
}
