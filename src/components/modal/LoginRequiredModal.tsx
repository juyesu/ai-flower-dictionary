import Modal from '@/components/modal/Modal'
import { TwoButtonModalProps } from '@/types/type'
import { useModalStore } from '@/store/useModalStore'
import { useRouter } from 'next/router'

const LoginRequiredModal = ({
  bgOverlay,
  onSecondButtonClick,
}: TwoButtonModalProps) => {
  const { closeModal } = useModalStore()
  const router = useRouter()
  return (
    <Modal
      onClose={() => {
        closeModal
        router.back()
      }}
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
