import { useEffect, useRef } from 'react'

type SearchNotFoundModalProps = {
  onClose: any
}

const SearchNotFoundModal = ({ onClose }: SearchNotFoundModalProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [])
  return (
    <div className="fixed top-[32rem] flex z-99 bg-white shadow-lg opacity-100 rounded-2xl">
      <div className="flex flex-col px-10 py-8">
        <p className="my-8 text-lg font-semibold">
          검색어와 일치하는 식물명이 존재하지 않습니다.
        </p>
        <button
          ref={buttonRef}
          onClick={() => onClose()}
          className="mt-4 px-16 py-2 self-center bg-orange-300 focus-visible:outline-none rounded-full"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default SearchNotFoundModal
