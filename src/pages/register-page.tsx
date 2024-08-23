import Layout from '@/components/layout'
import { Title } from '@/components/ui/Title'
import styles from './../../styles/RegisterPage.module.css'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { LoginFormType } from '@/types/type'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'

const RegisterPage = () => {
  const methods = useForm<LoginFormType>()
  const router = useRouter()
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
      <div className={styles.pageLayout}>
        <Title>회원가입</Title>
        <div className={styles.formLayout}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                className="mt-2 p-1.5 border w-full rounded"
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
                <p className={styles.formSchemaError}>
                  {methods.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                className="mt-2 p-1.5 border w-full rounded"
                {...methods.register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '이메일 형식이 잘못되었습니다',
                  },
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
                <p className={styles.formSchemaError}>
                  {methods.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">주소</label>
              <div className="flex gap-2">
                {/* 추후 팝업을 통해서만 입력받을 수 있도록 변경 (readOnly 처리) */}
                <input
                  id="address"
                  type="text"
                  className="mt-2 p-1.5 border w-full rounded bg-stone-100"
                  {...methods.register('address', {
                    required: '주소를 입력해주세요',
                  })}
                />
                <button
                  type="button"
                  className={styles.popupOpenButton}
                  aria-label="주소입력 팝업 열기"
                >
                  <MagnifyingGlass className="w-4 h-4" />
                </button>
              </div>
              {methods.formState.errors.address && (
                <p className={styles.formSchemaError}>
                  {methods.formState.errors.address.message}
                </p>
              )}
            </div>

            <button className={styles.submitButton}>회원가입</button>
            <Link href="/login" className={styles.linkText}>
              이미 계정이 있으신가요?&nbsp;
              <span className="underline">로그인</span>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterPage
