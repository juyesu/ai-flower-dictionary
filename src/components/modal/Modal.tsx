import { useEffect, useRef } from 'react'
import { ModalProps } from '@/types/type'

const Modal = ({ onClose, bgOverlay, message }: ModalProps) => {
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
          className="w-full h-full fixed z-0 bg-white bg-opacity-90"
          onClick={onClose}
        />
      )}
      <div className="fixed top-[32rem] flex z-99 bg-white shadow-lg opacity-100 rounded-2xl">
        <div className="flex flex-col px-10 py-8">
          <p className="my-8 text-lg font-semibold">{message}</p>
          <button
            ref={buttonRef}
            onClick={onClose}
            className="mt-4 px-16 py-2 self-center bg-orange-300 focus-visible:outline-none rounded-full"
          >
            확인
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
