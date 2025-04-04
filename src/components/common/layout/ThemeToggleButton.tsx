import { useTheme } from 'next-themes'
import Sun from '@/pages/assets/icons/Sun.svg'
import Moon from '@/pages/assets/icons/Moon.svg'
import { ThemeToggleButtonProps } from '@/types/type'

const ThemeToggleButton = ({
  size,
  hiddenUntil,
  hideAtMobile,
}: ThemeToggleButtonProps) => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      type="button"
      className={`${hiddenUntil == 'md' ? 'lg:flex lg:items-center' : 'sm:flex sm:items-center'} ${hideAtMobile && 'mobile:hidden'}`}
      onClick={() => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark')
      }}
      aria-label={
        currentTheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
      }
    >
      {currentTheme === 'dark' ? (
        <div
          className={`flex items-center justify-center bg-zinc-400 p-1 hover:bg-zinc-300 mobile:rounded-xl lg:rounded-2xl ${size == 'small' ? 'sm:h-8 sm:w-8 lg:h-11 lg:w-11' : 'h-11 w-11'}`}
        >
          <Sun
            className={`${size == 'small' ? 'h-6 w-6' : 'h-8 w-8'}`}
            fill="#e6e6e6"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center bg-zinc-400 p-1 hover:bg-zinc-500 mobile:rounded-xl lg:rounded-2xl ${size == 'small' ? 'sm:h-8 sm:w-8 lg:h-11 lg:w-11' : 'h-11 w-11'}`}
        >
          <Moon
            className={`${size == 'small' ? 'h-6 w-6' : 'h-8 w-8'}`}
            fill="#e6e6e6"
            aria-hidden="true"
          />
        </div>
      )}
    </button>
  )
}

export default ThemeToggleButton
