
export type ImageStoreType = {
  imageUrl: string
  setImageUrl: (value: string) => void
}

type ModalType =
  | { type: 'ALERT'; message: string }
  | { type: 'PLANT_DETECTION_MODEL_ERROR' }
  | { type: 'LOGIN_REQUIRED'; goBackOnClose: boolean }
  | { type: 'LOGOUT_MESSAGE' }
  | { type: 'SEARCH_NOT_FOUND' }
  | { type: 'API_DATA_ERROR' }
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'ACCOUNT_DELETION_SUCCESS' }
  | null

export type UseModalStoreType = {
  modal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export type ScrollButtonActivateStoreType = {
  isActivate: boolean
  setIsActivate: (value: boolean) => void
}
