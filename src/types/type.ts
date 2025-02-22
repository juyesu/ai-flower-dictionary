export type ChildrenComponentsProps = {
  children: React.ReactNode
}

export type WebcamModelProps = {
  webcamModelErrorModalOpen: () => void
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

export type CardViewProps = {
  apiData: any
  likedPlants: string[]
  copyTooltipIndex: string
  handlePlantLike: (plantId: string) => void
  handlePlantLinkShare: (plantId: string) => void
}

export type TableViewProps = {
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

export type ModalCloseProps = {
  onClose: () => void
}

export type ModalProps = {
  onClose: () => void
  bgOverlay: boolean
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
