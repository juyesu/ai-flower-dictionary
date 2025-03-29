import { useAuth } from '@/context/AuthContext'
import { useModalStore } from '@/store/useModalStore'
import { useState } from 'react'

const handlePlantLike = (krnm: string) => {
  const { loginUser } = useAuth()
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const { setModalOpen } = useModalStore()

  if (loginUser) {
    if (likedPlants.includes(krnm)) {
      setLikedPlants((prev) => {
        const updatedLikedPlants = prev.filter((id: string) => id !== krnm)
        localStorage.setItem(
          `${loginUser}.likedPlants`,
          JSON.stringify(updatedLikedPlants)
        )
        return updatedLikedPlants
      })
    } else {
      setLikedPlants((prev) => {
        const updatedLikedPlants = [...prev, krnm]
        localStorage.setItem(
          `${loginUser}.likedPlants`,
          JSON.stringify(updatedLikedPlants)
        )
        return updatedLikedPlants
      })
    }
  } else {
    setModalOpen('LoginRequiredModal')
  }
}

export default handlePlantLike
