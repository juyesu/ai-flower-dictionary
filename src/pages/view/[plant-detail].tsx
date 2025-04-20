import { useRouter } from 'next/router'
import Layout from '@/components/common/layout/Layout'
import { PlantIndexItem } from '@/types/type'
import { useEffect, useState } from 'react'
import { useCapturedPlantImageStore } from '@/store/imageURLStore'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import SearchFeedbackToast from '@/components/plant-detail/SearchFeedbackToast'
import PlantDetailTitle from '@/components/plant-detail/PlantDetailTitle'
import PlantDetailContent from '@/components/plant-detail/PlantDetailContent'
import Head from 'next/head'
import useManagePlantStorage from '@/components/plant-detail/hooks/useManagePlantStorage'

const PlantDetail = () => {
  const [plantData, setPlantData] = useState<PlantIndexItem | null>(null)
  const [likedPlants, setLikedPlants] = useState<string[]>([])
  const [openSearchFeedbackToast, setOpenSearchFeedbackToast] = useState(false)
  const { capturedImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()
  const { prevPage, sort } = router.query
  const { plantName } = router.query
  const { data, isLoading } = usePlantIndexFetchData(1, 300)
  useManagePlantStorage({ setLikedPlants, plantName, prevPage })

  useEffect(() => {
    if (!data || isLoading || !plantName) return
    const decodedKrnm = decodeURIComponent(plantName as string)

    const foundPlant = data?.indexList.find((p: PlantIndexItem) => p.krnm === decodedKrnm)

    setPlantData(foundPlant || null)
  }, [data, isLoading, plantName])

  useEffect(() => {
    if (capturedImageUrl) {
      setOpenSearchFeedbackToast(true)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{plantName} 상세 페이지</title>
        <meta
          name='description'
          content={`${plantName}에 대한 색상, 개화시기, 특징 등 다양한 정보를 확인해보세요.`}
        />
        <meta property='og:title' content={`${plantName} 상세 페이지`} />
        <meta
          property='og:description'
          content={`${plantName}에 대한 색상, 개화시기, 특징 등 다양한 정보를 확인해보세요.`}
        />
        <meta name='twitter:title' content={`${plantName} 상세 페이지`} />
        <meta
          name='twitter:description'
          content={`${plantName}에 대한 색상, 개화시기, 특징 등 다양한 정보를 확인해보세요.`}
        />
      </Head>
      <Layout>
        <div className='flex min-h-screen w-full flex-col items-center bg-[#FEF5CC] dark:bg-inherit sm:px-2 md:px-4 xl:px-8 2xl:px-16 fhd:px-[32rem]'>
          {plantData && (
            <>
              <PlantDetailTitle
                plantData={plantData}
                likedPlants={likedPlants}
                setLikedPlants={setLikedPlants}
                krnm={plantName}
                prevPage={prevPage}
                sort={sort}
              />
              <hr className='my-6 mb-10 w-full dark:border-gray-400' />
              <PlantDetailContent plantData={plantData} />
            </>
          )}
          {capturedImageUrl && (
            <SearchFeedbackToast
              openToast={openSearchFeedbackToast}
              onClick={() => setOpenSearchFeedbackToast(true)}
              onClose={() => setOpenSearchFeedbackToast(false)}
              capturedImageUrl={capturedImageUrl}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export default PlantDetail
