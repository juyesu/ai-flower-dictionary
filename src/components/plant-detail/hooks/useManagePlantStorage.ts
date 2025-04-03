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
  const { loginUser } = useAuth()
  const { setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()

  useEffect(() => {
    if (loginUser) {
      setLikedPlants(
        JSON.parse(localStorage.getItem(`${loginUser}.likedPlants`) || '[]')
      )
    }
  }, [loginUser])

  useEffect(() => {
    if (
      prevPage === 'ai-flower-detection' &&
      sessionStorage.getItem('cameFromAiFlowerDetection') === 'true'
    ) {
      const storedPlants = JSON.parse(
        localStorage.getItem(`${loginUser}.findPlants`) || '[]'
      )

      if (!storedPlants.includes(plantName)) {
        localStorage.setItem(
          `${loginUser}.findPlants`,
          JSON.stringify([...storedPlants, plantName])
        )
      }
      sessionStorage.removeItem('cameFromAiFlowerDetection')
    }
  }, [prevPage, loginUser, plantName])

  useEffect(() => {
    const handleRouteChange = () => {
      setImageUrl('')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, setImageUrl])
}

export default useManagePlantStorage
