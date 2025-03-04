import { create } from 'zustand'
import { ImageStoreState } from '@/types/storeType'

export const useCapturedPlantImageStore = create<ImageStoreState>((set) => ({
  imageUrl: '',
  setImageUrl: (url) => set({ imageUrl: url }),
}))
