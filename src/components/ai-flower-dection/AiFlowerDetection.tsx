'use client'

import React, { useEffect, useState } from 'react'
import CameraModel from '@/components/ai-flower-dection/CameraModel'
import FileUploadModel from '@/components/ai-flower-dection/FileUploadModel'
import { useRouter } from 'next/router'
import WebCamModelErrorModal from '@/components/modal/WebCamModelErrorModal'
import Image from 'next/image'

const AiFlowerDetection = () => {
  const [isCameraMode, setIsCameraMode] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { sort } = router.query
  const [openWebcamModelErrorModal, setOpenWebcamModelErrorModal] =
    useState(false)

  useEffect(() => {
    if (sort == 'file') {
      setIsCameraMode(false)
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
      <div className="relative flex items-end justify-center w-full h-[500px]">
        <Image
          src="/images/ai_flower_detection_title_image_4.jpg"
          alt="타이틀 커버 이미지"
          className="object-cover"
          fill
        />
        <div className="absolute inset-0 title-gradient-overlay dark:title-gradient-overlay" />
        <div className="absolute inset-0 mt-30 mb-20 flex flex-col justify-center items-center gap-3">
          <h1 className="page-main-title dark:text-slate-300">
            AI Flower Detection
          </h1>
          <p className="ml-1 mt-1.5 font-semibold text-zinc-800 dark:text-slate-300 text-lg text-center">
            카메라에 꽃을 비추거나, 꽃 이미지를 업로드하면 <br /> 해당 꽃의
            이름과 정보를 알려드립니다.
          </p>
        </div>
        <div className="mb-20 flex flex-row w-[28rem] border dark:border-gray-600 rounded-full z-10">
          <button
            type="button"
            className={`p-3 w-1/2 h-full rounded-l-full ${
              isCameraMode
                ? 'bg-zinc-600 dark:bg-zinc-800 text-white dark:text-slate-300 font-semibold'
                : 'bg-white dark:bg-zinc-400 text-zinc-800'
            }`}
            onClick={() => setIsCameraMode(true)}
            aria-label="카메라로 꽃을 인식하는 모드로 전환"
          >
            카메라
          </button>
          <button
            type="button"
            className={`p-3 w-1/2 h-full rounded-r-full ${
              isCameraMode
                ? 'bg-white dark:bg-zinc-400 text-zinc-800'
                : 'bg-zinc-600 dark:bg-zinc-800 text-white dark:text-slate-300 font-semibold'
            }`}
            onClick={() => setIsCameraMode(false)}
            aria-label="사진을 업로드하여 꽃을 인식하는 모드로 전환"
          >
            파일 업로드
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {isCameraMode ? (
          <CameraModel AIErrorModalOpen={aiErrorModalOpen} />
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
