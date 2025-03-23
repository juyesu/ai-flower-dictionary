import FirstPage from '@/pages/assets/icons/FirstPage.svg'
import PrevPage from '@/pages/assets/icons/PrevPage.svg'
import NextPage from '@/pages/assets/icons/NextPage.svg'
import LastPage from '@/pages/assets/icons/LastPage.svg'
import { PaginationProps } from '@/types/type'

const Pagination = ({
  apiData,
  currentPage,
  setCurrentPage,
  maximumPageSize,
}: PaginationProps) => {
  const dataDividePageSize = apiData
    ? Math.ceil(apiData?.response?.response.body.totalCount / maximumPageSize)
    : 0

  const chageFirstPage = () => {
    if (currentPage != 1) {
      setCurrentPage(1)
    }
  }

  const changePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changeNextPage = () => {
    if (
      apiData &&
      apiData?.response?.response.body.totalCount >
        currentPage * maximumPageSize
    ) {
      setCurrentPage(currentPage + 1)
    }
  }

  const changeLastPage = () => {
    if (currentPage != dataDividePageSize) {
      setCurrentPage(dataDividePageSize)
    }
  }

  const paginationNumberList = () => {
    if (dataDividePageSize == 0) {
      return (
        <li>
          <button
            className="font-xl rounded-xl border bg-zinc-500 mobile:px-3 sm:px-4 py-2 text-white dark:bg-zinc-400"
            type="button"
            aria-label="페이지 번호"
          >
            1
          </button>
        </li>
      )
    } else if (dataDividePageSize >= 1) {
      const pageNumberButton = []
      for (let i = 1; i <= dataDividePageSize; i++) {
        pageNumberButton.push(
          <li key={i}>
            <button
              className={`font-xl rounded-xl border py-2 dark:border-zinc-400 mobile:px-3 sm:px-4 ${
                i == currentPage
                  ? 'bg-zinc-500 text-white dark:bg-zinc-400 dark:text-slate-800'
                  : 'bg-white text-black dark:bg-zinc-700 dark:text-slate-300'
              } `}
              type="button"
              aria-label="페이지 번호"
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </button>
          </li>
        )
      }
      return pageNumberButton
    }
  }
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
