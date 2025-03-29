const handlePlantLinkShare = async (
  krnm: string,
  setCopyTooltipIndex: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    await navigator.clipboard.writeText(`${baseUrl}/view/${krnm}`)
    setCopyTooltipIndex(krnm)

    setTimeout(() => {
      setCopyTooltipIndex('')
    }, 1000)
  } catch (err) {
    console.error('링크 복사 실패', err)
  }
}

export default handlePlantLinkShare