import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'
import { useRouter } from 'next/router'

const LoginRequiredModal = () => {
  const { closeModal } = useModalStore()
  const router = useRouter()
  return (
    <Modal
      onClose={() => {
        closeModal()
        router.back()
      }}
      bgOverlay={false}
      secoundButton={{
        secoundButtonLabel: '로그인',
        onSecondButtonClick: () => {
          router.push('/login')
        },
      }}
      message="로그인이 필요한 서비스입니다."
    />
  )
}

export default LoginRequiredModal
