import { useEffect } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { useSetApiErrorModalOptions } from '@/types/type'

const useSetApiErrorModal = ({
  data,
  isLoading,
  error,
}: useSetApiErrorModalOptions) => {
  const { openModal } = useModalStore()

  useEffect(() => {
    if (!isLoading && (!data || error)) {
      openModal({ type: 'API_DATA_ERROR' })
    }
  }, [data, isLoading, error, openModal])
}

export default useSetApiErrorModal
