import { ScrollButtonActivateStoreType } from '@/types/storeType'
import { create } from 'zustand'

export const scrollButtonActivateStore = create<ScrollButtonActivateStoreType>(
  (set) => ({
    isActivate: false,
    setIsActivate: (value: boolean) => set({ isActivate: value }),
  })
)
