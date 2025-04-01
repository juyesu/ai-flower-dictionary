import { useState } from 'react'
import Layout from '@/components/common/Layout'
import PageTitle from '@/components/common/PageTitle'
import ScrollButton from '@/components/common/ScrollButton'
import CameraModel from '@/components/ai-flower-detection/CameraModel'
import FileUploadModel from '@/components/ai-flower-detection/FileUploadModel'

const AiFlowerDetection = () => {
  const [isCameraMode, setIsCameraMode] = useState(true)

  return (
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
  )
}

export default AiFlowerDetection
