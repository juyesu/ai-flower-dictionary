import Modal from '@/components/common/modal/Modal'
import useModalHandlers from '@/components/common/modal/hooks/useModalHandlers'

const ModalManager = () => {
  const {
    modal,
    closeModal,
    handleModelErrorClose,
    handleLoginRequiredClose,
    redirectToLoginAfterClose,
    handleLogoutMessageClose,
    handleAccountDeletionClose,
  } = useModalHandlers()

  switch (modal?.type) {
    case 'ALERT':
      return <Modal message={modal.message} bgOverlay={false} onClose={closeModal} />
    case 'PLANT_DETECTION_MODEL_ERROR':
      return (
        <Modal
          message='죄송합니다. 모델 로드 중 오류가 발생했습니다.'
          onClose={handleModelErrorClose}
          bgOverlay={true}
        />
      )
    case 'LOGIN_REQUIRED':
      return (
        <Modal
          message='로그인이 필요한 서비스입니다.'
          onClose={handleLoginRequiredClose}
          bgOverlay={true}
          secoundButton={{
            secoundButtonLabel: '로그인',
            onSecondButtonClick: redirectToLoginAfterClose,
          }}
        />
      )
    case 'SESSION_EXPIRED':
      return (
        <Modal
          message='세션이 만료되어 로그인 정보가 초기화되었습니다.'
          bgOverlay={false}
          onClose={handleLogoutMessageClose}
          secoundButton={{
            secoundButtonLabel: '로그인',
            onSecondButtonClick: redirectToLoginAfterClose,
          }}
        />
      )
    case 'LOGOUT_MESSAGE':
      return (
        <Modal message='로그아웃되었습니다.' bgOverlay={false} onClose={handleLogoutMessageClose} />
      )
    case 'SEARCH_NOT_FOUND':
      return (
        <Modal
          message='검색어와 일치하는 식물이 존재하지 않습니다.'
          bgOverlay={false}
          onClose={closeModal}
        />
      )
    case 'API_DATA_ERROR':
      return (
        <Modal
          message='죄송합니다. 일시적인 서비스 오류가 발생했습니다.'
          bgOverlay={true}
          onClose={closeModal}
        />
      )
    case 'SERVER_ERROR':
      return <Modal message='서버 오류가 발생했습니다.' bgOverlay={true} onClose={closeModal} />
    case 'NETWORK_ERROR':
      return <Modal message='네트워크 오류가 발생했습니다.' bgOverlay={true} onClose={closeModal} />
    case 'REGISTER_SUCCESS':
      return (
        <Modal
          message='회원 가입에 성공했습니다.'
          bgOverlay={false}
          onClose={redirectToLoginAfterClose}
        />
      )
    case 'ACCOUNT_DELETION_FAILED':
      return (
        <Modal
          message='오류가 발생하여 회원 탈퇴에 실패하였습니다.'
          bgOverlay={false}
          onClose={handleAccountDeletionClose}
        />
      )
    case 'ACCOUNT_DELETION_SUCCESS':
      return (
        <Modal
          message='회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.'
          bgOverlay={false}
          onClose={handleAccountDeletionClose}
        />
      )
    default:
      return null
  }
}

export default ModalManager
