import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import useMyDictionary from '@/components/my-dictionary/hooks/useMyDictionaryPageState'
import useSyncStateFromLocalStorage from '@/components/my-dictionary/hooks/useSyncLocalStorageWithState'
import PageTitle from '@/components/common/PageTitle'
import AccordionSections from '@/components/my-dictionary/AccordionSections'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { useEffect } from 'react'
import { useModalStore } from '@/store/useModalStore'

const MyDictionary = () => {
  const {
    hasPlantsData,
    setHasPlantsData,
    accordionOpen,
    setAccordionOpen,
    plantAccordionData,
    setPlantAccordionData,
    userEmail,
    setUserEmail,
  } = useMyDictionary()
  const { data } = plantIndexFetchData(1, 300)
  const { closeModal } = useModalStore()
  useSyncStateFromLocalStorage({
    data,
    setHasPlantsData,
    setPlantAccordionData,
    setUserEmail,
  })

  useEffect(() => {
    if (userEmail) {
      closeModal
    }
  }, [userEmail])

  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
        <PageTitle
          titleImage="my_dictionary_title_image_2.jpg"
          titleOptions="default"
        />
        <AccordionSections
          hasPlantsData={hasPlantsData}
          accordionOpen={accordionOpen}
          setAccordionOpen={setAccordionOpen}
          plantAccordionData={plantAccordionData}
          data={data}
        />
      </div>
      <ScrollButton />
    </Layout>
  )
}

export default MyDictionary
