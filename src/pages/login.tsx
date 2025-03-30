import Layout from '@/components/common/Layout'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@/components/login/hooks/useLoginForm'
import LoginForm from '@/components/login/LoginForm'

const Login = () => {
  const { methods, onSubmit } = useLoginForm()

  return (
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
  )
}

export default Login
