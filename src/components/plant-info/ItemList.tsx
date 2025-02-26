import styles from '@styles/ItemList.module.css'
import PlantSearchBar from '../common/PlantSearchBar'
import FirstPage from '@/pages/assets/icons/FirstPage.svg'
import PrevPage from '@/pages/assets/icons/PrevPage.svg'
import NextPage from '@/pages/assets/icons/NextPage.svg'
import LastPage from '@/pages/assets/icons/LastPage.svg'
import TableList from '@/pages/assets/icons/TableList.svg'
import CardList from '@/pages/assets/icons/CardList.svg'
import Image from 'next/image'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { useEffect, useRef, useState } from 'react'
import SearchNotFoundModal from '../modal/SearchNotFoundModal'
import CardView from './CardView'
import TableView from './TabelView'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import ApiDataErrorModal from '../modal/ApiDataErrorModal'

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
  const [copyTooltipIndex, setCopyTooltipIndex] = useState('')
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const router = useRouter()
  const { sort } = router.query
  const hasMounted = useRef(false)

  const dataDividePageSize = Math.ceil(
    data?.response?.body.totalCount / maximumPageSize
  )

  useEffect(() => {
    if (!isLoading && (!data || error)) {
      setOpenApiErrorModal(true)
    }
  }, [data, isLoading, error, router])

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
    }, 100)
  }

  const apiDataErrorModalClose = () => {
    setOpenApiErrorModal(false)
    router.push('/')
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
      alert('로그인이 필요합니다.')
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
    if (data.response.body.totalCount > currentPage * maximumPageSize) {
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
            className="px-4 py-2 font-xl border rounded-xl bg-zinc-500 text-white"
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
              className={`px-4 py-2 font-xl border rounded-xl ${
                i == currentPage
                  ? 'bg-zinc-500 text-white'
                  : 'bg-white text-black'
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
    <div className="flex flex-col items-center w-full sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
      <div className="relative w-full h-[652px]">
        <Image
          src="/images/plant_info_title_image_2.jpg"
          alt="타이틀 커버 이미지"
          className="object-cover"
          fill
        />
        <div
          className="absolute inset-0 bg-white"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.9) 70%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
        <div className="absolute inset-0 w-full flex flex-col items-center gap-5">
          <div className="mt-28 flex flex-col items-center">
            <h1 className={styles.main}>Plant Info</h1>
            <p className="ml-1 mt-1.5 font-semibold text-zinc-800 text-lg text-center">
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
      <div className="flex justify-end px-16 w-full">
        <div className="flex border rounded-lg">
          <button
            type="button"
            aria-label="카드 리스트 레이아웃으로 변경"
            onClick={() => {
              setIsCardUi(true)
              setCurrentPage(1)
              setMaximumPageSize(15)
            }}
            className="px-5 py-4 border rounded-l-lg hover:bg-zinc-400"
          >
            <CardList className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label=" 리스트 레이아웃으로 변경"
            onClick={() => {
              setIsCardUi(false)
              setCurrentPage(1)
              setMaximumPageSize(30)
            }}
            className="px-5 py-4 border rounded-r-lg hover:bg-zinc-400"
          >
            <TableList className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {isCardUi ? (
        <CardView
          apiData={data}
          likedPlants={likedPlants}
          copyTooltipIndex={copyTooltipIndex}
          handlePlantLike={handlePlantLike}
          handlePlantLinkShare={handlePlantLinkShare}
        />
      ) : (
        <TableView
          apiData={data}
          likedPlants={likedPlants}
          copyTooltipIndex={copyTooltipIndex}
          currentPage={currentPage}
          handlePlantLike={handlePlantLike}
          handlePlantLinkShare={handlePlantLinkShare}
        />
      )}
      <div id="pagination" className="my-20">
        <nav className="flex justify-between">
          <ul className="flex items-center gap-2">
            <li>
              <button
                type="button"
                aria-label="첫 페이지로 이동"
                onClick={chageFirstPage}
              >
                <FirstPage className="w-6 h-6" aria-hidden="true" />
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-label="이전 페이지로 이동"
                onClick={changePrevPage}
              >
                <PrevPage className="w-6 h-6" aria-hidden="true" />
              </button>
            </li>
            {paginationNumberList()}
            <li>
              <button
                type="button"
                aria-label="다음 페이지로 이동"
                onClick={changeNextPage}
              >
                <NextPage className="w-6 h-6" aria-hidden="true" />
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-label="마지막 페이지로 이동"
                onClick={changeLastPage}
              >
                <LastPage className="w-6 h-6" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {openSearchNotFoundModal && (
        <SearchNotFoundModal onClose={searchNotFoundModalClose} />
      )}
      {openApiErrorModal && (
        <ApiDataErrorModal onClose={apiDataErrorModalClose} />
      )}
    </div>
  )
}

export default ItemList
