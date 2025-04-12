import { useModalStore } from '@/store/useModalStore'
import Modal from '@/components/modal/Modal'
import { useRouter } from 'next/router'

const ModalManager = () => {
  const { modal, closeModal } = useModalStore()
  const router = useRouter()

  if (!modal) return null

  switch (modal.type) {
    case 'ALERT':
      return (
        <Modal
          message={modal.message}
          bgOverlay={false}
          onClose={() => {
            closeModal()
          }}
        />
      )
    case 'PLANT_DETECTION_MODEL_ERROR':
      return (
        <Modal
          message="죄송합니다. 모델 로드 중 오류가 발생했습니다."
          onClose={() => {
            closeModal()
            router.back()
          }}
          bgOverlay={true}
        />
      )
    case 'LOGIN_REQUIRED':
      return (
        <Modal
          message="로그인이 필요한 서비스입니다."
          onClose={() => {
            closeModal()
            if (modal.goBackOnClose) {
              router.back()
            }
          }}
          bgOverlay={true}
          secoundButton={{
            secoundButtonLabel: '로그인',
            onSecondButtonClick: () => {
              closeModal()
              router.push('/login')
            },
          }}
        />
      )
    case 'LOGOUT_MESSAGE':
      return (
        <Modal
          message="로그아웃되었습니다."
          bgOverlay={false}
          onClose={() => {
            closeModal()
            window.location.reload()
          }}
        />
      )
    case 'SEARCH_NOT_FOUND':
      return (
        <Modal
          message="검색어와 일치하는 식물이 존재하지 않습니다."
          bgOverlay={false}
          onClose={closeModal}
        />
      )
    case 'API_DATA_ERROR':
      return (
        <Modal
          message="죄송합니다. 일시적인 서비스 오류가 발생했습니다."
          bgOverlay={true}
          onClose={closeModal}
        />
      )
    case 'REGISTER_SUCCESS':
      return (
        <Modal
          message="회원 가입에 성공했습니다."
          bgOverlay={false}
          onClose={() => {
            closeModal()
            router.push('/login')
          }}
        />
      )
    case 'ACCOUNT_DELETION_SUCCESS':
      return (
        <Modal
          message="회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다."
          bgOverlay={false}
          onClose={() => {
            closeModal()
            if (router.pathname !== '/') {
              router.push('/')
            }
            window.location.reload()
          }}
        />
      )
    default:
      return null
  }
}

export default ModalManager
