import { useEffect } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { useSetApiErrorModalOptions } from '@/types/type'

const useSetApiErrorModal = ({
  data,
  isLoading,
  error,
}: useSetApiErrorModalOptions) => {
  const { setModalOpen } = useModalStore()

  useEffect(() => {
    if (!isLoading && (!data || error)) {
      setModalOpen('ApiErrorModal')
    }
  }, [data, isLoading, error, setModalOpen])
}

export default useSetApiErrorModal
