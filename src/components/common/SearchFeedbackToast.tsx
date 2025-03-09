import { useEffect, useState } from 'react'
import Close from '@/pages/assets/icons/Close.svg'
import Image from 'next/image'
import { SearchFeedbackToastProps } from '@/types/type'

const SearchFeedbackToast = ({
  openToast,
  onClick,
  onClose,
  imageUrl,
}: SearchFeedbackToastProps) => {
  const [isLikeButtonClicked, setIsLikedButtonClicked] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 10000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 flex items-center gap-6 px-6 py-3 bg-white rounded-lg shadow-md transition-all duration-500 ease-in-out z-[9999] hover:cursor-pointer ${
        openToast ? 'right-6' : 'right-[-400px]'
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
        className="absolute top-4 right-4 p-1 self-end"
      >
        <Close className="w-3 h-3" aria-hidden="true" />
      </button>
      <div className="flex flex-col">
        <p className="my-0.5 text-center text-zinc-500">인식한 이미지:</p>
        <Image
          src={imageUrl}
          alt="인식에 사용된 이미지"
          className="w-60 h-[200px] border-4 border-stone-400 rounded-lg"
          width={240}
          height={200}
        />
      </div>
      {!isLikeButtonClicked ? (
        <div className="flex flex-col justify-center items-center">
          <p className="my-1.5 font-semibold text-center">
            검색 결과에 만족하시나요?
          </p>
          <button
            type="button"
            className="p-0.5"
            onClick={() => setIsLikedButtonClicked(true)}
            aria-label="검색 결과 만족"
          >
            👍
          </button>
        </div>
      ) : (
        <p className="my-1.5 font-semibold text-center">
          설문에 참여해주셔서 감사합니다!😄
        </p>
      )}
    </div>
  )
}

export default SearchFeedbackToast
