import { useEffect, useRef } from 'react'
import { ModalProps } from '@/types/type'
import Close from '@/pages/assets/icons/Close.svg'

const Modal = ({ onClose, bgOverlay, secoundButton, message }: ModalProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [])
  return (
    <>
      {bgOverlay && (
        <div
          className="w-full h-full fixed z-0 bg-white dark:bg-zinc-900 bg-opacity-90 dark:bg-opacity-80"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-describedby="modal-description"
        className="w-[420px] fixed top-[32rem] flex justify-center items-center z-99 bg-white dark:bg-zinc-700 shadow-lg opacity-100 rounded-2xl"
      >
        <div className="w-full flex flex-col justify-center items-center px-6 py-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="self-end"
          >
            <Close className="w-4 h-4" aria-hidden="true" />
          </button>
          <p
            id="modal-description"
            className="my-8 text-lg font-semibold dark:text-slate-300"
          >
            {message}
          </p>
          <div className="flex flex-row gap-4">
            <button
              ref={buttonRef}
              onClick={onClose}
              className={`${
                secoundButton
                  ? 'w-28 bg-zinc-200 dark:bg-zinc-500 dark:text-slate-200'
                  : 'w-36 bg-sky-400 dark:brightness-[.9] font-semibold text-white dark:text-slate-200'
              } my-4 py-2 self-center focus-visible:outline-none rounded-lg`}
              aria-label="모달 닫기"
            >
              확인
            </button>
            {secoundButton && (
              <button
                onClick={() => secoundButton.onSecondButtonClick?.()}
                className="my-4 w-28 py-2 self-center bg-sky-400 dark:brightness-[.9] font-semibold text-white dark:text-slate-200 focus-visible:outline-none rounded-lg"
                aria-label="페이지 이동"
              >
                {secoundButton.secoundButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
