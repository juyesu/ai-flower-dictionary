import React from 'react'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const linkToAdminPage = () => {
    router.push('/admin')
  }

  return (
    <Layout>
      <div className="flex flex-row justify-center items-center w-2/3 h-48 mt-48 mx-24 border border-gray-200">
        <div className="flex flex-col w-3/5 h-1/2 gap-3">
          <input
            className="pl-4 h-full border border-gray-200"
            placeholder="ID"
          />
          <input
            className="pl-4 h-full border border-gray-200"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          className="flex justify-center items-center ml-4 w-1/3 h-2/5 bg-rose-300/50 font-bold text-gray-100"
          type="button"
          onClick={linkToAdminPage}
        >
          Login
        </button>
      </div>
    </Layout>
  )
}

export default Login
