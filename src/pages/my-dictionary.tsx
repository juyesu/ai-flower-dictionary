import Layout from '@/components/common/layout/Layout'
import ScrollButton from '@/components/common/ui/ScrollButton'
import useMyDictionary from '@/components/my-dictionary/hooks/useMyDictionaryPageState'
import useSyncLocalStorageWithState from '@/components/my-dictionary/hooks/useSyncLocalStorageWithState'
import PageTitle from '@/components/common/ui/PageTitle'
import AccordionSections from '@/components/my-dictionary/AccordionSections'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useEffect } from 'react'
import { useModalStore } from '@/store/useModalStore'
import Head from 'next/head'

const MyDictionary = () => {
  const {
    accordionOpen,
    setAccordionOpen,
    plantAccordionData,
    setPlantAccordionData,
    userEmail,
    setUserEmail,
  } = useMyDictionary()
  const { data } = usePlantIndexFetchData(1, 300)
  const { closeModal } = useModalStore()
  useSyncLocalStorageWithState({
    data,
    setPlantAccordionData,
    setUserEmail,
  })

  useEffect(() => {
    if (userEmail) {
      closeModal
    }
  }, [userEmail])

  return (
    <>
      <Head>
        <title>My Dictionary</title>
        <meta
          name="description"
          content="좋아하는 식물들로 이루어진 나만의 도감을 만들어보세요."
        />
        <meta property="og:title" content="My Dictionary" />
        <meta
          property="og:description"
          content="좋아하는 식물들로 이루어진 나만의 도감을 만들어보세요."
        />
        <meta name="twitter:title" content="My Dictionary" />
        <meta
          name="twitter:description"
          content="좋아하는 식물들로 이루어진 나만의 도감을 만들어보세요."
        />
      </Head>
      <Layout>
        <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
          <PageTitle
            titleImage="my_dictionary_title_image_2"
            titleOptions="default"
          />
          <AccordionSections
            accordionOpen={accordionOpen}
            setAccordionOpen={setAccordionOpen}
            plantAccordionData={plantAccordionData}
            data={data}
          />
        </div>
        <ScrollButton />
      </Layout>
    </>
  )
}

export default MyDictionary
