import { PlantAccordionDataType } from '@/types/type'
import { useState } from 'react'

const useMyDictionaryPageState = () => {
  const [accordionOpen, setAccordionOpen] = useState({
    likedPlants: true,
    myDictionary: true,
  })
  const [plantAccordionData, setPlantAccordionData] =
    useState<PlantAccordionDataType>({
      likedPlants: [],
      myDictionary: [],
    })
  const [userEmail, setUserEmail] = useState<string | null>(null)

  return {
    accordionOpen,
    setAccordionOpen,
    plantAccordionData,
    setPlantAccordionData,
    userEmail,
    setUserEmail,
  }
}

export default useMyDictionaryPageState
