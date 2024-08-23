'use client'
import { useTheme } from 'next-themes'
import Sun from '@/pages/assets/icons/Sun.svg'
import Moon from '@/pages/assets/icons/Moon.svg'

const DarkModeBtn = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <>
      <button
        className="flex items-center transition"
        onClick={() => {
          setTheme(currentTheme === 'dark' ? 'light' : 'dark')
        }}
      >
        {currentTheme === 'dark' ? (
          <div className="flex justify-center items-center rounded-2xl h-10 w-10 bg-neutral-400">
            <Sun width="24px" height="24px" fill="#5f6368" />
          </div>
        ) : (
          <div className="flex justify-center items-center rounded-2xl h-10 w-10 bg-white">
            <Moon width="24px" height="24px" fill="#5f6368" />
          </div>
        )}
      </button>
    </>
  )
}

export default DarkModeBtn
