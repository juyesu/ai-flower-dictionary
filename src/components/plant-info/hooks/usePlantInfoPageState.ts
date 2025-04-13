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
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [currentPage, setCurrentPage] = useState(1)
  const [maximumPageSize, setMaximumPageSize] = useState(
    viewPortWidth.isUnder767pxScreen ? 14 : 15
  )
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const [activeTooltipKey, setActiveTooltipKey] = useState('')

  return {
    viewPortWidth,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    maximumPageSize,
    setMaximumPageSize,
    likedPlants,
    setLikedPlants,
    activeTooltipKey,
    setActiveTooltipKey,
  }
}

export default usePlantInfoPageState
