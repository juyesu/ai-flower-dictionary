import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import { useRouter } from 'next/router'
import { UseManagePlantStorageOptions } from '@/types/type'

const useManagePlantStorage = ({
  setLikedPlants,
  plantName,
  prevPage,
}: UseManagePlantStorageOptions) => {
  const { userId } = useAuth()
  const { setCapturedImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      setLikedPlants(
        JSON.parse(localStorage.getItem(`${userId}.likedPlants`) || '[]')
      )
    }
  }, [userId])

  useEffect(() => {
    if (
      prevPage === 'ai-flower-detection' &&
      sessionStorage.getItem('cameFromAiFlowerDetection') === 'true'
    ) {
      const storedPlants = JSON.parse(
        localStorage.getItem(`${userId}.findPlants`) || '[]'
      )

      if (userId && !storedPlants.includes(plantName)) {
        localStorage.setItem(
          `${userId}.findPlants`,
          JSON.stringify([...storedPlants, plantName])
        )
      }
      sessionStorage.removeItem('cameFromAiFlowerDetection')
    }
  }, [prevPage, userId, plantName])

  useEffect(() => {
    const handleRouteChange = () => {
      setCapturedImageUrl('')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, setCapturedImageUrl])
}

export default useManagePlantStorage
