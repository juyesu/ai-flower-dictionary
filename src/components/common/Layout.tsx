import styles from '@styles/layout.module.css'
import Link from 'next/link'
import ThemeProvider from '@/components/common/ThemeProvider'
import type { ChildrenComponentsProps } from '@/types/type'
import { useTheme } from 'next-themes'
import Sun from '@/pages/assets/icons/Sun.svg'
import Moon from '@/pages/assets/icons/Moon.svg'
import TypeScript from '@/pages/assets/icons/TypeScript.svg'
import React from '@/pages/assets/icons/React.svg'
import NextJs from '@/pages/assets/icons/NextJs.svg'
import TailwindCss from '@/pages/assets/icons/TailwindCss.svg'
import LoginSwitcher from '@/components/common/LoginSwitcher'

const RootLayout = ({ children }: ChildrenComponentsProps) => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center w-full h-full">
        <header className="flex flex-row justify-between items-center fixed sm:px-4 sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem] sm:h-16 lg:h-20 w-full bg-zinc-100 dark:bg-slate-900 z-10">
          <Link href="/" className={`${styles.logo} dark:text-slate-300`}>
            AI flower dictionary
          </Link>
          <div className="lg:mr-8 flex flex-row justify-between items-center h-full">
            <div className="flex flex-row sm:gap-2 xl:gap-4 dark:text-slate-300">
              <Link
                href="/ai-flower-detection"
                className={`${styles.menu} dark:hover:bg-gray-700`}
              >
                AI flower detection
              </Link>
              <Link
                href="/plant-info"
                className={`${styles.menu} dark:hover:bg-gray-700`}
              >
                Plant Info
              </Link>
              <Link
                href="/my-dictionary"
                className={`${styles.menu} dark:hover:bg-gray-700`}
              >
                My Dictionary
              </Link>
            </div>
            <LoginSwitcher />
            <button
              className="flex items-center transition"
              onClick={() => {
                setTheme(currentTheme === 'dark' ? 'light' : 'dark')
              }}
              aria-label={
                currentTheme === 'dark'
                  ? '라이트 모드로 전환'
                  : '다크 모드로 전환'
              }
            >
              {currentTheme === 'dark' ? (
                <div className="flex justify-center items-center sm:rounded-xl lg:rounded-2xl sm:w-8 sm:h-8 lg:w-11 lg:h-11 bg-neutral-400 hover:bg-neutral-300">
                  <Sun
                    className="sm:w-4 lg:w-6 sm:h-4 lg:h-6"
                    fill="#e6e6e6"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center sm:rounded-xl lg:rounded-2xl sm:w-8 sm:h-8 lg:w-11 lg:h-11 bg-neutral-600 hover:bg-neutral-700">
                  <Moon
                    className="sm:w-4 lg:w-6 sm:h-4 lg:h-6"
                    fill="#e6e6e6"
                    aria-hidden="true"
                  />
                </div>
              )}
            </button>
          </div>
        </header>

        <main className="sm:mt-16 lg:mt-20 flex flex-col items-center justify-center dark:bg-[#1e1e1e] w-full">
          {children}
        </main>

        <footer className="flex flex-col justify-center items-center bg-zinc-50 dark:bg-zinc-800 h-44 w-full border-t dark:border-zinc-900">
          <div className="flex flex-col">
            <p className="w-full dark:text-slate-300 text-center text-sm font-semibold">
              Made by Front-End Developer KIM JI HYEOK
            </p>
            <p className="mt-2 w-full dark:text-slate-300 text-center text-xs text-gray-400">
              API : 한국수목정원관리원, Chat GPT , Teachable Machine, Daum
              Postcode
            </p>
          </div>
          <hr className="my-4 w-16 dark:border-zinc-900" />
          <ul className="flex flex-row gap-2" aria-hidden="true">
            <li>
              <TypeScript className="w-6 h-6 dark:saturate-[.8]" />
            </li>
            <li>
              <React className="w-6 h-6 dark:saturate-[.8]" />
            </li>
            <li>
              <NextJs className="w-6 h-6 dark:saturate-[.8]" />
            </li>
            <li>
              <TailwindCss className="w-10 h-6 dark:saturate-[.8]" />
            </li>
          </ul>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default RootLayout
