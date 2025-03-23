import { UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

export type ChildrenComponentsProps = {
  children: React.ReactNode
}

export type AIModelProps = {
  AIErrorModalOpen: () => void
}

export type PlantIndexResponse = {
  response: {
    response: {
      body: {
        items: {
          item: PlantIndexItem[]
        }
        totalCount: number
      }
    }
  }
  indexList: PlantIndexItem[]
  krnmList: string[]
}

export type PlantIndexItem = {
  imgUrl: string
  krnm: string
  famlNm: string
  fturCn: string
  kornFamlNm: string
  flwrClorCn: string
  bloomPeriodCn: string
}

export type PlantSearchBarProps = {
  methods?: UseFormReturn
  color: string
  onSearchFail?: any
  currentPage: string
}

export type ViewPortWidth = {
  isUnder767pxScreen: boolean
  is768To1023pxScreen: boolean
  is1024To1279pxScreen: boolean
  is1280To1535pxScreen: boolean
  isAbove1536pxScreen: boolean
}

export type CardViewProps = {
  apiData: any
  likedPlants: string[]
  copyTooltipIndex: string
  handlePlantLike: (plantId: string) => void
  handlePlantLinkShare: (plantId: string) => void
}

export type TableViewProps = {
  viewPortWidth: ViewPortWidth
  apiData: any
  likedPlants: string[]
  copyTooltipIndex: string
  currentPage: number
  handlePlantLike: (plantId: string) => void
  handlePlantLinkShare: (plantId: string) => void
}

export type PlantTableType = {
  number: number
  krnm: string
  famlNm: string
  kornFamlNm: string
  bloomPeriodCn: string
  isLiked: string[]
}

export type SideDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export type ThemeToggleButtonProps = {
  size: 'small' | 'large'
  hiddenUntil?: 'mobile' | 'sm' | 'md' | 'lg'
  hideAtMobile: boolean
}

export type OneButtonModalProps = {
  onClose: () => void
}

export type TwoButtonModalProps = {
  onClose: () => void
  bgOverlay: boolean
  onSecondButtonClick: () => void
}

export type ModalProps = {
  onClose: () => void
  bgOverlay: boolean
  secoundButton?: {
    secoundButtonLabel?: string
    onSecondButtonClick?: () => void
  }
  message: string
}

export type LoginFormType = {
  name: string
  email: string
  password: string
  address: string
}

export type PlantIndexParams = {
  serviceKey: string
  pageNo: number
  numOfRows: number
  type: string
}

export type PreviewContentSectionProps = {
  sectionTagId: string
  id: string
  title: string
  description: string
  linkHref: string
  linkText: string
  imgSrc: string
  isLeftAligned: boolean
}

export type SearchFeedbackToastProps = {
  openToast: boolean
  onClick: () => void
  onClose: () => void
  imageUrl: string
}

export type PaginationProps = {
  apiData: PlantIndexResponse | undefined
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  maximumPageSize: number
}
