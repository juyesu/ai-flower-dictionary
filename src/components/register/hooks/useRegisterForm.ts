import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormType } from '@/types/type'
import { useState } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { supabase } from '@/lib/supabase'

const useRegisterForm = () => {
  const [openPostcode, setOpenPostcode] = useState(false)
  const [isEmailUnique, setIsEmailUnique] = useState(false)
  const methods = useForm<LoginFormType>()
  const { openModal } = useModalStore()

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    if (!isEmailUnique) {
      openModal({
        type: 'ALERT',
        message: '이메일 중복 확인을 해주세요.',
      })
      return
    }
    const { name, email, password, address } = data

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          address,
        },
      },
    })

    if (error) {
      openModal({
        type: 'ALERT',
        message: '회원가입 중 오류가 발생했습니다.',
      })
      console.error(error)
      return
    }

    openModal({ type: 'REGISTER_SUCCESS' })
  }

  const checkEmailDuplication = async () => {
    const isValid = await methods.trigger('email')
    if (!isValid) return

    const email = methods.getValues('email')

    try {
      const res = await fetch(`/api/checkEmailDuplicationHandler?email=${email}`)

      if (res.status === 200) {
        openModal({
          type: 'ALERT',
          message: '사용 가능한 이메일입니다.',
        })
        setIsEmailUnique(true)
      } else if (res.status === 409) {
        openModal({
          type: 'ALERT',
          message: '이미 존재하는 이메일입니다.\n 다른 이메일을 선택해주세요.',
        })
        setIsEmailUnique(false)
      } else {
        openModal({ type: 'SERVER_ERROR' })
        setIsEmailUnique(false)
      }
    } catch (err) {
      openModal({ type: 'NETWORK_ERROR' })
      console.error(err)
    }
  }

  return { methods, onSubmit, openPostcode, setOpenPostcode, isEmailUnique, checkEmailDuplication }
}

export default useRegisterForm
