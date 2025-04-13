import { useEffect, useState } from 'react'
import Close from '@/pages/assets/icons/Close.svg'
import Image from 'next/image'
import { SearchFeedbackToastProps } from '@/types/type'

const SearchFeedbackToast = ({
  openToast,
  onClick,
  onClose,
  capturedImageUrl,
}: SearchFeedbackToastProps) => {
  const [hasFeedbackSubmitted, setHasFeedbackSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 10000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 z-[9999] flex items-center gap-6 rounded-lg bg-white px-6 py-3 shadow-md transition-all duration-500 ease-in-out hover:cursor-pointer ${
        openToast ? 'right-6' : 'right-[-27.5rem]'
      }`}
      onClick={onClick}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="토스트 팝업 닫기"
        className="absolute right-4 top-4 self-end p-1"
      >
        <Close className="h-3 w-3" aria-hidden="true" />
      </button>
      <div className="flex flex-col">
        <p className="my-0.5 text-center text-zinc-500">인식한 이미지:</p>
        <Image
          src={capturedImageUrl}
          alt="인식에 사용된 이미지"
          className="h-[12.5rem] w-60 rounded-lg border-4 border-stone-400"
          width={240}
          height={200}
        />
      </div>
      {!hasFeedbackSubmitted ? (
        <div className="flex flex-col items-center justify-center">
          <p className="my-1.5 text-center font-semibold">
            검색 결과에 만족하시나요?
          </p>
          <button
            type="button"
            className="p-0.5"
            onClick={() => setHasFeedbackSubmitted(true)}
            aria-label="검색 결과 만족"
          >
            👍
          </button>
        </div>
      ) : (
        <p className="my-1.5 text-center font-semibold">
          설문에 참여해주셔서 감사합니다!😄
        </p>
      )}
    </div>
  )
}

export default SearchFeedbackToast
