import styles from '@styles/layout.module.css'
import Link from 'next/link'
import ThemeProvider from '@/components/common/ThemeProvider'
import type { ChildrenComponentsProps } from '@/types/type'
import { useTheme } from 'next-themes'
import Sun from '@/pages/assets/icons/Sun.svg'
import Moon from '@/pages/assets/icons/Moon.svg'
import LoginSwitcher from '@/components/common/LoginSwitcher'

const RootLayout = ({ children }: ChildrenComponentsProps) => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <ThemeProvider>
      <div className="flex flex-col items-center w-full h-full">
        <header className="flex flex-row justify-between items-center fixed sm:px-4 sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem] sm:h-16 lg:h-20 w-full bg-zinc-100 z-10">
          <Link href="/" className={styles.logo}>
            AI flower dictionary
          </Link>
          <div className="lg:mr-8 flex flex-row justify-between items-center h-full">
            <div className="flex flex-row sm:gap-4 xl:gap-8">
              <Link href="/ai-flower-detection" className={styles.menu}>
                AI flower detection
              </Link>
              <Link href="/plant-info" className={styles.menu}>
                Plant Info
              </Link>
              <Link href="/my-dictionary" className={styles.menu}>
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
                <div className="flex justify-center items-center sm:rounded-xl lg:rounded-2xl sm:w-8 sm:h-8 lg:w-11 lg:h-11 bg-neutral-400">
                  <Sun
                    className="sm:w-4 lg:w-6 sm:h-4 lg:h-6"
                    fill="#e6e6e6"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center sm:rounded-xl lg:rounded-2xl sm:w-8 sm:h-8 lg:w-11 lg:h-11 bg-neutral-400">
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

        <main className="sm:mt-16 lg:mt-20 flex flex-col items-center justify-center w-full">
          {children}
        </main>

        <footer className="flex flex-col justify-center items-center h-40 w-full border-t">
          <p className="w-full text-center text-sm font-semibold text-rose-400">
            Made by 유한대학교 인공지능학과 인공지능과 언어 4조
          </p>
          <p className="mt-1.5 w-full text-center text-xs font-semibold text-gray-400">
            김지혁 양서연 이유찬 채기석 최지혜 추연우
          </p>
          <p className="mt-4 w-full text-center text-xs text-gray-400">
            powerd by Chat GPT , Teachable Machine
          </p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default RootLayout
