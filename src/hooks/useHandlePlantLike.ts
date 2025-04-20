import { useAuth } from '@/context/AuthContext'
import { useModalStore } from '@/store/useModalStore'
import { UseHandlePlantLikeOptions } from '@/types/type'

const useHandlePlantLike = ({ likedPlants, setLikedPlants }: UseHandlePlantLikeOptions) => {
  const { userId } = useAuth()
  const { openModal } = useModalStore()

  const handlePlantLike = (krnm: string) => {
    if (userId) {
      if (likedPlants.includes(krnm)) {
        setLikedPlants((prev) => {
          const updatedLikedPlants = prev.filter((id: string) => id !== krnm)
          localStorage.setItem(`${userId}.likedPlants`, JSON.stringify(updatedLikedPlants))
          return updatedLikedPlants
        })
      } else {
        setLikedPlants((prev) => {
          const updatedLikedPlants = [...prev, krnm]
          localStorage.setItem(`${userId}.likedPlants`, JSON.stringify(updatedLikedPlants))
          return updatedLikedPlants
        })
      }
    } else {
      openModal({ type: 'LOGIN_REQUIRED', goBackOnClose: false })
    }
  }

  return { handlePlantLike }
}

export default useHandlePlantLike
