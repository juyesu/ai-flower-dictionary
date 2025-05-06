import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormType } from '@/types/type'
import { useState } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { supabase } from '@/lib/supabase'

const useRegisterForm = () => {
  const [openPostcode, setOpenPostcode] = useState(false)
  const methods = useForm<LoginFormType>()
  const { openModal } = useModalStore()

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
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

  return { methods, onSubmit, openPostcode, setOpenPostcode }
}

export default useRegisterForm
