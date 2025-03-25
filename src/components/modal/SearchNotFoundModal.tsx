import Modal from '@/components/modal/Modal'
import { useModalStore } from '@/store/useModalStore'

const SearchNotFoundModal = () => {
  const { closeModal } = useModalStore()
  return (
    <Modal
      onClose={closeModal}
      bgOverlay={false}
      message="검색어와 일치하는 식물명이 존재하지 않습니다."
    />
  )
}

export default SearchNotFoundModal
