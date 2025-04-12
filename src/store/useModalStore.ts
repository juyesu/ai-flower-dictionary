import { create } from 'zustand'
import { UseModalStoreType } from '@/types/storeType'

export const useModalStore = create<UseModalStoreType>((set) => ({
  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}))
