import { useState } from 'react'
import Layout from '@/components/common/Layout'
import PageTitle from '@/components/ai-flower-dection/PageTitle'
import ScrollButton from '@/components/common/ScrollButton'
import CameraModel from '@/components/ai-flower-dection/CameraModel'
import FileUploadModel from '@/components/ai-flower-dection/FileUploadModel'
import WebCamModelErrorModal from '@/components/modal/PlantDetectionModelErrorModal'
import { useModalStore } from '@/store/useModalStore'

const AiFlowerDetection = () => {
  const [isCameraMode, setIsCameraMode] = useState(true)
  const { isModalOpen, currentModal } = useModalStore()

  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
        <PageTitle
          isCameraMode={isCameraMode}
          setIsCameraMode={setIsCameraMode}
        />
        <div className="flex w-full flex-col items-center">
          {isCameraMode ? <CameraModel /> : <FileUploadModel />}
        </div>
      </div>
      {isModalOpen && currentModal == 'PlantDetectionModelErrorModal' && (
        <WebCamModelErrorModal />
      )}
      <ScrollButton />
    </Layout>
  )
}

export default AiFlowerDetection
