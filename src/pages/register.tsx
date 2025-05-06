import Layout from '@/components/common/layout/Layout'
import RegisterForm from '@/components/register/RegisterForm'
import AddressPopup from '@/components/register/AddressPopup'
import { FormProvider } from 'react-hook-form'
import useRegisterForm from '@/components/register/hooks/useRegisterForm'
import Head from 'next/head'
import RedirectIfAuthenticated from '@/components/common/auth-guard/RedirectIfAuthenticated'

const Register = () => {
  const { methods, onSubmit, openPostcode, setOpenPostcode } = useRegisterForm()

  return (
    <RedirectIfAuthenticated>
      <Head>
        <title>회원가입 페이지</title>
        <meta
          name='description'
          content='카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다.'
        />
        <meta property='og:title' content='회원가입 페이지' />
        <meta
          property='og:description'
          content='카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다.'
        />
        <meta name='twitter:title' content='회원가입 페이지' />
        <meta
          name='twitter:description'
          content='카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다.'
        />
      </Head>
      <Layout>
        <FormProvider {...methods}>
          <div className='login_page_layout'>
            <div className='login_container'>
              <div className='login_form dark:border-zinc-500'>
                <h1 className='login_page_title dark:text-slate-300'>회원가입</h1>
                <RegisterForm onSubmit={onSubmit} setOpenPostcode={setOpenPostcode} />
              </div>
            </div>
            {openPostcode && <AddressPopup setOpenPostcode={setOpenPostcode} />}
          </div>
        </FormProvider>
      </Layout>
    </RedirectIfAuthenticated>
  )
}

export default Register
