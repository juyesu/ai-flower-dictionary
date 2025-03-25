import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'

const ApiDataErrorModal = () => {
  const { closeModal } = useModalStore()
  return (
    <Modal
      onClose={closeModal}
      bgOverlay={true}
      message="죄송합니다. 일시적인 서비스 오류가 발생했습니다."
    />
  )
}

export default ApiDataErrorModal
