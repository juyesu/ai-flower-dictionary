import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import CircleUser from '@/pages/assets/icons/CircleUser.svg'
import { useEffect, useState } from 'react'

const LoginSwitcher = () => {
  const { loginUser, logout, withdrawAccount } = useAuth()
  const [userName, setUserName] = useState<string | null>('')

  useEffect(() => {
    if (loginUser) {
      setUserName(localStorage.getItem(`${loginUser}.name`))
    }
  }, [loginUser])

  return (
    <div className="sm:ml-2 lg:ml-4 mr-4 flex justify-center items-center sm:gap-1 lg:gap-1.5 h-full">
      {loginUser ? (
        <div className="flex ml-8">
          <div className="flex items-center gap-1.5">
            <CircleUser className="w-6 h-6" fill="#60A5FA" aria-hidden="true" />
            {userName && (
              <p className="text-blue-400">
                <span className="font-bold">{userName}</span>님 반갑습니다!
              </p>
            )}
          </div>
          <div className="mx-4 flex justify-center gap-2">
            <button
              className="sm:px-4 sm:py-1 border-2 rounded-full text-zinc-500 sm:text-sm sm:font-semibold lg:font-bold"
              onClick={() => logout()}
            >
              로그아웃
            </button>
            <button
              className="sm:px-4 sm:py-1 border-2 rounded-full bg-zinc-400 text-zinc-100 sm:text-sm sm:font-semibold lg:font-bold"
              type="button"
              onClick={() => withdrawAccount()}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      ) : (
        <div className="sm:ml-2 lg:ml-8 mr-4 flex justify-center items-center sm:gap-1 lg:gap-1.5 h-full">
          <Link
            href="/login"
            className="sm:px-4 sm:py-1 border-2 rounded-full bg-blue-300 text-white sm:text-sm sm:font-semibold lg:font-bold"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="sm:px-3 sm:py-1 border-2 rounded-full bg-zinc-300 text-zinc-600 text-zinc-100 sm:text-sm sm:font-semibold lg:font-bold"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  )
}

export default LoginSwitcher
