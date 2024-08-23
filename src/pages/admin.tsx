import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Title } from '@/components/ui/Title'

const Admin = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
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
    router.push('/login')
  }

  return (
    <Layout>
      <div className="flex flex-col items-start w-full mt-32 ml-12">
        <Title>마이 페이지</Title>
        <div className="flex justify-center items-center my-4 w-36 h-36 border border-4 rounded-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="rounded-full w-2/3 object-contain fill-stone-300"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
        </div>
        <p className="ml-1 font-semibold">
          {localStorage.getItem(`${userEmail}.name`)}님 환영합니다!
        </p>
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
