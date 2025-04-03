import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import { useRouter } from 'next/router'
import { UseManagePlantStorageOptions } from '@/types/type'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { PlantIndexItem } from '@/types/type'

const useManagePlantStorage = ({
  setLikedPlants,
  krnm,
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

      if (!storedPlants.includes(krnm)) {
        localStorage.setItem(
          `${loginUser}.findPlants`,
          JSON.stringify([...storedPlants, krnm])
        )
      }
      sessionStorage.removeItem('cameFromAiFlowerDetection')
    }
  }, [prevPage, loginUser, krnm])

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
