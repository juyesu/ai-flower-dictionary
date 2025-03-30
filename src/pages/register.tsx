import Layout from '@/components/common/Layout'
import RegisterForm from '@/components/register/RegisterForm'
import AddressPopup from '@/components/register/AddressPopup'
import { FormProvider } from 'react-hook-form'
import useRegisterForm from '@/components/register/hooks/useRegisterForm'

const Register = () => {
  const { methods, onSubmit, openPostcode, setOpenPostcode } = useRegisterForm()

  return (
    <Layout>
      <FormProvider {...methods}>
        <div className="login_page_layout">
          <div className="login_container">
            <div className="login_form dark:border-zinc-500">
              <h1 className="login_page_title dark:text-slate-300">회원가입</h1>
              <RegisterForm
                onSubmit={onSubmit}
                setOpenPostcode={setOpenPostcode}
              />
            </div>
          </div>
          {openPostcode && (
            <AddressPopup setOpenPostcode={setOpenPostcode} />
          )}
        </div>
      </FormProvider>
    </Layout>
  )
}

export default Register
