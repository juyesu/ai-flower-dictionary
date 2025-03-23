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
    <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
      <div className="relative w-full mobile:h-[380px] sm:h-[500px]">
        <Image
          src="/images/my_dictionary_title_image_2.jpg"
          alt="타이틀 커버 이미지"
          className="object-cover"
          fill
        />
        <div className="title-gradient-overlay dark:title-gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-5">
          <div className="mb-12 flex flex-col items-center">
            <h1 className="page-main-title dark:text-slate-300">
              My Dictionary
            </h1>
            <p className="ml-1 mt-1.5 text-center text-lg font-semibold text-zinc-800 dark:text-slate-300">
              내가 발견한 식물들로 <br />
              세상에 단 하나뿐인 나만의 도감을 완성해보세요
            </p>
          </div>
        </div>
      </div>
      <section className="mt-8 w-full mobile:px-1 sm:px-4">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, likedPlants: !prev.likedPlants }
            })
          }
          className={`flex w-full justify-between border border-l-4 border-l-fuchsia-200 px-6 py-4 font-semibold transition dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 ${
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
            <div className="accordion-grid-layout">
              {plantData.likedPlants.map((item) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="rounded-lg text-center hover:bg-zinc-300 mobile:p-1.5 sm:p-2">
                    <Image
                      src={item.imgUrl}
                      alt={`${item.krnm}식물`}
                      className="h-32 w-full rounded border-4 border-stone-400 object-cover dark:border-stone-500"
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
            <div className="flex items-center justify-center gap-4 bg-stone-100 p-20">
              <BoxOpen
                className="h-10 w-10"
                fill="#a1a1aa"
                aria-hidden="true"
              />
              <p className="font-bold text-zinc-400">
                아직 좋아요를 누른 식물이 존재하지 않습니다.
              </p>
            </div>
          ))}
      </section>
      <section className="my-20 mt-8 w-full mobile:px-1 sm:px-4">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, myDictionary: !prev.myDictionary }
            })
          }
          className={`flex w-full justify-between border border-l-4 border-l-fuchsia-200 px-6 py-4 font-semibold transition dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 ${
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
            <div className="accordion-grid-layout">
              {plantData.myDictionary.map((item) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="rounded-lg text-center hover:bg-zinc-300 mobile:p-1.5 sm:p-2">
                    <Image
                      src={item.imgUrl}
                      alt={`${item.imgUrl}의 이미지`}
                      className="h-32 w-full rounded border-4 border-stone-400 object-cover dark:border-stone-500"
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
            <div className="flex items-center justify-center gap-4 bg-stone-100 p-20">
              <BoxOpen
                className="h-10 w-10"
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
