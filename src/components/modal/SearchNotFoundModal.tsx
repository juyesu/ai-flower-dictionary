import Modal from '@/components/modal/Modal'
import { OneButtonModalProps } from '@/types/type'

const SearchNotFoundModal = ({ onClose }: OneButtonModalProps) => {
  return (
    <Modal
      onClose={onClose}
      bgOverlay={false}
      message="검색어와 일치하는 식물명이 존재하지 않습니다."
    />
  )
}

export default SearchNotFoundModal
