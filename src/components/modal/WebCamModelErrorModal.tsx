import Modal from '@/components/modal/Modal'
import { ModalCloseProps } from '@/types/type'

const WebCamModelErrorModal = ({ onClose }: ModalCloseProps) => {
  return (
    <Modal
      onClose={onClose}
      bgOverlay={true}
      message="죄송합니다. 일시적인 서비스 오류가 발생했습니다."
    />
  )
}

export default WebCamModelErrorModal
