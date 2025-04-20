import { RegisterFormProps, LoginFormType } from '@/types/type'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { MagnifyingGlass } from '@/pages/assets/icons'

const RegisterForm = ({ onSubmit, setOpenPostcode }: RegisterFormProps) => {
  const { register, handleSubmit, formState } = useFormContext<LoginFormType>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login_input_group">
        <label htmlFor="name" className="dark:text-zinc-300">
          이름
        </label>
        <input
          id="name"
          type="text"
          className="login_form_input"
          {...register('name', {
            required: '이름을 입력해주세요',
            minLength: {
              value: 2,
              message: '이름을 최소 2자 이상 입력해주세요',
            },
            maxLength: {
              value: 30,
              message: '이름은 최대 30자까지 입력이 가능합니다',
            },
            pattern: {
              value: /^[a-zA-Z가-힣]+$/,
              message: '한글 및 영문만 입력이 가능합니다',
            },
          })}
        />
        {formState.errors.name && (
          <p className="login_form_schema_error">
            {formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="login_input_group">
        <label htmlFor="email" className="dark:text-zinc-300">
          이메일
        </label>
        <input
          id="email"
          type="email"
          className="login_form_input"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식이 잘못되었습니다',
            },
          })}
        />
        {formState.errors.email && (
          <p className="login_form_schema_error">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="login_input_group">
        <label htmlFor="password" className="dark:text-zinc-300">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          className="login_form_input"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8글자 이상 입력해주세요.',
            },
            pattern: {
              value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
              message:
                '비밀번호는 최소 1자 이상의 영어 대소문자, 숫자, 특수문자를 반드시 포함해야합니다.',
            },
          })}
        />
        {formState.errors.password && (
          <p className="login_form_schema_error">
            {formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="login_input_group">
        <label htmlFor="address" className="dark:text-zinc-300">
          주소
        </label>
        <div className="flex gap-2">
          <input
            id="address"
            type="text"
            className="login_form_input bg-stone-100 dark:bg-zinc-800"
            {...register('address', {
              required: '주소를 입력해주세요',
            })}
            readOnly
          />
          <button
            type="button"
            className="mt-1.5 flex items-center justify-center rounded bg-zinc-300 px-3 hover:bg-zinc-400 dark:bg-zinc-400 dark:hover:bg-zinc-500"
            onClick={() => setOpenPostcode(true)}
            aria-label="주소입력 팝업 열기"
          >
            <MagnifyingGlass className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {formState.errors.address && (
          <p className="login_form_schema_error">
            {formState.errors.address.message}
          </p>
        )}
      </div>

      <button className="login_form_submit_button dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
        회원가입
      </button>
      <Link href="/login" className="login_register_switch_link">
        이미 계정이 있으신가요?
        <span>로그인</span>
      </Link>
    </form>
  )
}

export default RegisterForm
