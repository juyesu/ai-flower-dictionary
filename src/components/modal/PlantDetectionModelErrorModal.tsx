import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'
import { useRouter } from 'next/router'

const PlantDetectionModelErrorModal = () => {
  const { closeModal } = useModalStore()
  const router = useRouter()

  return (
    <Modal
      onClose={() => {
        closeModal()
        router.back()
      }}
      bgOverlay={true}
      message="죄송합니다. 모델 로드 중 오류가 발생했습니다."
    />
  )
}

export default PlantDetectionModelErrorModal
