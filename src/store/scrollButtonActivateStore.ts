import { scrollButtonActivateStoreType } from '@/types/storeType'
import { create } from 'zustand'

export const scrollButtonActivateStore = create<scrollButtonActivateStoreType>(
  (set) => ({
    isActivate: false,
    setIsActivate: (value: boolean) => set({ isActivate: value }),
  })
)
