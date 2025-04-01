import React, { useEffect, useRef } from 'react'
import Layout from '@/components/common/Layout'
import PageTitle from '@/components/common/PageTitle'
import ScrollButton from '@/components/common/ScrollButton'
import CardView from '@/components/plant-info/CardView'
import TableView from '@/components/plant-info/TabelView'
import { usePlantIndexFetchData } from '@/hooks/usePlantIndexFetchData'
import { useAuth } from '@/context/AuthContext'
import ViewModeSwitchButton from '@/components/plant-info/ViewModeSwitchButton'
import Pagination from '@/components/plant-info/Pagineation'
import usePlantInfoPageState from '@/components/plant-info/hooks/usePlantInfoPageState'
import useSetApiErrorModal from '@/components/plant-info/hooks/useSetApiErrorModal'
import router from 'next/router'
import Head from 'next/head'

const PlantInfo = () => {
  const {
    viewPortWidth,
    isCardUi,
    setIsCardUi,
    currentPage,
    setCurrentPage,
    maximumPageSize,
    setMaximumPageSize,
    likedPlants,
    setLikedPlants,
    copyTooltipIndex,
    setCopyTooltipIndex,
  } = usePlantInfoPageState()
  const { data, isLoading, error } = usePlantIndexFetchData(
    currentPage,
    maximumPageSize
  )
  useSetApiErrorModal({ data, isLoading, error })
  const { loginUser } = useAuth()
  const hasMounted = useRef(false)

  useEffect(() => {
    if (loginUser) {
      setLikedPlants(
        JSON.parse(localStorage.getItem(`${loginUser}.likedPlants`) || '[]')
      )
    }
  }, [loginUser])

  useEffect(() => {
    if (router.query.sort == 'table') {
      setIsCardUi(false)
    }
  }, [])

  useEffect(() => {
    if (hasMounted.current) {
      window.scrollTo(0, 400)
    } else {
      hasMounted.current = true
    }
  }, [currentPage])

  return (
    <>
      <Head>
        <title>Plant Info</title>
        <meta
          name="description"
          content="100종 이상의 다양한 식물 정보를 확인해보세요."
        />
        <meta property="og:title" content="Plant Info" />
        <meta
          property="og:description"
          content="100종 이상의 다양한 식물 정보를 확인해보세요."
        />
        <meta name="twitter:title" content="Plant Info" />
        <meta
          name="twitter:description"
          content="100종 이상의 다양한 식물 정보를 확인해보세요."
        />
      </Head>
      <Layout>
        <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
          <PageTitle
            titleImage="plant_info_title_image_3"
            titleOptions="PlantSearchBar"
          />
          <ViewModeSwitchButton
            viewPortWidth={viewPortWidth}
            setIsCardUi={setIsCardUi}
            setCurrentPage={setCurrentPage}
            setMaximumPageSize={setMaximumPageSize}
          />
          {isCardUi ? (
            <CardView
              apiData={data?.indexList}
              likedPlants={likedPlants}
              copyTooltipIndex={copyTooltipIndex}
              setCopyTooltipIndex={setCopyTooltipIndex}
            />
          ) : (
            <TableView
              viewPortWidth={viewPortWidth}
              apiData={data?.indexList}
              likedPlants={likedPlants}
              copyTooltipIndex={copyTooltipIndex}
              setCopyTooltipIndex={setCopyTooltipIndex}
              currentPage={currentPage}
            />
          )}
          <Pagination
            apiData={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maximumPageSize={maximumPageSize}
          />
        </div>
        <ScrollButton />
      </Layout>
    </>
  )
}

export default PlantInfo
