import PlantSearchBar from '@/components/common/PlantSearchBar'
import TableList from '@/pages/assets/icons/TableList.svg'
import CardList from '@/pages/assets/icons/CardList.svg'
import Image from 'next/image'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { useEffect, useRef, useState } from 'react'
import SearchNotFoundModal from '@/components/modal/SearchNotFoundModal'
import CardView from '@/components/plant-info/CardView'
import TableView from '@/components/plant-info/TabelView'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import ApiDataErrorModal from '@/components/modal/ApiDataErrorModal'
import LoginRequiredModal from '@/components/modal/LoginRequiredModal'
import Pagination from '@/components/plant-info/Pagineation'

const ItemList = () => {
  const methods = useForm()
  const { loginUser } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [maximumPageSize, setMaximumPageSize] = useState(15)
  const { data, isLoading, error } = plantIndexFetchData(
    currentPage,
    maximumPageSize
  )
  const [isCardUi, setIsCardUi] = useState(true)
  const [openSearchNotFoundModal, setOpenSearchNotFoundModal] = useState(false)
  const [openApiErrorModal, setOpenApiErrorModal] = useState(false)
  const [openLoginRequiredModal, setOpenLoginRequiredModal] = useState(false)
  const [copyTooltipIndex, setCopyTooltipIndex] = useState('')
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const router = useRouter()
  const { sort } = router.query
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!isLoading && (!data || error)) {
      setOpenApiErrorModal(true)
    }
  }, [data, isLoading, error])

  useEffect(() => {
    if (loginUser) {
      setLikedPlants(
        JSON.parse(localStorage.getItem(`${loginUser}.likedPlants`) || '[]')
      )
    }
  }, [loginUser])

  useEffect(() => {
    if (hasMounted.current) {
      window.scrollTo(0, 400)
    } else {
      hasMounted.current = true
    }
  }, [currentPage])

  useEffect(() => {
    if (sort == 'table') {
      setIsCardUi(false)
    }
  }, [])

  const searchNotFoundModalOpen = () => {
    document.body.style.position = 'fixed'
    setOpenSearchNotFoundModal(true)
  }

  const searchNotFoundModalClose = () => {
    document.body.style.position = ''
    setOpenSearchNotFoundModal(false)
    setTimeout(() => {
      methods.setFocus('input')
    }, 150)
  }

  const apiDataErrorModalClose = () => {
    setOpenApiErrorModal(false)
    router.push('/')
  }

  const loginRequiredModalClose = () => {
    setOpenLoginRequiredModal(false)
  }

  const redirectToLoginPage = () => {
    router.push('/login')
  }

  const handlePlantLike = (krnm: string) => {
    if (loginUser) {
      if (likedPlants.includes(krnm)) {
        setLikedPlants((prev) => {
          const updatedLikedPlants = prev.filter((id: string) => id !== krnm)
          localStorage.setItem(
            `${loginUser}.likedPlants`,
            JSON.stringify(updatedLikedPlants)
          )
          return updatedLikedPlants
        })
      } else {
        setLikedPlants((prev) => {
          const updatedLikedPlants = [...prev, krnm]
          localStorage.setItem(
            `${loginUser}.likedPlants`,
            JSON.stringify(updatedLikedPlants)
          )
          return updatedLikedPlants
        })
      }
    } else {
      setOpenLoginRequiredModal(true)
    }
  }

  const handlePlantLinkShare = async (krnm: string): Promise<void> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      await navigator.clipboard.writeText(`${baseUrl}/view/${krnm}`)
      setCopyTooltipIndex(krnm)

      setTimeout(() => {
        setCopyTooltipIndex('')
      }, 1000)
    } catch (err) {
      console.error('링크 복사 실패', err)
    }
  }

  return (
    <div className="flex w-full flex-col items-center sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
      <div className="relative h-[652px] w-full">
        <Image
          src="/images/plant_info_title_image_3.jpg"
          alt=""
          className="object-cover dark:saturate-[.8]"
          fill
        />
        <div className="title-gradient-overlay dark:title-gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 flex w-full flex-col items-center gap-5">
          <div className="mt-28 flex flex-col items-center">
            <h1 className="page-main-title dark:text-slate-300">Plant Info</h1>
            <p className="ml-1 mt-1.5 text-center text-lg font-semibold text-zinc-800 dark:text-slate-300">
              다양한 식물 정보를 탐색하고 사용자들과 <br />
              식물에 대한 경험을 공유해보세요
            </p>
          </div>
          <PlantSearchBar
            methods={methods}
            color="dark"
            onSearchFail={searchNotFoundModalOpen}
            currentPage="plant-info"
          />
        </div>
      </div>
      <div className="flex w-full justify-end px-16">
        <div className="flex rounded-lg border dark:border-gray-500">
          <button
            type="button"
            aria-label="카드 리스트 레이아웃으로 변경"
            onClick={() => {
              setIsCardUi(true)
              setCurrentPage(1)
              setMaximumPageSize(15)
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
            aria-label=" 리스트 레이아웃으로 변경"
            onClick={() => {
              setIsCardUi(false)
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
      {isCardUi ? (
        <CardView
          apiData={data?.indexList}
          likedPlants={likedPlants}
          copyTooltipIndex={copyTooltipIndex}
          handlePlantLike={handlePlantLike}
          handlePlantLinkShare={handlePlantLinkShare}
        />
      ) : (
        <TableView
          apiData={data?.indexList}
          likedPlants={likedPlants}
          copyTooltipIndex={copyTooltipIndex}
          currentPage={currentPage}
          handlePlantLike={handlePlantLike}
          handlePlantLinkShare={handlePlantLinkShare}
        />
      )}
      <Pagination
        apiData={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maximumPageSize={maximumPageSize}
      />
      {openSearchNotFoundModal && (
        <SearchNotFoundModal onClose={searchNotFoundModalClose} />
      )}
      {openApiErrorModal && (
        <ApiDataErrorModal onClose={apiDataErrorModalClose} />
      )}
      {openLoginRequiredModal && (
        <LoginRequiredModal
          onClose={loginRequiredModalClose}
          bgOverlay={false}
          onSecondButtonClick={redirectToLoginPage}
        />
      )}
    </div>
  )
}

export default ItemList
