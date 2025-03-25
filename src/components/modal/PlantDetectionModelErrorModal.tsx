import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'

const PlantDetectionModelErrorModal = () => {
  const { closeModal } = useModalStore()
  return (
    <Modal
      onClose={closeModal}
      bgOverlay={true}
      message="죄송합니다. 모델 로드 중 오류가 발생했습니다."
    />
  )
}

export default PlantDetectionModelErrorModal
