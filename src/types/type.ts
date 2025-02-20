export type ChildrenComponentsProps = {
  children: React.ReactNode
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
