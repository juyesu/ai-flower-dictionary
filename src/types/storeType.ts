export type ImageStoreState = {
  imageUrl: string
  setImageUrl: (url: string) => void
}

export type LoginRequiredModalOpenStoreType = {
  modalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}
