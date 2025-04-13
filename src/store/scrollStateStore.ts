import { scrollStateStoreType } from '@/types/storeType'
import { create } from 'zustand'

export const scrollStateStore = create<scrollStateStoreType>((set) => ({
  isScrolling: false,
  setIsScrolling: (value: boolean) => set({ isScrolling: value }),
}))
