import { SideDrawerProps } from '@/types/type'
import Close from '@/pages/assets/icons/Close.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import ThemeToggleButton from '@/components/common/ThemeToggleButton'

const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  const { loginUser, logout } = useAuth()
  const [isNavActive, setIsNavActive] = useState(false)

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
        aria-hidden="true"
        onClick={onClose}
      />
      <nav
        className={`fixed right-0 top-0 z-50 flex h-full transform flex-col items-start bg-white py-6 transition-transform duration-500 ease-in-out dark:bg-zinc-700 mobile:w-full sm:w-96 md:w-[28rem] ${isNavActive ? 'mobile:translate-y-0 sm:translate-x-0' : 'mobile:-translate-y-full sm:translate-x-full sm:translate-y-0'}`}
        role="navigation"
        aria-label="메인 메뉴"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="메뉴 서랍 닫기"
          className="mr-10 mt-2 self-end"
        >
          <Close className="h-5 w-5" aria-hidden="true" />
        </button>
        <ul className="mt-12 flex w-full flex-col">
          <li className="mb-8 w-full px-8">
            <ThemeToggleButton size="large" hideAtMobile={false} />
          </li>
          <li className="side-menu-item">
            <Link href="/">Home</Link>
          </li>
          <li className="side-menu-item">
            <Link href="/ai-flower-detection">AI flower detection</Link>
          </li>
          <li className="side-menu-item">
            <Link href="/plant-info">Plant Info</Link>
          </li>
          <li className="side-menu-item">
            <Link href="/my-dictionary">My Dictionary</Link>
          </li>
          <li className="side-menu-item">
            {loginUser ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default SideDrawer
