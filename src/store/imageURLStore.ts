import { create } from 'zustand'
import { ImageStoreType } from '@/types/storeType'

export const useCapturedPlantImageStore = create<ImageStoreType>((set) => ({
  imageUrl: '',
  setImageUrl: (value) => set({ imageUrl: value }),
}))
