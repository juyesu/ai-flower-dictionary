import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { LoginFormType } from '@/types/type'
import { useModalStore } from '@/store/useModalStore'

const useLoginForm = () => {
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { userId, setUserId } = useAuth()
  const { openModal } = useModalStore()

  useEffect(() => {
    if (userId) {
      router.push('/')
    }
  }, [userId, router])

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    if (
      localStorage.getItem(`${data.email}.email`) === data.email &&
      localStorage.getItem(`${data.email}.password`) === data.password
    ) {
      localStorage.setItem('userEmail', data.email)
      setUserId(data.email)
      router.push('/')
    } else {
      openModal({
        type: 'ALERT',
        message: '일치하는 계정이 존재하지 않습니다.\n 이메일 또는 비밀번호를 다시 확인해주세요.',
      })
      methods.setValue('password', '')
    }
  }

  return { methods, onSubmit }
}

export default useLoginForm
