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
    <div className="mr-4 mobile:hidden lg:flex h-full items-center justify-center sm:ml-2 sm:gap-1 lg:ml-4 lg:gap-1.5">
      {loginUser ? (
        <div className="ml-3 flex">
          <div className="flex items-center gap-1.5">
            <CircleUser
              className="h-6 w-6 text-blue-400 dark:text-blue-600"
              fill="currentColor"
              aria-hidden="true"
            />
            {userName && (
              <p className="text-blue-400 dark:text-blue-600">
                <span className="font-bold">{userName}</span>님 반갑습니다!
              </p>
            )}
          </div>
          <div className="mx-4 flex justify-center gap-2">
            <button
              className="rounded-full border-2 text-zinc-500 hover:border-zinc-600 dark:border-gray-500 dark:text-zinc-400 dark:hover:border-gray-400 sm:px-4 sm:py-1 sm:text-sm sm:font-semibold lg:font-bold"
              onClick={() => logout()}
            >
              로그아웃
            </button>
            <button
              className="rounded-full border-2 bg-zinc-400 text-zinc-100 hover:border-zinc-600 dark:border-gray-500 dark:bg-zinc-700 dark:text-zinc-500 dark:hover:border-gray-400 sm:px-4 sm:py-1 sm:text-sm sm:font-semibold lg:font-bold"
              type="button"
              onClick={() => withdrawAccount()}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center sm:ml-2 sm:gap-1 lg:mx-1 xl:mx-4 lg:gap-1.5">
          <Link
            href="/login"
            className="dark:dark:saturate-30 rounded-full border-2 bg-blue-300 text-white hover:border-zinc-600 dark:border-gray-500 dark:hover:border-gray-300 sm:px-4 sm:py-1 sm:text-sm sm:font-semibold lg:font-bold"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="rounded-full border-2 bg-zinc-400 text-zinc-600 hover:border-zinc-600 dark:border-gray-500 dark:hover:border-gray-300 sm:px-3 sm:py-1 sm:text-sm sm:font-semibold lg:font-bold"
          >
            회원가입
          </Link>
        </div>
      )}
    </div>
  )
}

export default LoginSwitcher
