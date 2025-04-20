import { LoginFormProps, LoginFormType } from '@/types/type'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { register, handleSubmit, formState } = useFormContext<LoginFormType>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='login_input_group'>
        <label htmlFor='email' className='mt-2 dark:text-zinc-300'>
          이메일
        </label>
        <input
          id='email'
          type='text'
          className='login_form_input'
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
        />
        {formState.errors.email && (
          <p className='login_form_schema_error'>{formState.errors.email.message}</p>
        )}
      </div>

      <div className='login_input_group'>
        <label htmlFor='password' className='dark:text-zinc-300'>
          비밀번호
        </label>
        <input
          id='password'
          type='password'
          className='login_form_input'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        {formState.errors.password && (
          <p className='login_form_schema_error'>{formState.errors.password.message}</p>
        )}
      </div>

      <button className='login_form_submit_button dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600'>
        로그인
      </button>
      <Link href='/register' className='login_register_switch_link'>
        아직 회원이 아니신가요?
        <span>회원가입</span>
      </Link>
    </form>
  )
}

export default LoginForm
