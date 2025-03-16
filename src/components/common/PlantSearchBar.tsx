import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem, PlantSearchBarProps } from '@/types/type'
import Link from 'next/link'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import Close from '@/pages/assets/icons/Close.svg'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'

const PlantSearchBar = ({
  methods = useForm(),
  color,
  onSearchFail,
  currentPage,
}: PlantSearchBarProps) => {
  const { register, getValues, watch, setValue } = methods
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const { data, isLoading } = plantIndexFetchData(1, 300)
  const [randomItems, setRandomItems] = useState<PlantIndexItem[]>([])
  const [autocompletePlantName, setAutocompletePlantName] = useState<string[]>(
    []
  )
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] = useState(-1)
  const [currentAutocompletePlantName, setCurrentAutocompletePlantName] =
    useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setRandomItems(
        [...(data?.indexList || [])].sort(() => Math.random() - 0.5).slice(0, 5)
      )
      setAutocompletePlantName(data?.krnmList)
    }
  }, [data])

  useEffect(() => {
    if (autocompletePlantName) {
      const filteredItems = autocompletePlantName
        .filter((el) => el.includes(getValues('input')))
        .slice(0, 7)

      setCurrentAutocompletePlantName(filteredItems)
    }
  }, [watch('input'), autocompletePlantName])

  const searchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchInputValue = getValues('input')
    const filteredList = autocompletePlantName?.filter((el) =>
      el.includes(searchInputValue)
    )
    if (e.key === 'Enter') {
      if (selectedAutocompleteIndex != -1) {
        setValue(
          'input',
          currentAutocompletePlantName[selectedAutocompleteIndex]
        )
      } else {
        if (
          data?.indexList.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          )
        ) {
          router.push({ pathname: `view/${searchInputValue}`, query: '' })
        } else {
          onSearchFail()
        }
      }
      setSelectedAutocompleteIndex(-1)
    }

    if (e.key === 'ArrowUp') {
      setSelectedAutocompleteIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      )
    } else if (e.key === 'ArrowDown') {
      setSelectedAutocompleteIndex((prevIndex) =>
        prevIndex < filteredList.length - 1 ? prevIndex + 1 : prevIndex
      )
    }
  }

  if (isLoading) return

  return (
    <>
      <form
        className="relative mt-12 flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="flex items-center">
          <label htmlFor="search_plant" className="sr-only">
            Search for Plants
          </label>
          <MagnifyingGlass
            className="absolute z-10 mx-6 h-[22px] w-[22px]"
            fill="#787878"
            aria-hidden="true"
          />
          <input
            {...register('input')}
            id="search_plant"
            type="search"
            autoComplete="off"
            onFocus={() => {
              setIsSearchFocus(true)
              setSelectedAutocompleteIndex(-1)
            }}
            onBlur={(e) => {
              setTimeout(() => {
                if (!e.relatedTarget?.closest('ul')) {
                  setIsSearchFocus(false)
                }
              }, 100)
            }}
            onChange={(e) => setValue('input', e.target.value)}
            onKeyUp={searchKeyUp}
            className="h-[3.2rem] rounded-full bg-white py-2 pl-16 text-xl font-bold opacity-80 dark:bg-zinc-900 dark:text-slate-200 sm:w-[40rem] lg:w-[48rem]"
          />
          {getValues('input') && (
            <button
              type="button"
              onClick={() => setValue('input', '')}
              aria-label="검색어 초기화"
              className="absolute right-8 cursor-pointer"
            >
              <Close className="h-4 w-4" fill="#787878" aria-hidden="true" />
            </button>
          )}
        </div>
        {isSearchFocus && watch('input') && (
          <ul className="absolute top-16 flex w-full flex-col rounded-3xl bg-white opacity-100 dark:bg-zinc-800">
            {currentAutocompletePlantName.map((item, index, array) => {
              return (
                <Link
                  key={item}
                  href={{
                    pathname: `/view/${item}`,
                    query: {
                      prevPage: currentPage === 'home' ? '' : `${currentPage}`,
                    },
                  }}
                  passHref
                >
                  <li
                    tabIndex={0}
                    className={`cursor-pointer px-10 py-4 hover:bg-zinc-300 dark:text-slate-300 dark:hover:bg-zinc-700 ${
                      selectedAutocompleteIndex == index
                        ? 'bg-zinc-300 font-semibold'
                        : ''
                    } ${
                      index === 0 && array.length === 1
                        ? 'rounded-3xl'
                        : index === 0
                          ? 'rounded-t-3xl'
                          : index === array.length - 1
                            ? 'rounded-b-3xl'
                            : ''
                    }`}
                  >
                    {reactStringReplace(item, getValues('input'), (match) => (
                      <span>{match}</span>
                    ))}
                  </li>
                </Link>
              )
            })}
          </ul>
        )}
      </form>
      <div
        className={`mb-4 mt-2 flex gap-4 rounded-xl ${
          color == 'white' ? 'text-white' : 'text-zinc-800'
        }`}
      >
        {randomItems ? (
          <>
            {randomItems.map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/view/${item.krnm}`,
                  query: {
                    prevPage:
                      currentPage === 'home' ? 'home' : `${currentPage}`,
                  },
                }}
                className={`rounded-xl px-2 py-1 underline ${
                  color == 'white'
                    ? 'dark:text-zinc-900'
                    : 'dark:bg-zinc-900 dark:text-slate-400 dark:opacity-80'
                }`}
              >
                #{item.krnm}
              </Link>
            ))}
          </>
        ) : (
          <p>현재 오류가 발생하여 정보를 불러올 수 없습니다.</p>
        )}
      </div>
    </>
  )
}

export default PlantSearchBar
