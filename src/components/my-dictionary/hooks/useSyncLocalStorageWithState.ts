import { useEffect } from 'react'
import { PlantIndexItem, UseSyncStateFromLocalStorageOptions } from '@/types/type'
import { useModalStore } from '@/store/useModalStore'
import { useAuth } from '@/context/AuthContext'

const useSyncStateFromLocalStorage = ({
  data,
  setPlantAccordionData,
  setUserEmail,
}: UseSyncStateFromLocalStorageOptions) => {
  const { openModal } = useModalStore()
  const { userId } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const emailFromLocalStorage = localStorage.getItem('userEmail')
      if (emailFromLocalStorage) {
        setUserEmail(emailFromLocalStorage)
      } else {
        openModal({ type: 'LOGIN_REQUIRED', goBackOnClose: true })
      }
    }
  }, [userId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const getLikedPlants = JSON.parse(localStorage.getItem(`${userId}.likedPlants`) || '[]')
    const getFindPlants = JSON.parse(localStorage.getItem(`${userId}.findPlants`) || '[]')

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
