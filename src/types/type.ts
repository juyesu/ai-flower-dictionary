import * as tmImage from '@teachablemachine/image'
import { Dispatch, SetStateAction, ReactNode } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { KeyboardEvent } from 'react'

export type ChildrenComponentsProps = {
  children: ReactNode
}

export type AuthContextType = {
  userId: string | null
  setUserId: (user: string | null) => void
  logout: () => void
  withdrawAccount: () => void
}

export type PlantDetectionModelLoadOptions = {
  plantDetectionModel: tmImage.CustomMobileNet | null
  setPlantDetectionModel: Dispatch<
    SetStateAction<tmImage.CustomMobileNet | null>
  >
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

export type IndexProps = {
  staticIndexList: PlantIndexItem[]
  staticKrnmList: string[]
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

export type PlantSearchFormValues = {
  input: string
}

export type UsePlantSearchOptions = {
  currentPage: string
  methods: UseFormReturn<PlantSearchFormValues>
  staticIndexList?: PlantIndexItem[]
  staticKrnmList?: string[]
}

export type PlantSearchBarContainerProps = {
  color: string
  currentPage: string
  staticIndexList?: PlantIndexItem[]
  staticKrnmList?: string[]
}

export type PlantSearchBarProps = {
  color: string
  currentPage: string
  searchKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
  isSearchInputFocus: boolean
  setIsSearchInputFocus: Dispatch<SetStateAction<boolean>>
  setSelectedAutocompleteIndex: Dispatch<SetStateAction<number>>
  currentAutoCompletePlantNames: string[]
  selectedAutocompleteIndex: number
  randomPlants: PlantIndexItem[]
  isMinSmScreen: boolean
  isMinMobileScreen: boolean
}

export type ViewPortWidth = {
  isUnder767pxScreen: boolean
  is768To1023pxScreen: boolean
  is1024To1279pxScreen: boolean
  is1280To1535pxScreen: boolean
  isAbove1536pxScreen: boolean
}

export type CardViewProps = {
  apiData: PlantIndexItem[] | undefined
  likedPlants: string[]
  setLikedPlants: Dispatch<SetStateAction<string[]>>
  activeTooltipKey: string
  setActiveTooltipKey: Dispatch<SetStateAction<string>>
}

export type TableViewProps = {
  viewPortWidth: ViewPortWidth
  apiData: PlantIndexItem[] | undefined
  likedPlants: string[]
  setLikedPlants: Dispatch<SetStateAction<string[]>>
  activeTooltipKey: string
  setActiveTooltipKey: Dispatch<SetStateAction<string>>
  currentPage: number
}

export type PlantTableType = {
  number: number
  krnm: string
  famlNm: string
  kornFamlNm: string
  bloomPeriodCn: string
  isLiked: JSX.Element
}

export type PageTitleProps = {
  analysisMode?: 'camera' | 'imageUpload'
  setAnalysisMode?: Dispatch<SetStateAction<'camera' | 'imageUpload'>>
  titleImage: string
  titleOptions?: string
}

export type ModeSwitchButtonProps = {
  analysisMode: 'camera' | 'imageUpload'
  setAnalysisMode: Dispatch<SetStateAction<'camera' | 'imageUpload'>>
}

export type ViewModeSwitchButtonProps = {
  viewPortWidth: ViewPortWidth
  setViewMode: Dispatch<SetStateAction<'card' | 'table'>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setMaximumPageSize: Dispatch<SetStateAction<number>>
}

export type UseSetApiErrorModalOptions = {
  data: PlantIndexResponse | undefined
  isLoading: boolean
  error: Error | null
}

export type UseSyncStateFromLocalStorageOptions = {
  data: PlantIndexResponse | undefined
  setPlantAccordionData: Dispatch<SetStateAction<PlantAccordionDataType>>
  setUserEmail: Dispatch<SetStateAction<string | null>>
}

export type PlantAccordionDataType = {
  likedPlants: { imgUrl: string; krnm: string }[]
  myDictionary: { imgUrl: string; krnm: string }[]
}

export type AccordionSectionsProps = {
  accordionOpen: { likedPlants: boolean; myDictionary: boolean }
  setAccordionOpen: Dispatch<
    SetStateAction<{ likedPlants: boolean; myDictionary: boolean }>
  >
  plantAccordionData: PlantAccordionDataType
  data: PlantIndexResponse | undefined
}

export type SideDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export type ThemeDropdownProps = {
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
  capturedImageUrl: string
}

export type PaginationProps = {
  apiData: PlantIndexResponse | undefined
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  maximumPageSize: number
}

export type PlantDetailTitleProps = {
  plantData: PlantIndexItem | null
  likedPlants: string[]
  setLikedPlants: Dispatch<SetStateAction<string[]>>
  krnm: string | string[] | undefined
  prevPage: string | string[] | undefined
  sort: string | string[] | undefined
}

export type PlantDetailContentProps = {
  plantData: PlantIndexItem | null
}

export type UseHandlePlantLikeOptions = {
  likedPlants: string[]
  setLikedPlants: Dispatch<SetStateAction<string[]>>
}

export type UseManagePlantStorageOptions = {
  setLikedPlants: Dispatch<SetStateAction<string[]>>
  plantName: string | string[] | undefined
  prevPage: string | string[] | undefined
}
