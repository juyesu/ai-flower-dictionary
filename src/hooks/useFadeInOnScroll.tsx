import { useState, useEffect, useRef } from 'react'

const useFadeInOnScroll = () => {
  const isInViewRef = useRef<Record<string, boolean>>({})
  const [isInView, setIsInView] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        let updatedState = false
        const newIsInView = { ...isInViewRef.current }

        entries.forEach((entry) => {
          const id = entry.target.id
          if (id && entry.isIntersecting && !newIsInView[id]) {
            newIsInView[id] = true
            updatedState = true
            observer.unobserve(entry.target)
          }
        })

        if (updatedState) {
          isInViewRef.current = newIsInView
          setIsInView(newIsInView)
        }
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.hidden_opacity[id]').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return isInView
}

export default useFadeInOnScroll
