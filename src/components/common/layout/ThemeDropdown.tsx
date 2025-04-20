import { useTheme } from 'next-themes'
import { Sun, Moon, Desktop } from '@/pages/assets/icons'
import { ThemeDropdownProps } from '@/types/type'
import { useState } from 'react'

const ThemeDropdown = ({ hiddenUntil, hideAtMobile }: ThemeDropdownProps) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <div className='relative'>
      {currentTheme === 'light' ? (
        <button
          type='button'
          className={`${hiddenUntil == 'md' ? 'lg:flex lg:items-center' : 'sm:flex sm:items-center'} ${hideAtMobile && 'mobile:hidden'}`}
          onClick={() => {
            setIsThemeMenuOpen(!isThemeMenuOpen)
          }}
          aria-label='테마 선택 드롭다운 열기'
          aria-haspopup='true'
          aria-expanded={isThemeMenuOpen}
          aria-controls='theme-menu'
        >
          <span className='flex items-center justify-center bg-zinc-400 p-1 hover:bg-zinc-300 mobile:rounded-xl sm:h-8 sm:w-8 lg:h-11 lg:w-11 lg:rounded-2xl'>
            <Sun className='h-6 w-6' fill='#e6e6e6' aria-hidden='true' />
          </span>
        </button>
      ) : (
        <button
          type='button'
          className={`${hiddenUntil == 'md' ? 'lg:flex lg:items-center' : 'sm:flex sm:items-center'} ${hideAtMobile && 'mobile:hidden'}`}
          onClick={() => {
            setIsThemeMenuOpen(!isThemeMenuOpen)
          }}
          aria-label='테마 선택 드롭다운 열기'
          aria-haspopup='true'
          aria-expanded={isThemeMenuOpen}
          aria-controls='theme-menu'
        >
          <span className='flex items-center justify-center bg-zinc-400 p-1 hover:bg-zinc-500 mobile:rounded-xl sm:h-8 sm:w-8 lg:h-11 lg:w-11 lg:rounded-2xl'>
            <Moon className='h-6 w-6' fill='#e6e6e6' aria-hidden='true' />
          </span>
        </button>
      )}
      <ul
        id='theme-menu'
        className={`absolute right-0 transition-all duration-300 ease-out qhd:right-auto ${isThemeMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'} top-full mt-2 flex-col whitespace-nowrap rounded-xl bg-zinc-200 text-lg dark:bg-slate-600 mobile:hidden lg:flex`}
        role='menu'
      >
        <li role='menuitem'>
          <button
            className='flex w-full flex-row items-center rounded-t-xl px-5 py-4 hover:bg-zinc-400 dark:hover:bg-slate-500'
            onClick={() => setTheme('light')}
          >
            <span className='mr-3'>
              <Sun
                className={`h-[1.375rem] w-[1.375rem] text-zinc-800 dark:text-gray-200`}
                fill='currentColor'
                aria-hidden='true'
              />
            </span>
            밝은 테마
          </button>
        </li>
        <li role='menuitem'>
          <button
            className='flex w-full flex-row items-center px-5 py-4 text-lg hover:bg-zinc-400 dark:hover:bg-slate-500'
            onClick={() => setTheme('dark')}
          >
            <span className='mr-3'>
              <Moon
                className={`h-[1.375rem] w-[1.375rem] text-zinc-800 dark:text-gray-200`}
                fill='currentColor'
                aria-hidden='true'
              />
            </span>
            어두운 테마
          </button>
        </li>
        <li role='menuitem'>
          <button
            className='flex w-full flex-row items-center rounded-b-xl px-5 py-4 text-lg hover:bg-zinc-400 dark:hover:bg-slate-500'
            onClick={() => setTheme('system')}
          >
            <span className='mr-3'>
              <Desktop
                className={`h-[1.375rem] w-[1.375rem] text-zinc-800 dark:text-gray-200`}
                fill='currentColor'
                aria-hidden='true'
              />
            </span>
            시스템 테마
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ThemeDropdown
