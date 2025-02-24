import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem } from '@/types/type'
import Link from 'next/link'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import Close from '@/pages/assets/icons/Close.svg'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'

type SearchNotFoundModalProps = {
  methods?: UseFormReturn
  color: string
  onSearchFail?: any
}

const PlantSearchBar = ({
  methods = useForm(),
  color,
  onSearchFail,
}: SearchNotFoundModalProps) => {
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
    if (autocompletePlantName) {
      const filteredItems = autocompletePlantName
        .filter((el) => el.includes(getValues('input')))
        .slice(0, 7)

      setCurrentAutocompletePlantName(filteredItems)
    }
  }, [watch('input'), autocompletePlantName])

  const searchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchInputValue = getValues('input')
    const filteredList = autocompletePlantName.filter((el) =>
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
          data?.response?.body?.items?.item?.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          )
        ) {
          router.push(`view/${searchInputValue}`)
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
            className="mx-6 w-[22px] h-[22px] absolute z-10"
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
            className="pl-16 py-2 sm:w-[40rem] lg:w-[48rem] h-[3.2rem] rounded-full opacity-80 text-xl font-bold bg-white"
          />
          {getValues('input') && (
            <button
              type="button"
              onClick={() => setValue('input', '')}
              aria-label="검색어 초기화"
              className="absolute right-8 cursor-pointer"
            >
              <Close className="w-4 h-4" fill="#787878" />
            </button>
          )}
        </div>
        {isSearchFocus && watch('input') && (
          <ul className="absolute top-16 flex flex-col w-full bg-white opacity-100 rounded-3xl">
            {currentAutocompletePlantName.map((item, index, array) => {
              return (
                <Link key={item} href={`/view/${item}`} passHref>
                  <li
                    tabIndex={0}
                    className={`px-10 py-4 hover:bg-zinc-300 cursor-pointer ${
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
