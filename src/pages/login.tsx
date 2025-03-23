import React, { useEffect } from 'react'
import Layout from '@/components/common/Layout'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormType } from '@/types/type'

const Login = () => {
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { loginUser, setLoginUser } = useAuth()

  useEffect(() => {
    if (loginUser) {
      router.push('/')
    }
  }, [loginUser])

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    if (
      localStorage.getItem(`${data.email}.email`) == data.email &&
      localStorage.getItem(`${data.email}.password`) == data.password
    ) {
      localStorage.setItem('userEmail', data.email)
      setLoginUser(data.email)
      router.push('/')
    } else {
      alert(
        '일치하는 계정이 존재하지 않습니다.\n이메일 또는 비밀번호를 다시 확인해주세요.'
      )
      methods.setValue('password', '')
    }
  }

  return (
    <Layout>
      <div className="login-page-layout">
        <div className="login-box">
          <div className="login-form-layout">
            <h1 className="login-header-title">로그인</h1>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="login-label-input-group">
                <label htmlFor="email" className="mt-2 dark:text-zinc-300">
                  이메일
                </label>
                <input
                  id="email"
                  type="text"
                  className="login-form-input"
                  {...methods.register('email', {
                    required: '이메일을 입력해주세요',
                  })}
                />
                {methods.formState.errors.email && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="login-label-input-group">
                <label htmlFor="password" className="dark:text-zinc-300">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  className="login-form-input"
                  {...methods.register('password', {
                    required: '비밀번호를 입력해주세요',
                  })}
                />
                {methods.formState.errors.password && (
                  <p className="login-form-schema-error">
                    {methods.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button className="login-form-submit-button dark:bg-blue-500 dark:text-slate-100 dark:hover:bg-blue-600">
                로그인
              </button>
              <Link href="/register" className="login-link-text">
                아직 회원이 아니신가요?
                <span>회원가입</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
