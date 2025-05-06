import { supabase } from "@/lib/supabase"

const requestWithdraw = async (logout: () => void) => {
  //   const token = localStorage.getItem('sb-access-token')

  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    console.error('세션 정보 없음:', error)
    return
  }

  const token = data.session.access_token

  if (!token) {
    alert('인증 정보가 없습니다. 다시 로그인해주세요.')
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

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || '회원 탈퇴에 실패했습니다.')
      return
    }

    alert('회원 탈퇴가 완료되었습니다.')
    logout()
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해주세요.')
  }
}

export default requestWithdraw
