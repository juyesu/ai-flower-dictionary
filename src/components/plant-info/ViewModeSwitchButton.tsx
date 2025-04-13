import TableList from '@/pages/assets/icons/TableList.svg'
import CardList from '@/pages/assets/icons/CardList.svg'
import { ViewModeSwitchButtonProps } from '@/types/type'

const ViewModeSwitchButton = ({
  viewPortWidth,
  setViewMode,
  setCurrentPage,
  setMaximumPageSize,
}: ViewModeSwitchButtonProps) => {
  return (
    <div className="flex w-full justify-end mobile:px-5 sm:px-12 lg:px-16">
      <div className="flex rounded-lg border dark:border-gray-500">
        <button
          type="button"
          aria-label="카드 리스트 레이아웃으로 변경"
          onClick={() => {
            setViewMode('card')
            setCurrentPage(1)
            if (viewPortWidth.isUnder767pxScreen) {
              setMaximumPageSize(14)
            } else {
              setMaximumPageSize(15)
            }
          }}
          className="rounded-l-lg border px-5 py-4 hover:bg-zinc-400 dark:border-gray-500 dark:hover:bg-zinc-600"
        >
          <CardList
            className="h-6 w-6 text-zinc-900 dark:text-gray-500"
            fill="currentColor"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          aria-label="테이블 리스트 레이아웃으로 변경"
          onClick={() => {
            setViewMode('table')
            setCurrentPage(1)
            setMaximumPageSize(30)
          }}
          className="rounded-r-lg border px-5 py-4 hover:bg-zinc-400 dark:border-gray-500 dark:hover:bg-zinc-600"
        >
          <TableList
            className="h-6 w-6 text-zinc-900 dark:text-gray-500"
            fill="currentColor"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  )
}

export default ViewModeSwitchButton
