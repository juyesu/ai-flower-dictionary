import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem } from '@/types/type'
import Link from 'next/link'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import Close from '@/pages/assets/icons/Close.svg'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'

const PlantSearchBar = ({ color }: { color: string }) => {
  const methods = useForm()
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const { data, isLoading } = plantIndexFetchData()
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
        [...(data?.response?.body?.items?.item || [])]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
      )
      const mappedPlantName = data?.response?.body?.items?.item.map(
        (item: PlantIndexItem, index: number) =>
          (autocompletePlantName[index] = item.krnm)
      )
      setAutocompletePlantName(mappedPlantName)
    }
  }, [data])

  useEffect(() => {
    const filteredItems = autocompletePlantName
      .filter((el) => el.includes(methods.getValues('input')))
      .slice(0, 7)

    setCurrentAutocompletePlantName(filteredItems)
  }, [methods.watch('input'), autocompletePlantName])

  const searchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchInputValue = methods.getValues('input')
    const filteredList = autocompletePlantName.filter((el) =>
      el.includes(searchInputValue)
    )
    if (e.key === 'Enter') {
      if (selectedAutocompleteIndex != -1) {
        methods.setValue(
          'input',
          currentAutocompletePlantName[selectedAutocompleteIndex]
        )
      } else {
        if (
          data?.response?.body?.items?.item?.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          )
        ) {
          router.push(`view/${searchInputValue}`)
        } else {
          // 현재 alert 출력 후 input focus 해제되는 문제 발생. 추후에 modal 또는 toast popup으로 대체
          alert('일치하는 이름의 식물이 존재하지 않습니다.')
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
        className="mt-12 relative flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="flex items-center">
          <label htmlFor="search_plant" className="sr-only">
            Search for Plants
          </label>
          <MagnifyingGlass
            className="mx-6 absolute z-10"
            width="22px"
            height="22px"
            fill="#787878"
            aria-hidden="true"
          />
          <input
            {...methods.register('input')}
            id="search_plant"
            type="search"
            autoComplete="off"
            onFocus={(e) => {
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
            onChange={(e) => methods.setValue('input', e.target.value)}
            onKeyUp={searchKeyUp}
            className="pl-16 py-2 sm:w-[40rem] lg:w-[48rem] h-[3.2rem] rounded-full opacity-80 text-xl font-bold bg-white"
          />
          {methods.getValues('input') && (
            <button
              type="button"
              onClick={() => methods.setValue('input', '')}
              aria-label="검색어 초기화"
              className="absolute right-8 cursor-pointer"
            >
              <Close width="16px" height="16px" fill="#787878" />
            </button>
          )}
        </div>
        {isSearchFocus && methods.watch('input') && (
          <ul className="absolute top-16 flex flex-col w-full bg-white opacity-80 rounded-3xl">
            {currentAutocompletePlantName.map((item, index, array) => {
              return (
                <li
                  tabIndex={0}
                  onClick={() => {
                    methods.setValue('input', item)
                  }}
                  className={`px-10 py-4 hover:bg-zinc-300 ${
                    selectedAutocompleteIndex == index ? 'bg-zinc-300' : ''
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
                  {reactStringReplace(
                    item,
                    methods.getValues('input'),
                    (match) => (
                      <span>{match}</span>
                    )
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </form>
      <div
        className={`mt-2 mb-4 flex gap-6 ${
          color == 'white' ? 'text-white' : 'text-zinc-800'
        }`}
      >
        {randomItems ? (
          <>
            {randomItems.map((item, index) => (
              <Link
                key={index}
                href={`/view/${item.krnm}`}
                className="underline"
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
