import ArrowUp from '@/pages/assets/icons/ArrowUp.svg'
import ArrowDown from '@/pages/assets/icons/ArrowDown.svg'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  })
}

const ScrollButton = () => {
  return (
    <div className="flex flex-col items-center fixed right-7 bottom-5 border rounded-xl cursour-poiner bg-rose-200 dark:bg-gray-600 dark:border-gray-400 opacity-70">
      <ArrowUp
        className="fill-white p-1.5 cursour-poiner border-b"
        onClick={scrollToTop}
      />
      <ArrowDown
        className="fill-white p-1.5 cursour-poiner h-9"
        onClick={scrollToBottom}
      />
    </div>
  )
}

export default ScrollButton
