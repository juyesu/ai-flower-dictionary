import Link from 'next/link'
import type { ChildrenComponentsProps } from '@/types/type'
import MenuBars from '@/pages/assets/icons/MenuBars.svg'
import TypeScript from '@/pages/assets/icons/TypeScript.svg'
import React from '@/pages/assets/icons/React.svg'
import NextJs from '@/pages/assets/icons/NextJs.svg'
import TailwindCss from '@/pages/assets/icons/TailwindCss.svg'
import LoginSwitcher from '@/components/common/layout/LoginSwitcher'
import ThemeDropdown from '@/components/common/layout/ThemeDropdown'
import { useState } from 'react'
import SideDrawer from '@/components/common/layout/SideDrawer'
import { useModalStore } from '@/store/useModalStore'
import PlantDetectionModelErrorModal from '@/components/modal/PlantDetectionModelErrorModal'
import ApiDataErrorModal from '@/components/modal/ApiDataErrorModal'
import LoginRequiredModal from '@/components/modal/LoginRequiredModal'
import SearchNotFoundModal from '@/components/modal/SearchNotFoundModal'
import LogoutMessageModal from '@/components/modal/LogoutMessageModal'

const RootLayout = ({ children }: ChildrenComponentsProps) => {
  const [openSideDrawer, setOpenSideDrawer] = useState(false)
  const { isModalOpen, currentModal } = useModalStore()

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center">
        <header className="sticky top-0 z-50 flex h-full w-full flex-row items-center justify-between bg-zinc-100 dark:bg-slate-900 mobile:h-16 mobile:px-4 lg:h-20 2xl:px-16 qhd:px-[32rem]">
          <Link href="/" className={`site_logo dark:text-slate-300`}>
            AI flower dictionary
          </Link>
          <div className="flex h-full flex-row items-center justify-between xl:mr-8">
            <div className="flex-row dark:text-slate-300 mobile:hidden sm:gap-2 lg:flex xl:gap-4">
              <Link
                href="/ai-flower-detection"
                className={`header_menu_item dark:hover:bg-gray-700`}
              >
                AI flower detection
              </Link>
              <Link
                href="/plant-info"
                className={`header_menu_item dark:hover:bg-gray-700`}
              >
                Plant Info
              </Link>
              <Link
                href="/my-dictionary"
                className={`header_menu_item dark:hover:bg-gray-700`}
              >
                My Dictionary
              </Link>
            </div>
            {/* width: 1024px미만 */}
            <div className="mr-3 mt-0.5 flex items-center gap-5 lg:hidden">
              <button
                type="button"
                aria-label="메뉴 오버레이 열기"
                onClick={() => setOpenSideDrawer(true)}
              >
                <MenuBars
                  className="h-7 w-7"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </button>
            </div>
            <LoginSwitcher />
            <ThemeDropdown hiddenUntil="md" hideAtMobile={true} />
          </div>
        </header>

        <main className="flex w-full flex-col items-center justify-center dark:bg-[#1e1e1e]">
          {children}
        </main>

        <footer className="flex h-44 w-full flex-col items-center justify-center border-t bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-800">
          <div className="flex flex-col">
            <p className="w-full text-center text-sm font-semibold text-zinc-600 dark:text-slate-400">
              Made by Front-End Developer KIM JI HYEOK
            </p>
            <p className="mt-2 w-full text-center text-xs text-gray-400 dark:text-slate-400">
              API : 한국수목정원관리원, Chat GPT , Teachable Machine, Daum
              Postcode
            </p>
          </div>
          <hr className="my-4 w-16 dark:border-zinc-900" />
          <ul className="flex flex-row gap-2" aria-hidden="true">
            <li>
              <TypeScript className="h-6 w-6 dark:saturate-[.8]" />
            </li>
            <li>
              <React className="h-6 w-6 dark:saturate-[.8]" />
            </li>
            <li>
              <NextJs className="h-6 w-6 dark:saturate-[.8]" />
            </li>
            <li>
              <TailwindCss className="h-6 w-10 dark:saturate-[.8]" />
            </li>
          </ul>
        </footer>
        {isModalOpen && currentModal == 'PlantDetectionModelErrorModal' && (
          <PlantDetectionModelErrorModal />
        )}
        {isModalOpen && currentModal == 'LoginRequiredModal' && (
          <LoginRequiredModal />
        )}
        {isModalOpen && currentModal == 'SearchNotFoundModal' && (
          <SearchNotFoundModal />
        )}
        {isModalOpen && currentModal == 'ApiDataErrorModal' && (
          <ApiDataErrorModal />
        )}
        {isModalOpen && currentModal == 'LogoutMessageModal' && (
          <LogoutMessageModal />
        )}
      </div>
      <SideDrawer
        isOpen={openSideDrawer}
        onClose={() => setOpenSideDrawer(false)}
      />
    </>
  )
}

export default RootLayout
