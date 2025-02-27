import Modal from '@/components/modal/Modal'
import { OneButtonModalProps } from '@/types/type'

const LogoutMessageModal = ({ onClose }: OneButtonModalProps) => {
  return (
    <Modal onClose={onClose} bgOverlay={false} message="로그아웃되었습니다." />
  )
}

export default LogoutMessageModal
