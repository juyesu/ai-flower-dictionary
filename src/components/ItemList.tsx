import Link from 'next/link'
import styles from './../../styles/ItemList.module.css'
import PlantSearchBar from './PlantSearchBar'
import Unliked from '@/pages/assets/icons/Unliked.svg'
import Liked from '@/pages/assets/icons/Liked.svg'
import Share from '@/pages/assets/icons/Share.svg'
import FirstPage from '@/pages/assets/icons/FirstPage.svg'
import PrevPage from '@/pages/assets/icons/PrevPage.svg'
import NextPage from '@/pages/assets/icons/NextPage.svg'
import LastPage from '@/pages/assets/icons/LastPage.svg'
import Image from 'next/image'
import { PlantIndexItem } from '@/types/type'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { useEffect, useRef, useState } from 'react'
import SearchNotFoundModal from './SearchNotFoundModal'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'

const ItemList = () => {
  const MAXIMUM_PAGE_SIZE = 15
  const methods = useForm()
  const { loginUser } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = plantIndexFetchData(
    currentPage,
    MAXIMUM_PAGE_SIZE
  )
  const [isCardUi, setIsCardUi] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [CopyTooltipIndex, ShowCopyTooltipIndex] = useState('')
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const hasMounted = useRef(false)
  const dataDividePageSize = Math.ceil(
    data?.response.body.totalCount / MAXIMUM_PAGE_SIZE
  )

  useEffect(() => {
    if (!data || isLoading || error) {
      console.log('API 데이터 에러가 발생했습니다.', data)
    }
  })

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

  const modalOpen = () => {
    document.body.style.position = 'fixed'
    setOpenModal(true)
  }

  const modalClose = () => {
    document.body.style.position = ''
    setOpenModal(false)
    setTimeout(() => {
      methods.setFocus('input')
    }, 100)
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

  const handlePlantLinkShare = async (krnm: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      await navigator.clipboard.writeText(`${baseUrl}/view/${krnm}`)
      ShowCopyTooltipIndex(krnm)

      setTimeout(() => {
        ShowCopyTooltipIndex('')
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
    if (data.response.body.totalCount > currentPage * MAXIMUM_PAGE_SIZE) {
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
            onSearchFail={modalOpen}
          />
          <div className="mt-16 mb-36 flex flex-row w-[28rem] border rounded-full">
            <button
              type="button"
              className={`p-3 w-1/2 h-full rounded-l-full ${
                isCardUi
                  ? 'bg-zinc-600 text-white font-semibold'
                  : 'bg-white text-zinc-800'
              }`}
              onClick={() => setIsCardUi(true)}
              aria-label="card형태로 정렬"
            >
              Card UI
            </button>
            <button
              type="button"
              className={`p-3 w-1/2 h-full rounded-r-full ${
                isCardUi
                  ? 'bg-white text-zinc-800'
                  : 'bg-zinc-600 text-white font-semibold'
              }`}
              onClick={() => setIsCardUi(false)}
              aria-label="list형태로 정렬"
            >
              List UI
            </button>
          </div>
        </div>
      </div>
      <div className="mt-36 px-4 grid grid-cols-3 gap-y-24 w-full">
        {data &&
          data?.response.body.items.item.map((item: PlantIndexItem) => (
            <Link key={item.famlNm} href={{ pathname: `/view/${item.krnm}` }}>
              <div className="mb-4 flex flex-col items-center w-full">
                <div className="flex flex-col shadow-custom-all rounded-xl bg-white">
                  <Image
                    className="h-[22rem] w-[25rem] object-cover rounded-t-xl"
                    src={item.imgUrl}
                    alt={item.krnm}
                    width={500}
                    height={300}
                  />
                  <div className="mx-6 mt-7 mb-4 flex flex-col gap-3">
                    <span className="self-start px-3 py-0.5 bg-cyan-500 bg-[#797D48] rounded-full font-semibold text-sm text-white">
                      {item.famlNm}
                    </span>
                    <p className="mx-1.5 mt-1 font-semibold text-[22px]">
                      {item.krnm}
                    </p>
                    <div className="relative mt-4 flex flex-row justify-end gap-4">
                      <button
                        type="button"
                        aria-label="이 식물이 좋아요"
                        onClick={(e) => {
                          e.preventDefault()
                          handlePlantLike(item.krnm)
                        }}
                        className="p-1"
                      >
                        {likedPlants.includes(item.krnm) ? (
                          <Liked className="w-6 h-6" fill="#FF5C8D" />
                        ) : (
                          <Unliked className="w-6 h-6" />
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label="이 식물 페이지를 공유"
                        onClick={async (e) => {
                          e.preventDefault()
                          await handlePlantLinkShare(item.krnm)
                        }}
                        className="relative p-1"
                      >
                        <Share className="w-6 h-6" />
                        {CopyTooltipIndex === item.krnm && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm rounded py-1 px-3 transition-opacity duration-300 whitespace-nowrap">
                            링크가 복사되었습니다!
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <div id="pagination" className="my-20">
        <nav className="flex justify-between">
          <ul className="flex items-center gap-2">
            <li>
              <button
                type="button"
                aria-label="첫 페이지로 이동"
                onClick={chageFirstPage}
              >
                <FirstPage className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-label="이전 페이지로 이동"
                onClick={changePrevPage}
              >
                <PrevPage className="w-6 h-6" />
              </button>
            </li>
            {paginationNumberList()}
            <li>
              <button
                type="button"
                aria-label="다음 페이지로 이동"
                onClick={changeNextPage}
              >
                <NextPage className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-label="마지막 페이지로 이동"
                onClick={changeLastPage}
              >
                <LastPage className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {openModal && <SearchNotFoundModal onClose={modalClose} />}
    </div>
  )
}

export default ItemList
