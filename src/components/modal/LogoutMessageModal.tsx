import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'

const LogoutMessageModal = () => {
  const { closeModal } = useModalStore()
  return (
    <Modal
      onClose={closeModal}
      bgOverlay={false}
      message="로그아웃되었습니다."
    />
  )
}

export default LogoutMessageModal
