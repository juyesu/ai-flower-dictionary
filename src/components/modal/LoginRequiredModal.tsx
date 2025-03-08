import Modal from '@/components/modal/Modal'
import { TwoButtonModalProps } from '@/types/type'

const LoginRequiredModal = ({
  onClose,
  bgOverlay,
  onSecondButtonClick,
}: TwoButtonModalProps) => {
  return (
    <Modal
      onClose={onClose}
      bgOverlay={bgOverlay}
      secoundButton={{
        secoundButtonLabel: '로그인',
        onSecondButtonClick: () => {
          onSecondButtonClick()
        },
      }}
      message="로그인이 필요한 서비스입니다."
    />
  )
}

export default LoginRequiredModal
