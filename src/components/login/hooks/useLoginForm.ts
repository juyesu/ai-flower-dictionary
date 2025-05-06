import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { LoginFormType } from '@/types/type'
import { useModalStore } from '@/store/useModalStore'
import { supabase } from '@/lib/supabase'

const useLoginForm = () => {
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { setUserId } = useAuth()
  const { openModal } = useModalStore()

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const { email, password } = data

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !authData.user) {
      openModal({
        type: 'ALERT',
        message: '일치하는 계정이 존재하지 않습니다.\n 이메일 또는 비밀번호를 다시 확인해주세요.',
      })
      methods.setValue('password', '')
      return
    }

    localStorage.setItem('userId', authData.user.id)
    setUserId(authData.user.id)
    router.push('/')
  }

  return { methods, onSubmit }
}

export default useLoginForm
