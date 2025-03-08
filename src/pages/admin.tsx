import React, { useEffect, useState } from 'react'
import Layout from '@/components/common/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Title } from '@/components/ui/Title'
import User from '@/pages/assets/icons/User.svg'

const Admin = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('userEmail')) {
      router.push('/login')
    }

    setUserEmail(localStorage.getItem('userEmail'))
  }, [])

  const withdrawAccount = () => {
    localStorage.removeItem(`${userEmail}.name`)
    localStorage.removeItem(`${userEmail}.email`)
    localStorage.removeItem(`${userEmail}.password`)
    localStorage.removeItem(`${userEmail}.address`)
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    alert('회원 탈퇴되었습니다.')
    router.push('/')
  }

  return (
    <Layout>
      <div className="flex flex-col items-start w-full mt-32 ml-12">
        <Title>마이 페이지</Title>
        <div className="flex justify-center items-center my-4 w-36 h-36 border border-4 rounded-full overflow-hidden">
          <User className="rounded-full w-2/3 object-contain fill-stone-300" />
        </div>
        {userEmail && (
          <p className="ml-1 font-semibold">
            {localStorage.getItem(`${userEmail}.name`)}님 환영합니다!
          </p>
        )}
        <div className="flex items-center justify-center mt-4">
          <Link
            href="/"
            className="flex justify-center items-centerw-16 p-2 border rounded"
            onClick={() => {
              localStorage.removeItem('userEmail')
              localStorage.removeItem('userName')
            }}
          >
            로그아웃
          </Link>
          <button
            className="ml-4 text-red-500 text-sm"
            type="button"
            onClick={withdrawAccount}
          >
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Admin
