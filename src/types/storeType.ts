export type ImageStoreType = {
  imageUrl: string
  setImageUrl: (value: string) => void
}

export type UseModalStoreType = {
  isModalOpen: boolean
  currentModal: string | null
  setModalOpen: (modalName: string) => void
  closeModal: () => void
}

export type scrollButtonActivateStoreType = {
  isActivate: boolean
  setIsActivate: (value: boolean) => void
}
