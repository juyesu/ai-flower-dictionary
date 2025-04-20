import { ArrowUp, ArrowDown } from '@/pages/assets/icons'
import useScrollToEdge from '@/components/common/ui/hooks/useScrollToEdge'

const ScrollButton = () => {
  const { scrollToTop, scrollToBottom } = useScrollToEdge()

  return (
    <div className="cursour-poiner fixed z-50 flex flex-col items-center rounded-xl border bg-zinc-400 opacity-70 dark:border-gray-400 dark:bg-gray-600 mobile:bottom-6 mobile:right-6 sm:bottom-8 sm:right-10">
      <button
        type="button"
        className="border-b p-2"
        onClick={scrollToTop}
        aria-label="스크롤 최상단으로 이동"
      >
        <ArrowUp
          className="fill-white mobile:h-5 mobile:w-4 sm:h-6 sm:w-5"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        className="border-t mobile:p-1.5 sm:p-2"
        onClick={scrollToBottom}
        aria-label="스크롤 최하단으로 이동"
      >
        <ArrowDown
          className="fill-white mobile:h-5 mobile:w-4 sm:h-6 sm:w-5"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default ScrollButton
