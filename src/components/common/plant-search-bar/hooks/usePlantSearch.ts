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
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false)
  const [randomPlants, setRandomPlants] = useState<PlantIndexItem[]>([])
  const [autoCompletePlantNames, setAutoCompletePlantNames] = useState<
    string[]
  >([])
  const [currentAutoCompletePlantNames, setCurrentAutoCompletePlantNames] =
    useState<string[]>([])
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] = useState(-1)
  const isMinMobileScreen = useMediaQuery({ minWidth: 320 })
  const isMinSmScreen = useMediaQuery({ minWidth: 640 })
  const { modal, openModal } = useModalStore()
  const skipAutoFocusRef = useRef(true)
  const router = useRouter()
  const { data } =
    !staticIndexList || !staticKrnmList
      ? usePlantIndexFetchData(1, 300)
      : { data: null }

  useEffect(() => {
    if (staticIndexList && staticKrnmList) {
      setRandomPlants(
        [...(staticIndexList || [])].sort(() => Math.random() - 0.5).slice(0, 5)
      )
      setAutoCompletePlantNames(staticKrnmList)
    } else if (data) {
      setRandomPlants(
        [...(data?.indexList || [])].sort(() => Math.random() - 0.5).slice(0, 5)
      )
      setAutoCompletePlantNames(data?.krnmList)
    }
  }, [data, staticIndexList, staticKrnmList])

  useEffect(() => {
    if (autoCompletePlantNames) {
      const filteredItems = autoCompletePlantNames
        .filter((el) => el.includes(getValues('input')))
        .slice(0, 7)

      setCurrentAutoCompletePlantNames(filteredItems)
    }
  }, [watch('input'), autoCompletePlantNames])

  useEffect(() => {
    if (skipAutoFocusRef.current) {
      skipAutoFocusRef.current = false
      return
    }
    if (skipAutoFocusRef.current == false && !modal) {
      setTimeout(() => {
        setFocus('input')
      }, 150)
    }
  }, [modal])

  const searchInputFocus = () => {
    setIsSearchInputFocus(true)
    setSelectedAutocompleteIndex(-1)
  }

  const searchInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!e.relatedTarget?.closest('ul')) {
        setIsSearchInputFocus(false)
      }
    }, 100)
  }

  const searchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchInputValue = getValues('input')
    const filteredList = autoCompletePlantNames?.filter((el) =>
      el.includes(searchInputValue)
    )
    if (e.key === 'Enter') {
      if (selectedAutocompleteIndex != -1) {
        setValue(
          'input',
          currentAutoCompletePlantNames[selectedAutocompleteIndex]
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
          openModal({ type: 'SEARCH_NOT_FOUND' })
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
    searchInputFocus,
    searchInputBlur,
    searchKeyUp,
    isSearchInputFocus,
    currentAutoCompletePlantNames,
    selectedAutocompleteIndex,
    randomPlants,
    isMinSmScreen,
    isMinMobileScreen,
  }
}

export default usePlantSearch
