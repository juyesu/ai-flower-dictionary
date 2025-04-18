import { useModalStore } from '@/store/useModalStore'
import { useRouter } from 'next/router'

const useModalHandlers = () => {
  const router = useRouter()
  const { modal, closeModal } = useModalStore()

  return {
    modal,
    closeModal,
    handleModelErrorClose: () => {
      closeModal()
      router.back()
    },
    handleLoginRequiredClose: () => {
      closeModal()
      if (modal?.type === 'LOGIN_REQUIRED' && modal.goBackOnClose) {
        router.back()
      }
    },
    redirectToLoginAfterClose: () => {
      closeModal()
      router.push('/login')
    },
    handleLogoutMessageClose: () => {
      closeModal()
      window.location.reload()
    },
    handleAccountDeletionClose: () => {
      closeModal()
      if (router.pathname !== '/') router.push('/')
      window.location.reload()
    },
  }
}

export default useModalHandlers
