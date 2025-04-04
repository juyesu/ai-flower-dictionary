import Layout from '@/components/common/layout/Layout'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@/components/login/hooks/useLoginForm'
import LoginForm from '@/components/login/LoginForm'
import Head from 'next/head'

const Login = () => {
  const { methods, onSubmit } = useLoginForm()

  return (
    <>
      <Head>
        <title>로그인 페이지</title>
        <meta
          name="description"
          content="서비스에 로그인하여 더욱 다양한 기능을 이용해보세요."
        />
        <meta property="og:title" content="로그인 페이지" />
        <meta
          property="og:description"
          content="서비스에 로그인하여 더욱 다양한 기능을 이용해보세요."
        />
        <meta name="twitter:title" content="로그인 페이지" />
        <meta
          name="twitter:description"
          content="서비스에 로그인하여 더욱 다양한 기능을 이용해보세요."
        />
      </Head>
      <Layout>
        <div className="login_page_layout">
          <div className="login_container">
            <div className="login_form">
              <h1 className="login_page_title">로그인</h1>
              <FormProvider {...methods}>
                <LoginForm onSubmit={onSubmit} />
              </FormProvider>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Login
