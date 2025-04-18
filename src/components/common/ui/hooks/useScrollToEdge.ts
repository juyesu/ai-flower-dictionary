import { scrollStateStore } from '@/store/scrollStateStore'

const useScrollToEdge = () => {
  const { setIsScrolling } = scrollStateStore()

  const scrollToTop = () => {
    setIsScrolling(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setTimeout(() => setIsScrolling(false), 1000)
  }

  const scrollToBottom = () => {
    setIsScrolling(true)
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })

    setTimeout(() => setIsScrolling(false), 1000)
  }

  return { scrollToTop, scrollToBottom }
}

export default useScrollToEdge
