import { useEffect, useRef } from 'react'
import { ModalProps } from '@/types/type'
import { Close } from '@/pages/assets/icons'

const Modal = ({ onClose, bgOverlay, secoundButton, message }: ModalProps) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus()
    }
  }, [])
  return (
    <>
      {bgOverlay && (
        <div
          className='fixed z-[60] h-full w-full bg-white bg-opacity-90 dark:bg-zinc-900 dark:bg-opacity-80'
          onClick={onClose}
          aria-hidden='true'
        />
      )}
      <div
        role='dialog'
        aria-modal='true'
        aria-describedby='modal-description'
        className='fixed top-[32rem] z-[70] flex w-[26.25rem] items-center justify-center rounded-2xl bg-white opacity-100 shadow-lg dark:bg-zinc-700'
      >
        <div className='flex w-full flex-col items-center justify-center px-6 py-6'>
          <button type='button' onClick={onClose} aria-label='모달 닫기' className='self-end'>
            <Close className='h-4 w-4' aria-hidden='true' />
          </button>
          <p
            id='modal-description'
            className='my-8 whitespace-pre-line text-center text-lg font-semibold dark:text-slate-300'
          >
            {message}
          </p>
          <div className='flex flex-row gap-4'>
            <button
              type='button'
              ref={confirmButtonRef}
              onClick={onClose}
              className={`${
                secoundButton
                  ? 'w-28 bg-zinc-200 dark:bg-zinc-500 dark:text-slate-200'
                  : 'w-36 bg-sky-400 font-semibold text-white dark:text-slate-200 dark:brightness-[.9]'
              } my-4 self-center rounded-lg py-2 focus-visible:outline-none`}
              aria-label='모달 닫기'
            >
              확인
            </button>
            {secoundButton && (
              <button
                type='button'
                onClick={() => secoundButton.onSecondButtonClick?.()}
                className='my-4 w-28 self-center rounded-lg bg-sky-400 py-2 font-semibold text-white focus-visible:outline-none dark:text-slate-200 dark:brightness-[.9]'
                aria-label='페이지 이동'
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
