import { create } from 'zustand'
import { LoginRequiredModalOpenStoreType } from '@/types/storeType'

export const useLoginRequiredModalOpenStore =
  create<LoginRequiredModalOpenStoreType>((set) => ({
    modalOpen: false,
    setModalOpen: (isOpen) => set({ modalOpen: isOpen }),
  }))
