import ArrowUp from '@/pages/assets/icons/ArrowUp.svg'
import ArrowDown from '@/pages/assets/icons/ArrowDown.svg'
import { scrollButtonActivateStore } from '@/store/scrollButtonActivateStore'

const ScrollButton = () => {
  const { setIsActivate } = scrollButtonActivateStore()

  const scrollToTop = () => {
    setIsActivate(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setTimeout(() => setIsActivate(false), 1000)
  }

  const scrollToBottom = () => {
    setIsActivate(true)
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })

    setTimeout(() => setIsActivate(false), 1000)
  }
  return (
    <div className="flex flex-col items-center fixed right-10 bottom-8 border rounded-xl cursour-poiner bg-zinc-400 dark:bg-gray-600 dark:border-gray-400 opacity-70">
      <button
        type="button"
        className="p-2 border-b"
        onClick={scrollToTop}
        aria-label="스크롤 최상단으로 이동"
      >
        <ArrowUp className="fill-white w-5 h-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="p-2 border-t"
        onClick={scrollToBottom}
        aria-label="스크롤 최하단으로 이동"
      >
        <ArrowDown className="fill-white w-5 h-6" aria-hidden="true" />
      </button>
    </div>
  )
}

export default ScrollButton
