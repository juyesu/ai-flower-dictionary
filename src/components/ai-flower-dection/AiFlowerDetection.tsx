'use client'

import React, { useEffect, useState } from 'react'
import styles from '@styles/ItemList.module.css'
import WebcamModel from '@/components/ai-flower-dection/WebcamModel'
import FileUploadModel from '@/components/ai-flower-dection/FileUploadModel'
import { useRouter } from 'next/router'
import WebCamModelErrorModal from '@/components/modal/WebCamModelErrorModal'

const AiFlowerDetection = () => {
  const [isWebcamMode, setIsWebcamMode] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { sort } = router.query
  const [openWebcamModelErrorModal, setOpenWebcamModelErrorModal] =
    useState(false)

  useEffect(() => {
    if (sort == 'file') {
      setIsWebcamMode(false)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const aiErrorModalOpen = () => {
    setOpenWebcamModelErrorModal(true)
  }
  const aiErrorModalClose = () => {
    setOpenWebcamModelErrorModal(false)
    router.push('/')
  }

  if (!isClient || !router.isReady) return null

  return (
    <div className="flex flex-col items-center w-full sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
      <div className="flex flex-col items-center w-full bg-[url('/images/ai_flower_detection_title_image_3.png')] bg-center bg-cover">
        <div className="mt-40 mb-20 flex flex-col items-center gap-3">
          <h1 className={styles.main}>AI Flower Detection</h1>
          <p className="ml-1 mt-1.5 font-semibold text-zinc-800 text-lg text-center">
            웹 캠에 꽃을 비추거나, 꽃 이미지를 업로드하면 <br /> 해당 꽃의
            이름과 정보를 알려드립니다.
          </p>
        </div>
        <div className="mb-36 flex flex-row w-[28rem] border rounded-full">
          <button
            type="button"
            className={`p-3 w-1/2 h-full rounded-l-full ${
              isWebcamMode
                ? 'bg-zinc-600 text-white font-semibold'
                : 'bg-white text-zinc-800'
            }`}
            onClick={() => setIsWebcamMode(true)}
            aria-label="카메라로 꽃을 인식하는 모드로 전환"
          >
            WebCam
          </button>
          <button
            type="button"
            className={`p-3 w-1/2 h-full rounded-r-full ${
              isWebcamMode
                ? 'bg-white text-zinc-800'
                : 'bg-zinc-600 text-white font-semibold'
            }`}
            onClick={() => setIsWebcamMode(false)}
            aria-label="사진을 업로드하여 꽃을 인식하는 모드로 전환"
          >
            File Upload
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {isWebcamMode ? (
          <WebcamModel AIErrorModalOpen={aiErrorModalOpen} />
        ) : (
          <FileUploadModel AIErrorModalOpen={aiErrorModalOpen} />
        )}
      </div>
      {openWebcamModelErrorModal && (
        <WebCamModelErrorModal onClose={aiErrorModalClose} />
      )}
    </div>
  )
}

export default AiFlowerDetection
