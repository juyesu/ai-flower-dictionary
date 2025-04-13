import { create } from 'zustand'
import { ImageStoreType } from '@/types/storeType'

export const useCapturedPlantImageStore = create<ImageStoreType>((set) => ({
  capturedImageUrl: '',
  setCapturedImageUrl: (value) => set({ capturedImageUrl: value }),
}))
