import { Dispatch, SetStateAction } from 'react'

const handlePlantLinkShare = async (
  krnm: string,
  setActiveTooltipKey: Dispatch<SetStateAction<string>>
): Promise<void> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    await navigator.clipboard.writeText(`${baseUrl}/view/${krnm}`)
    setActiveTooltipKey(krnm)

    setTimeout(() => {
      setActiveTooltipKey('')
    }, 1000)
  } catch (err) {
    console.error('링크 복사 실패', err)
  }
}

export default handlePlantLinkShare
