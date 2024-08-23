import styles from './../../styles/layout.module.css'
import Link from 'next/link'
import ThemeProvider from './ThemeProvider'
import DarkModeBtn from './DarkModeBtn'
import type { ChildrenComponentsProps } from '@/types/type'
import { useEffect, useState } from 'react'

const RootLayout = ({ children }: ChildrenComponentsProps) => {
  const [loginUser, setLoginUser] = useState<string | null>(null)

  useEffect(() => {
    setLoginUser(localStorage.getItem('userEmail'))
  }, [])

  const logout = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    alert('로그아웃 되었습니다.')
    window.location.reload()
  }

  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-row justify-between items-center fixed h-20 w-full border bg-rose-200 opacity-80">
            <Link href="/" className={styles.logo}>
              AI flower dictionary
            </Link>
            <div className="mr-8 flex flex-row justify-between items-center gap-5">
              <Link href="/info" className={styles.menu}>
                식물 도감
              </Link>
              <Link
                href={`${loginUser ? '/admin' : 'login'}`}
                className={styles.menu}
              >
                {loginUser ? '마이페이지' : '로그인'}
              </Link>
              {loginUser && (
                <div className="flex flex-row gap-2">
                  <p className="text-rose-400">
                    <span className="font-bold">
                      {localStorage.getItem(`${loginUser}.name`)}
                    </span>
                    님 환영합니다!
                  </p>
                  <button
                    type="button"
                    className="p-0.5 border rounded bg-stone-100 text-xs"
                    onClick={logout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
              <DarkModeBtn />
            </div>
          </div>

          {children}

          <div className="mt-52 flex flex-col justify-center items-center h-32 w-full border-t ">
            <p className="w-full text-center text-sm font-semibold text-rose-400">
              Made by 유한대학교 인공지능학과 인공지능과 언어 4조
            </p>
            <p className="mt-1.5 w-full text-center text-xs font-semibold text-gray-400">
              김지혁 양서연 이유찬 채기석 최지혜 추연우
            </p>
            <p className="mt-3 w-full text-center text-xs text-gray-400">
              powerd by Chat GPT , Teachable Machine
            </p>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default RootLayout
