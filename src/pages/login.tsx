import React from 'react'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import styles from './../../styles/RegisterPage.module.css'
import { Title } from '@/components/ui/Title'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormType } from '@/types/type'

const Login = () => {
  const methods = useForm<LoginFormType>()
  const router = useRouter()
  const { setLoginUser } = useAuth()

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    if (
      localStorage.getItem(`${data.email}.email`) == data.email &&
      localStorage.getItem(`${data.email}.password`) == data.password
    ) {
      localStorage.setItem('userEmail', data.email)
      setLoginUser(data.email)
      router.push('/admin')
    } else {
      alert(
        '일치하는 계정이 존재하지 않습니다.\n이메일 또는 비밀번호를 다시 확인해주세요.'
      )
    }
  }

  return (
    <Layout>
      <div className={styles.pageLayout}>
        <Title>로그인</Title>
        <div className={styles.formLayout}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className="mt-2">
                이메일
              </label>
              <input
                id="email"
                type="text"
                className="mt-2 p-1.5 border w-full rounded"
                {...methods.register('email', {
                  required: '이메일을 입력해주세요',
                })}
              />
              {methods.formState.errors.email && (
                <p className={styles.formSchemaError}>
                  {methods.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                className="mt-2 p-1.5 border w-full rounded"
                {...methods.register('password', {
                  required: '비밀번호를 입력해주세요',
                })}
              />
              {methods.formState.errors.password && (
                <p className={styles.formSchemaError}>
                  {methods.formState.errors.password.message}
                </p>
              )}
            </div>

            <button className={styles.submitButton}>로그인</button>
            <Link href="/register-page" className={styles.linkText}>
              아직 회원이 아니신가요?&nbsp;
              <span className="underline">회원가입</span>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
