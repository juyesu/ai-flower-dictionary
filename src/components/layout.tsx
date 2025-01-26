import styles from './../../styles/layout.module.css'
import Link from 'next/link'
import ThemeProvider from './ThemeProvider'
import type { ChildrenComponentsProps } from '@/types/type'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Sun from '@/pages/assets/icons/Sun.svg'
import Moon from '@/pages/assets/icons/Moon.svg'

const RootLayout = ({ children }: ChildrenComponentsProps) => {
  const [loginUser, setLoginUser] = useState<string | null>(null)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

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
          <div className="flex flex-row justify-between items-center fixed md:px-2 xl:px-20 2xl:px-80 min-[1920px]:px-[28rem] h-20 w-full bg-zinc-100 opacity-80">
            <Link href="/" className={styles.logo}>
              AI flower dictionary
            </Link>
            <div className="mr-8 flex flex-row justify-between items-center gap-8 h-full">
              <Link href="/webcam" className={styles.menu}>
                Webcam
              </Link>
              <Link href="/info" className={styles.menu}>
                Plant Info
              </Link>
              <Link href="/dictionary" className={styles.menu}>
                My Dictionary
              </Link>
              {!loginUser && (
                <div className="ml-8 flex justify-center items-center gap-1.5 h-full">
                  <Link
                    href="/login"
                    className="px-8 py-1.5 border-2 rounded-full text-zinc-500 font-bold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register-page"
                    className="px-5 py-1.5 border-2 rounded-full bg-zinc-400 text-zinc-100 font-bold"
                  >
                    Sign up
                  </Link>
                </div>
              )}
              {/* <Link
                href={`${loginUser ? '/admin' : 'login'}`}
                className={styles.menu}
              >
                {loginUser ? '마이페이지' : '로그인'}
              </Link> */}
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
              <button
                className="flex items-center transition"
                onClick={() => {
                  setTheme(currentTheme === 'dark' ? 'light' : 'dark')
                }}
              >
                {currentTheme === 'dark' ? (
                  <div className="flex justify-center items-center rounded-2xl h-11 w-11 bg-neutral-400">
                    <Sun width="24px" height="24px" fill="#e6e6e6" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center rounded-2xl h-11 w-11 bg-neutral-400">
                    <Moon width="24px" height="24px" fill="#e6e6e6" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {children}

          <div className="mt-28 flex flex-col justify-center items-center h-40 w-full border-t">
            <p className="w-full text-center text-sm font-semibold text-rose-400">
              Made by 유한대학교 인공지능학과 인공지능과 언어 4조
            </p>
            <p className="mt-1.5 w-full text-center text-xs font-semibold text-gray-400">
              김지혁 양서연 이유찬 채기석 최지혜 추연우
            </p>
            <p className="mt-4 w-full text-center text-xs text-gray-400">
              powerd by Chat GPT , Teachable Machine
            </p>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default RootLayout
