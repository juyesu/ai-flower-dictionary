import { useState } from 'react'
import Layout from '@/components/common/layout/Layout'
import PageTitle from '@/components/common/ui/PageTitle'
import ScrollButton from '@/components/common/ui/ScrollButton'
import CameraModel from '@/components/ai-flower-detection/CameraModel'
import FileUploadModel from '@/components/ai-flower-detection/FileUploadModel'
import Head from 'next/head'

const AiFlowerDetection = () => {
  const [isCameraMode, setIsCameraMode] = useState(true)

  return (
    <>
      <Head>
        <title>AI Flower Detection</title>
        <meta
          name="description"
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
        <meta property="og:title" content="AI Flower Detection" />
        <meta
          property="og:description"
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
        <meta name="twitter:title" content="AI Flower Detection" />
        <meta
          name="twitter:description"
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
      </Head>
      <Layout>
        <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
          <PageTitle
            isCameraMode={isCameraMode}
            setIsCameraMode={setIsCameraMode}
            titleImage="ai_flower_detection_title_image_4"
            titleOptions="ModeSwitchButton"
          />
          <div className="flex w-full flex-col items-center">
            {isCameraMode ? <CameraModel /> : <FileUploadModel />}
          </div>
        </div>
        <ScrollButton />
      </Layout>
    </>
  )
}

export default AiFlowerDetection
