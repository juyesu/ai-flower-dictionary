import { create } from 'zustand'
import { SideDrawerStoreType } from '@/types/storeType'

export const sideDrawerStore = create<SideDrawerStoreType>((set) => ({
  isDrawerOpen: false,
  setIsDrawerOpen: (value: boolean) => set({ isDrawerOpen: value }),
}))