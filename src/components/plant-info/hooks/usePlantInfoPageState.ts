import { ViewPortWidth } from '@/types/type'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const usePlantInfoPageState = () => {
  const viewPortWidth: ViewPortWidth = {
    isUnder767pxScreen: useMediaQuery({ minWidth: 320, maxWidth: 767 }),
    is768To1023pxScreen: useMediaQuery({ minWidth: 768, maxWidth: 1023 }),
    is1024To1279pxScreen: useMediaQuery({ minWidth: 1024, maxWidth: 1279 }),
    is1280To1535pxScreen: useMediaQuery({ minWidth: 1280, maxWidth: 1535 }),
    isAbove1536pxScreen: useMediaQuery({ minWidth: 1536 }),
  }
  const [isCardUi, setIsCardUi] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [maximumPageSize, setMaximumPageSize] = useState(
    viewPortWidth.isUnder767pxScreen ? 14 : 15
  )
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const [copyTooltipIndex, setCopyTooltipIndex] = useState('')

  return {
    viewPortWidth,
    isCardUi,
    setIsCardUi,
    currentPage,
    setCurrentPage,
    maximumPageSize,
    setMaximumPageSize,
    likedPlants,
    setLikedPlants,
    copyTooltipIndex,
    setCopyTooltipIndex,
  }
}

export default usePlantInfoPageState
