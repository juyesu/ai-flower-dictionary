import { useEffect, useState } from 'react'
import { scrollButtonActivateStore } from '@/store/scrollButtonActivateStore'

const useSectionScroll = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { isActivate } = scrollButtonActivateStore()

  useEffect(() => {
    if (isActivate) return
    const sections = document.querySelectorAll('.scroll-trigger')

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)

        if (visibleSections.length > 0) {
          const newActiveSection = visibleSections[0]
          setActiveSection((prev) =>
            prev !== newActiveSection ? newActiveSection : prev
          )

          requestAnimationFrame(() => {
            document.getElementById(newActiveSection)?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          })
        }
      },
      { threshold: 0.5 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [isActivate])

  return activeSection
}

export default useSectionScroll
