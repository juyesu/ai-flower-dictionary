export type ImageStoreType = {
  capturedImageUrl: string
  setCapturedImageUrl: (value: string) => void
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

export type scrollStateStoreType = {
  isScrolling: boolean
  setIsScrolling: (value: boolean) => void
}
