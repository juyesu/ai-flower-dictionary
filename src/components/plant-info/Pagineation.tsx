import FirstPage from '@/pages/assets/icons/FirstPage.svg'
import PrevPage from '@/pages/assets/icons/PrevPage.svg'
import NextPage from '@/pages/assets/icons/NextPage.svg'
import LastPage from '@/pages/assets/icons/LastPage.svg'
import { PaginationProps } from '@/types/type'
import usePaginationControls from '@/components/plant-info/hooks/usePaginationControls'

const Pagination = ({
  apiData,
  currentPage,
  setCurrentPage,
  maximumPageSize,
}: PaginationProps) => {
  const {
    chageFirstPage,
    changePrevPage,
    changeNextPage,
    changeLastPage,
    paginationNumberList,
  } = usePaginationControls({
    apiData,
    currentPage,
    setCurrentPage,
    maximumPageSize,
  })

  return (
    <nav id="pagination" className="my-20 flex justify-between">
      <ul className="flex items-center mobile:gap-1.5 sm:gap-2">
        <li>
          <button
            type="button"
            aria-label="첫 페이지로 이동"
            onClick={chageFirstPage}
          >
            <FirstPage
              className="text-black dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              aria-hidden="true"
            />
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label="이전 페이지로 이동"
            onClick={changePrevPage}
          >
            <PrevPage
              className="text-black dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              aria-hidden="true"
            />
          </button>
        </li>
        {paginationNumberList()}
        <li>
          <button
            type="button"
            aria-label="다음 페이지로 이동"
            onClick={changeNextPage}
          >
            <NextPage
              className="text-black dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              aria-hidden="true"
            />
          </button>
        </li>
        <li>
          <button
            type="button"
            aria-label="마지막 페이지로 이동"
            onClick={changeLastPage}
          >
            <LastPage
              className="text-black dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
