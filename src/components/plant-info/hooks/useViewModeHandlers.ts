import { UseModalHandlersOptions } from '@/types/type'

const useViewModeHandlers = ({
  setViewMode,
  setCurrentPage,
  setMaximumPageSize,
  viewPortWidth,
}: UseModalHandlersOptions) => {
  const handleChangeToCardList = () => {
    setViewMode('card')
    setCurrentPage(1)
    setMaximumPageSize(viewPortWidth.isUnder767pxScreen ? 14 : 15)
  }

  const handleChangeToTableList = () => {
    setViewMode('table')
    setCurrentPage(1)
    setMaximumPageSize(30)
  }

  return { handleChangeToCardList, handleChangeToTableList }
}

export default useViewModeHandlers
