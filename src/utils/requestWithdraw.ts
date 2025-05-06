import { supabase } from '@/lib/supabase'
import { useModalStore } from '@/store/useModalStore'

const requestWithdraw = async (logout: () => void) => {
  const { data, error } = await supabase.auth.getSession()
  const { openModal } = useModalStore()

  if (error || !data.session) {
    console.error('세션 정보 없음:', error)
    return
  }

  const token = data.session.access_token

  if (!token) {
    openModal({ type: 'LOGIN_REQUIRED', goBackOnClose: false })
    return
  }

  try {
    const response = await fetch('/api/withdrawAccountHandler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      openModal({ type: 'ACCOUNT_DELETION_FAILED' })
      return
    }

    openModal({ type: 'ACCOUNT_DELETION_SUCCESS' })
    logout()
  } catch (error) {
    openModal({ type: 'SERVER_ERROR' })
    console.error(error)
  }
}

export default requestWithdraw
