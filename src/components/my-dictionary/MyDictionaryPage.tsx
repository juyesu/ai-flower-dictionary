import { useAuth } from '@/context/AuthContext'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import BoxOpen from '@/pages/assets/icons/BoxOpen.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLoginRequiredModalOpenStore } from '@/store/modalOpenStore'
import LoginRequiredModal from '@/components/modal/LoginRequiredModal'

const MyDictionaryPage = () => {
  const [hasPlantsData, setHasPlantsData] = useState({
    likedPlants: false,
    myDictionary: false,
  })
  const [accordionOpen, setAccordionOpen] = useState({
    likedPlants: true,
    myDictionary: true,
  })
  const [plantData, setPlantData] = useState<{
    likedPlants: { imgUrl: string; krnm: string }[]
    myDictionary: { imgUrl: string; krnm: string }[]
  }>({
    likedPlants: [],
    myDictionary: [],
  })
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const { modalOpen, setModalOpen } = useLoginRequiredModalOpenStore()
  const { loginUser } = useAuth()
  const router = useRouter()
  const { data } = plantIndexFetchData(1, 300)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const emailFromLocalStorage = localStorage.getItem('userEmail')
      if (emailFromLocalStorage) {
        setUserEmail(emailFromLocalStorage)
        setHasPlantsData({
          likedPlants: !!localStorage.getItem(`${loginUser}.likedPlants`),
          myDictionary: !!localStorage.getItem(`${loginUser}.findPlants`),
        })
      } else {
        setModalOpen(true)
      }
    }
  }, [])

  useEffect(() => {
    if (userEmail) {
      setModalOpen(false)
    }
  }, [userEmail])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const getLikedPlants = JSON.parse(
      localStorage.getItem(`${loginUser}.likedPlants`) || '[]'
    )
    const getFindPlants = JSON.parse(
      localStorage.getItem(`${loginUser}.findPlants`) || '[]'
    )

    if (data?.indexList && Array.isArray(getLikedPlants)) {
      const filteredLikedImages = data.indexList
        .filter((item: PlantIndexItem) => getLikedPlants.includes(item.krnm))
        .map((item) => ({ imgUrl: item.imgUrl, krnm: item.krnm }))

      setPlantData((prev) => ({
        ...prev,
        likedPlants: filteredLikedImages,
      }))
    }

    if (data?.indexList && Array.isArray(getFindPlants)) {
      const filteredFindImages = data.indexList
        .filter((item: PlantIndexItem) => getFindPlants.includes(item.krnm))
        .map((item) => ({ imgUrl: item.imgUrl, krnm: item.krnm }))
      setPlantData((prev) => ({
        ...prev,
        myDictionary: filteredFindImages,
      }))
    }
  }, [data])

  return (
    <div className="flex flex-col items-center w-full min-h-screen sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
      <div className="relative w-full h-[500px]">
        <Image
          src="/images/my_dictionary_title_image_2.jpg"
          alt="타이틀 커버 이미지"
          className="object-cover"
          fill
        />
        <div className="absolute inset-0 title-gradient-overlay dark:title-gradient-overlay" />
        <div className="absolute inset-0 w-full flex flex-col justify-center items-center gap-5">
          <div className="mb-12 flex flex-col items-center">
            <h1 className="page-main-title dark:text-slate-300">
              My Dictionary
            </h1>
            <p className="ml-1 mt-1.5 font-semibold text-zinc-800 dark:text-slate-300 text-lg text-center">
              내가 발견한 식물들로 <br />
              세상에 단 하나뿐인 나만의 도감을 완성해보세요
            </p>
          </div>
        </div>
      </div>
      <section className="w-full mt-8 px-8">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, likedPlants: !prev.likedPlants }
            })
          }
          className={`flex justify-between w-full px-6 py-4 border border-l-fuchsia-200 border-l-4 dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 font-semibold transition ${
            accordionOpen.likedPlants ? '' : ''
          }`}
        >
          <span className="text-xl">
            내가 좋아요 누른 식물
            <span className="ml-2 text-zinc-400">
              {`(${plantData.myDictionary.length})`}
            </span>
          </span>
          <span className="text-2xl font-bold">
            {accordionOpen.likedPlants ? '-' : '+'}
          </span>
        </button>

        {accordionOpen.likedPlants &&
          (hasPlantsData.likedPlants ? (
            <div className="grid grid-cols-8 gap-x-6 gap-y-10 px-4 py-6 bg-stone-100 dark:bg-zinc-700 transition-opacity duration-300 opacity-100">
              {plantData.likedPlants.map((item, index) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="text-center">
                    <Image
                      key={index}
                      src={item.imgUrl}
                      alt={`${item.imgUrl}식물`}
                      className="w-full h-32 border-4 border-stone-400 dark:border-stone-500 object-cover rounded"
                      width={157}
                      height={128}
                    />
                    <figcaption className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                      {item.krnm}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4 p-20 bg-stone-100">
              <BoxOpen
                className="w-10 h-10"
                fill="#a1a1aa"
                aria-hidden="true"
              />
              <p className="font-bold text-zinc-400">
                아직 좋아요를 누른 식물이 존재하지 않습니다.
              </p>
            </div>
          ))}
      </section>
      <section className="w-full mt-8 my-20 px-8">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, myDictionary: !prev.myDictionary }
            })
          }
          className={`flex justify-between w-full px-6 py-4 border border-l-fuchsia-200 border-l-4 dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 font-semibold transition ${
            accordionOpen.myDictionary ? '' : ''
          }`}
        >
          <span className="text-xl">
            나의 식물도감
            <span className="ml-2 text-zinc-400">
              {`(${plantData.myDictionary.length}/${data?.response.response.body.totalCount})`}
            </span>
          </span>
          <span className="text-2xl font-bold">
            {accordionOpen.myDictionary ? '-' : '+'}
          </span>
        </button>

        {accordionOpen.myDictionary &&
          (hasPlantsData.myDictionary ? (
            <div className="grid grid-cols-8 gap-x-6 gap-y-10 px-4 py-6 bg-stone-100 dark:bg-zinc-700 transition-opacity duration-300 opacity-100">
              {plantData.myDictionary.map((item, index) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="text-center">
                    <Image
                      key={index}
                      src={item.imgUrl}
                      alt={`${item.imgUrl}의 이미지`}
                      className="w-full h-32 border-4 border-stone-400 dark:border-stone-500 object-cover rounded"
                      width={157}
                      height={128}
                    />
                    <figcaption className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                      {item.krnm}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4 p-20 bg-stone-100">
              <BoxOpen
                className="w-10 h-10"
                fill="#a1a1aa"
                aria-hidden="true"
              />
              <p className="font-bold text-zinc-400">
                아직 발견한 식물이 존재하지 않습니다.
              </p>
            </div>
          ))}
      </section>
      {modalOpen && (
        <LoginRequiredModal
          onClose={() => {
            setModalOpen(false)
            router.back()
          }}
          bgOverlay={true}
          onSecondButtonClick={() => router.push('/login')}
        />
      )}
    </div>
  )
}

export default MyDictionaryPage
