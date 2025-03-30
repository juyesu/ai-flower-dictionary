import { useEffect } from 'react'
import {
  PlantIndexItem,
  UseSyncStateFromLocalStorageOptions,
} from '@/types/type'
import { useModalStore } from '@/store/useModalStore'
import { useAuth } from '@/context/AuthContext'

const useSyncStateFromLocalStorage = ({
  data,
  setHasPlantsData,
  setPlantAccordionData,
  setUserEmail,
}: UseSyncStateFromLocalStorageOptions) => {
  const { setModalOpen } = useModalStore()
  const { loginUser } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const emailFromLocalStorage = localStorage.getItem('userEmail')
      if (emailFromLocalStorage) {
        setUserEmail(emailFromLocalStorage)
        setHasPlantsData({
          likedPlants: !!localStorage.getItem(`${loginUser}.likedPlants`),
          myDictionary: !!localStorage.getItem(`${loginUser}.findPlants`),
        })
      } else {
        setModalOpen('LoginRequiredModal')
      }
    }
  }, [loginUser])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const getLikedPlants = JSON.parse(
      localStorage.getItem(`${loginUser}.likedPlants`) || '[]'
    )
    const getFindPlants = JSON.parse(
      localStorage.getItem(`${loginUser}.findPlants`) || '[]'
    )

    if (data?.indexList && Array.isArray(getLikedPlants)) {
      const filteredLikedImages = data.indexList
        .filter((item: PlantIndexItem) => getLikedPlants.includes(item.krnm))
        .map((item) => ({ imgUrl: item.imgUrl, krnm: item.krnm }))

      setPlantAccordionData((prev) => ({
        ...prev,
        likedPlants: filteredLikedImages,
      }))
    }

    if (data?.indexList && Array.isArray(getFindPlants)) {
      const filteredFindImages = data.indexList
        .filter((item: PlantIndexItem) => getFindPlants.includes(item.krnm))
        .map((item) => ({ imgUrl: item.imgUrl, krnm: item.krnm }))

      setPlantAccordionData((prev) => ({
        ...prev,
        myDictionary: filteredFindImages,
      }))
    }
  }, [data])
}

export default useSyncStateFromLocalStorage
