import { PaginationProps } from '@/types/type'

const usePaginationControls = ({
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
            className="font-xl rounded-xl border bg-zinc-500 py-2 text-white dark:bg-zinc-400 mobile:px-3 sm:px-4"
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

  return {
    chageFirstPage,
    changePrevPage,
    changeNextPage,
    changeLastPage,
    paginationNumberList,
  }
}

export default usePaginationControls
