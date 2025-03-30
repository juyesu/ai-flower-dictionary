import * as tmImage from '@teachablemachine/image'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler } from 'react-hook-form'

export type ChildrenComponentsProps = {
  children: React.ReactNode
}

export type AIModelProps = {
  AIErrorModalOpen: () => void
}

export type PlantDetectionModelLoadOptions = {
  model: tmImage.CustomMobileNet | null
  setModel: Dispatch<React.SetStateAction<tmImage.CustomMobileNet | null>>
  setMaxPredictions: Dispatch<SetStateAction<number>>
  data: PlantIndexResponse | undefined
  isLoading: boolean
  error: Error | null
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
  color: string
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
  setCopyTooltipIndex: Dispatch<React.SetStateAction<string>>
  handlePlantLike: (plantId: string) => void
}

export type TableViewProps = {
  viewPortWidth: ViewPortWidth
  apiData: any
  likedPlants: string[]
  copyTooltipIndex: string
  setCopyTooltipIndex: Dispatch<React.SetStateAction<string>>
  currentPage: number
  handlePlantLike: (plantId: string) => void
}

export type PlantTableType = {
  number: number
  krnm: string
  famlNm: string
  kornFamlNm: string
  bloomPeriodCn: string
  isLiked: string[]
}

export type PageTitleProps = {
  isCameraMode?: boolean
  setIsCameraMode?: Dispatch<React.SetStateAction<boolean>>
  titleImage: string
  titleOptions?: string
}

export type ModeSwitchButtonProps = {
  isCameraMode?: boolean
  setIsCameraMode?: Dispatch<React.SetStateAction<boolean>>
}

export type ViewModeSwitchButtonProps = {
  viewPortWidth: ViewPortWidth
  setIsCardUi: Dispatch<React.SetStateAction<boolean>>
  setCurrentPage: Dispatch<React.SetStateAction<number>>
  setMaximumPageSize: Dispatch<React.SetStateAction<number>>
}

export type useSetApiErrorModalOptions = {
  data: PlantIndexResponse | undefined
  isLoading: boolean
  error: Error | null
}

export type UseSyncStateFromLocalStorageOptions = {
  data: PlantIndexResponse | undefined
  setHasPlantsData: Dispatch<
    React.SetStateAction<{
      likedPlants: boolean
      myDictionary: boolean
    }>
  >
  setPlantAccordionData: Dispatch<React.SetStateAction<PlantAccordionDataType>>
  setUserEmail: Dispatch<React.SetStateAction<string | null>>
}

export type PlantAccordionDataType = {
  likedPlants: { imgUrl: string; krnm: string }[]
  myDictionary: { imgUrl: string; krnm: string }[]
}

export type AccordionSectionsProps = {
  hasPlantsData: { likedPlants: boolean; myDictionary: boolean }
  accordionOpen: { likedPlants: boolean; myDictionary: boolean }
  setAccordionOpen: Dispatch<
    React.SetStateAction<{ likedPlants: boolean; myDictionary: boolean }>
  >
  plantAccordionData: PlantAccordionDataType
  data: PlantIndexResponse | undefined
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

export type ModalProps = {
  onClose: () => void
  bgOverlay: boolean
  secoundButton?: {
    secoundButtonLabel?: string
    onSecondButtonClick?: () => void
  }
  message: string
}

export type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormType>
}

export type AddressPopupProps = {
  setOpenPostcode: Dispatch<SetStateAction<boolean>>
}

export type RegisterFormProps = {
  onSubmit: SubmitHandler<LoginFormType>
  setOpenPostcode: Dispatch<SetStateAction<boolean>>
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
