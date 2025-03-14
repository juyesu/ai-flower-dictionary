import Layout from '@/components/common/Layout'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoginFormType } from '@/types/type'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { useAuth } from '@/context/AuthContext'

const Register = () => {
  const [openPostcode, setOpenPostcode] = useState(false)
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { loginUser } = useAuth()

  useEffect(() => {
    if (loginUser) {
      router.push('/')
    }
  }, [loginUser])

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    if (localStorage.getItem(`${data.email}.name`)) {
      alert('이미 존재하는 이메일입니다. 다른 이메일로 시도해주세요')
      methods.setFocus('email')
      methods.reset({ email: '' })
    } else {
      try {
        localStorage.setItem(`${data.email}.name`, data.name)
        localStorage.setItem(`${data.email}.email`, data.email)
        localStorage.setItem(`${data.email}.password`, data.password)
        localStorage.setItem(`${data.email}.address`, data.address)

        alert('회원 가입에 성공했습니다. ^^/')
        router.push('/login')
      } catch {
        alert('오류가 발생했습니다.')
      }
    }
  }

  return (
    <Layout>
      <div className="login-page-layout">
        <div className="login-box">
          <div className="login-form-layout">
            <h1 className="login-header-title">회원가입</h1>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="login-label-input-group">
                <label htmlFor="name">이름</label>
                <input
                  id="name"
                  type="text"
                  className="login-form-input"
                  {...methods.register('name', {
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
                {methods.formState.errors.name && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="login-label-input-group">
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="login-form-input"
                  {...methods.register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '이메일 형식이 잘못되었습니다',
                    },
                  })}
                />
                {methods.formState.errors.email && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="login-label-input-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  className="login-form-input"
                  {...methods.register('password', {
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                      value: 8,
                      message: '비밀번호는 최소 8글자 이상 입력해주세요.',
                    },
                    pattern: {
                      value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                      message:
                        '비밀번호는 최소 1자 이상의 영어 대,소문자, 숫자, 특수문자를 반드시 포함해야합니다.',
                    },
                  })}
                />
                {methods.formState.errors.password && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="login-label-input-group">
                <label htmlFor="address">주소</label>
                <div className="flex gap-2">
                  <input
                    id="address"
                    type="text"
                    className="login-form-input bg-stone-100"
                    {...methods.register('address', {
                      required: '주소를 입력해주세요',
                    })}
                    readOnly
                  />
                  <button
                    type="button"
                    className="flex justify-center items-center mt-1.5 px-3 bg-zinc-300 hover:bg-zinc-400 rounded"
                    onClick={() => setOpenPostcode(true)}
                    aria-label="주소입력 팝업 열기"
                  >
                    <MagnifyingGlass className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                {methods.formState.errors.address && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.address.message}
                  </p>
                )}
              </div>

              <button className="login-form-submit-button">회원가입</button>
              <Link href="/login" className="login-link-text">
                이미 계정이 있으신가요?
                <span>로그인</span>
              </Link>
            </form>
          </div>
        </div>
        {openPostcode && (
          <>
            <div
              className="w-full h-full fixed z-0 bg-black bg-opacity-10"
              onClick={() => setOpenPostcode(false)}
              aria-hidden="true"
              aria-labelledby="modal-title"
            />
            <div
              className="w-[400px] fixed flex justify-center items-center roundex-xl"
              aria-modal="true"
            >
              <h2 id="modal-title" className="sr-only">
                주소 검색 모달
              </h2>
              <DaumPostcode
                className="rounded-xl"
                onComplete={(data) => {
                  methods.setValue('address', data.address)
                  setOpenPostcode(false)
                }}
                autoClose={false}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Register
