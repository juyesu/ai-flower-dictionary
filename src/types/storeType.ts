export type ImageStoreType = {
  capturedImageUrl: string
  setCapturedImageUrl: (value: string) => void
}

export type SideDrawerStoreType = {
  isDrawerOpen: boolean
  setIsDrawerOpen: (value: boolean) => void
}

type ModalType =
  | { type: 'ALERT'; message: string }
  | { type: 'PLANT_DETECTION_MODEL_ERROR' }
  | { type: 'LOGIN_REQUIRED'; goBackOnClose: boolean }
  | { type: 'SESSION_EXPIRED' }
  | { type: 'LOGOUT_MESSAGE' }
  | { type: 'SEARCH_NOT_FOUND' }
  | { type: 'API_DATA_ERROR' }
  | { type: 'SERVER_ERROR' }
  | { type: 'NETWORK_ERROR' }
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'ACCOUNT_DELETION_FAILED' }
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
