import Link from 'next/link'
import styles from './../../styles/ItemList.module.css'
import PlantSearchBar from './PlantSearchBar'
import Like from '@/pages/assets/icons/Like.svg'
import Share from '@/pages/assets/icons/Share.svg'
import Image from 'next/image'
import { PlantIndexItem } from '@/types/type'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { useEffect, useState } from 'react'
import SearchNotFoundModal from './SearchNotFoundModal'
import { useForm } from 'react-hook-form'

const ItemList = () => {
  const methods = useForm()
  const { data, isLoading, error } = plantIndexFetchData()
  const [isCardUi, setIsCardUi] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [CopyTooltipIndex, ShowCopyTooltipIndex] = useState('')

  useEffect(() => {
    if (!data || isLoading || error) {
      console.log('API 데이터 에러가 발생했습니다.', data)
    }
  })

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
      <div className="mt-36 px-8 grid grid-cols-3 gap-y-24 w-full">
        {data &&
          data?.response.body.items.item.map((item: PlantIndexItem) => (
            <Link key={item.famlNm} href={{ pathname: `/view/${item.krnm}` }}>
              <div className="mb-4 flex flex-col items-center w-full">
                <div className="flex flex-col shadow-xl rounded-xl">
                  <Image
                    className="h-[22rem] w-[23rem] object-cover rounded-t-xl"
                    src={item.imgUrl}
                    alt={item.krnm}
                    width={500}
                    height={300}
                  />
                  <div className="mx-6 mt-5 mb-4 flex flex-col gap-3">
                    <span className="self-start px-3 py-1 bg-cyan-500 rounded-full font-semibold text-sm text-white">
                      {item.famlNm}
                    </span>
                    <p className="mx-1.5 mt-1 font-semibold text-xl">
                      {item.krnm}
                    </p>
                    <div className="relative mt-4 flex flex-row justify-end gap-4">
                      <button
                        type="button"
                        aria-label="이 식물이 좋아요"
                        className="p-1"
                      >
                        <Like className="w-6 h-6" />
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
      {openModal && <SearchNotFoundModal onClose={modalClose} />}
    </div>
  )
}

export default ItemList
