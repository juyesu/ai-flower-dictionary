import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'

const LogoutMessageModal = () => {
  const { closeModal } = useModalStore()
  return (
    <Modal
      onClose={() => {
        closeModal()
        window.location.reload()
      }}
      bgOverlay={false}
      message="로그아웃되었습니다."
    />
  )
}

export default LogoutMessageModal
