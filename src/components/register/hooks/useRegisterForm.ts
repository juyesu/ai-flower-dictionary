import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormType } from '@/types/type'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { useModalStore } from '@/store/useModalStore'

const useRegisterForm = () => {
  const [openPostcode, setOpenPostcode] = useState(false)
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { openModal } = useModalStore()
  const { loginUser } = useAuth()

  useEffect(() => {
    if (loginUser) {
      router.push('/')
    }
  }, [loginUser])

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    if (localStorage.getItem(`${data.email}.name`)) {
      openModal({
        type: 'ALERT',
        message: '이미 존재하는 이메일입니다.\n 다른 이메일로 시도해주세요',
      })
      methods.setFocus('email')
      methods.reset({ email: '' })
    } else {
      try {
        localStorage.setItem(`${data.email}.name`, data.name)
        localStorage.setItem(`${data.email}.email`, data.email)
        localStorage.setItem(`${data.email}.password`, data.password)
        localStorage.setItem(`${data.email}.address`, data.address)

        openModal({
          type: 'REGISTER_SUCCESS',
        })
      } catch {
        openModal({
          type: 'ALERT',
          message: '회원가입 중 오류가 발생했습니다.',
        })
      }
    }
  }

  return { methods, onSubmit, openPostcode, setOpenPostcode }
}

export default useRegisterForm
