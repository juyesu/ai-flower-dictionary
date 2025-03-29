import React, { useEffect, useRef } from 'react'
import Layout from '@/components/common/Layout'
import PageTitle from '@/components/common/PageTitle'
import ScrollButton from '@/components/common/ScrollButton'
import CardView from '@/components/plant-info/CardView'
import TableView from '@/components/plant-info/TabelView'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import handlePlantLike from '@/utils/handlePlantLike'
import { useAuth } from '@/context/AuthContext'
import ViewModeSwitchButton from '@/components/plant-info/ViewModeSwitchButton'
import Pagination from '@/components/plant-info/Pagineation'
import usePlantInfoPageState from '@/components/plant-info/hooks/usePlantInfoPageState'
import useSetApiErrorModal from '@/components/plant-info/hooks/useSetApiErrorModal'
import router from 'next/router'

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
  const { data, isLoading, error } = plantIndexFetchData(
    currentPage,
    maximumPageSize
  )
  const { sort } = router.query
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
    if (sort == 'table') {
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
    <Layout>
      <div className="flex min-h-screen w-full flex-col items-center fhd:px-96 qhd:px-[32rem]">
        <PageTitle
          titleImage="plant_info_title_image_3.jpg"
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
            handlePlantLike={handlePlantLike}
          />
        ) : (
          <TableView
            viewPortWidth={viewPortWidth}
            apiData={data?.indexList}
            likedPlants={likedPlants}
            copyTooltipIndex={copyTooltipIndex}
            setCopyTooltipIndex={setCopyTooltipIndex}
            currentPage={currentPage}
            handlePlantLike={handlePlantLike}
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
  )
}

export default PlantInfo
