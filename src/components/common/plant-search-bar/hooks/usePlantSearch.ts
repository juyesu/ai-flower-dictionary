import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useModalStore } from '@/store/useModalStore'
import { PlantIndexItem, UsePlantSearchOptions } from '@/types/type'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useMediaQuery } from 'react-responsive'

const usePlantSearch = ({
  currentPage,
  methods,
  staticIndexList,
  staticKrnmList,
}: UsePlantSearchOptions) => {
  const { getValues, watch, setValue, setFocus } = methods
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const { data } =
    !staticIndexList || !staticKrnmList
      ? usePlantIndexFetchData(1, 300)
      : { data: null }
  const isSmView = useMediaQuery({ minWidth: 640 })
  const isMobileView = useMediaQuery({ minWidth: 320 })
  const [randomItems, setRandomItems] = useState<PlantIndexItem[]>([])
  const [autocompletePlantName, setAutocompletePlantName] = useState<string[]>(
    []
  )
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] = useState(-1)
  const [currentAutocompletePlantName, setCurrentAutocompletePlantName] =
    useState<string[]>([])
  const { isModalOpen, setModalOpen } = useModalStore()
  const skipAutoFocus = useRef(true)
  const router = useRouter()

  useEffect(() => {
    if (staticIndexList && staticKrnmList) {
      setRandomItems(
        [...(staticIndexList || [])].sort(() => Math.random() - 0.5).slice(0, 5)
      )
      setAutocompletePlantName(staticKrnmList)
    } else if (data) {
      setRandomItems(
        [...(data?.indexList || [])].sort(() => Math.random() - 0.5).slice(0, 5)
      )
      setAutocompletePlantName(data?.krnmList)
    }
  }, [data, staticIndexList, staticKrnmList])

  useEffect(() => {
    if (autocompletePlantName) {
      const filteredItems = autocompletePlantName
        .filter((el) => el.includes(getValues('input')))
        .slice(0, 7)

      setCurrentAutocompletePlantName(filteredItems)
    }
  }, [watch('input'), autocompletePlantName])

  useEffect(() => {
    if (skipAutoFocus.current) {
      skipAutoFocus.current = false
      return
    }
    if (skipAutoFocus.current == false && isModalOpen == false) {
      setTimeout(() => {
        setFocus('input')
      }, 150)
    }
  }, [isModalOpen])

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
          staticIndexList?.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          ) ||
          data?.indexList.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          )
        ) {
          router.push({
            pathname: 'view/plant-detail',
            query: {
              plantName: searchInputValue,
              prevPage: currentPage === 'home' ? '' : currentPage,
            },
          })
        } else {
          setModalOpen('SearchNotFoundModal')
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

  return {
    searchKeyUp,
    isSearchFocus,
    setIsSearchFocus,
    setSelectedAutocompleteIndex,
    currentAutocompletePlantName,
    selectedAutocompleteIndex,
    randomItems,
    isSmView,
    isMobileView,
  }
}

export default usePlantSearch
