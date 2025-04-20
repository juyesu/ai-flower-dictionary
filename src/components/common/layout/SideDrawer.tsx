import { SideDrawerProps } from '@/types/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Close, Sun, Moon, Desktop } from '@/pages/assets/icons'
import { useTheme } from 'next-themes'

const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  const { userId, logout } = useAuth()
  const [isNavActive, setIsNavActive] = useState(false)
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      setIsNavActive(true)
    } else {
      setIsNavActive(false)
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 z-40 h-full w-full bg-zinc-900 bg-opacity-60 dark:bg-zinc-900 dark:bg-opacity-80 ${isNavActive ? 'visible' : 'hidden'}`}
        aria-hidden='true'
        onClick={onClose}
      />
      <nav
        className={`fixed right-0 top-0 z-50 flex h-full transform flex-col items-start bg-white py-6 transition-transform duration-500 ease-in-out dark:bg-zinc-700 mobile:w-full sm:w-96 md:w-[28rem] ${isNavActive ? 'mobile:translate-y-0 sm:translate-x-0' : 'mobile:-translate-y-full sm:translate-x-full sm:translate-y-0'}`}
        role='navigation'
        aria-label='메인 메뉴'
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='메뉴 서랍 닫기'
          className='mr-10 mt-2 self-end'
        >
          <Close className='h-5 w-5' aria-hidden='true' />
        </button>
        <ul className='mt-12 flex w-full flex-col'>
          <li className='drawer_menu_item'>
            <Link href='/'>Home</Link>
          </li>
          <li className='drawer_menu_item'>
            <Link href='/ai-flower-detection'>AI flower detection</Link>
          </li>
          <li className='drawer_menu_item'>
            <Link href='/plant-info'>Plant Info</Link>
          </li>
          <li className='drawer_menu_item'>
            <Link href='/my-dictionary'>My Dictionary</Link>
          </li>
          <li className='drawer_menu_item'>
            {userId ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <Link href='/login'>Login</Link>
            )}
          </li>
          <li className='mt-8 w-full px-8 text-xl'>
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              aria-controls='theme-submenu'
              aria-expanded={isThemeMenuOpen}
            >
              Theme <span className='ml-1 text-sm'>▼</span>
            </button>
            <ul
              id='theme-submenu'
              className={`transition-all duration-100 ease-out ${isThemeMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none opacity-0'} mt-2 -translate-y-2`}
            >
              <li className='py-2 text-xl'>
                <button className='flex items-center' onClick={() => setTheme('light')}>
                  <span className='mr-2'>
                    <Sun
                      className='h-5 w-5 text-zinc-800 dark:text-gray-200'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                  </span>
                  밝은 테마
                </button>
              </li>
              <li className='py-2 text-xl'>
                <button className='flex items-center' onClick={() => setTheme('dark')}>
                  <span className='mr-3'>
                    <Moon
                      className='h-5 w-5 text-zinc-800 dark:text-gray-200'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                  </span>
                  어두운 테마
                </button>
              </li>
              <li className='py-2 text-xl'>
                <button className='flex items-center' onClick={() => setTheme('system')}>
                  <span className='mr-3'>
                    <Desktop
                      className='h-5 w-5 text-zinc-800 dark:text-gray-200'
                      fill='currentColor'
                      aria-hidden='true'
                    />
                  </span>
                  시스템 테마
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default SideDrawer
