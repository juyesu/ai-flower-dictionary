import { create } from 'zustand'
import { UseModalStoreType } from '@/types/storeType'

export const useModalStore = create<UseModalStoreType>((set) => ({
  isModalOpen: false,
  currentModal: null,
  setModalOpen: (modalName) =>
    set({ isModalOpen: true, currentModal: modalName }),
  closeModal: () => set({ isModalOpen: false, currentModal: null }),
}))
