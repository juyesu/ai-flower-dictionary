import React, { useEffect } from 'react'
import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import HeroSection from '@/components/homepage/HeroSection'
import FeatureSections from '@/components/homepage/FeatureSections'
import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { useModalStore } from '@/store/useModalStore'
import useSectionScroll from '@/hooks/useSectionScroll'
import { GetStaticProps } from 'next'
import getPlantIndexData from '@/utils/getPlantIndexData'
import { IndexProps } from '@/types/type'

const Index = ({ staticIndexList, staticKrnmList }: IndexProps) => {
  const methods = useForm()
  const { isModalOpen } = useModalStore()
  useSectionScroll()

  useEffect(() => {
    if (!isModalOpen) {
      methods.setFocus('input')
    }
  }, [isModalOpen])

  return (
    <>
      <Head>
        <title>AI Flower Dictionary</title>
        <meta
          name="description"
          content="AI를 활용한 식물 인식 및 다양한 식물 정보 등 식물과 관련한 다양한 기능을 확인해보세요."
        />
        <meta property="og:title" content="AI Flower Dictionary" />
        <meta
          property="og:description"
          content="AI를 활용한 식물 인식 및 다양한 식물 정보 등 식물과 관련한 다양한 기능을 확인해보세요."
        />
        <meta name="twitter:title" content="AI Flower Dictionary" />
        <meta
          name="twitter:description"
          content="AI를 활용한 식물 인식 및 다양한 식물 정보 등 식물과 관련한 다양한 기능을 확인해보세요."
        />
        {/* 업데이트 필요 */}
        {/* <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
        <link
          rel="preload"
          href="/videos/homepage_title_viedo_1.webm"
          as="video"
          type="video/webm"
        />
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PoetsenOne-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/ai_flower_detection_title_image_4.avif`}
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/ai_flower_detection_title_image_4.webp`}
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/plant_info_title_image_3.avif`}
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/plant_info_title_image_3.webp`}
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/my_dictionary_title_image_2.avif`}
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href={`/images/my_dictionary_title_image_2.webp`}
          type="image/webp"
        />
      </Head>
      <Layout>
        <FormProvider {...methods}>
          <HeroSection
            staticIndexList={staticIndexList}
            staticKrnmList={staticKrnmList}
          />
          <FeatureSections />
          <ScrollButton />
        </FormProvider>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { indexList, krnmList } = await getPlantIndexData(1, 300)

    return {
      props: {
        indexList,
        krnmList,
      },
      revalidate: 86400,
    }
  } catch (error) {
    console.error('getStaticProps 데이터 패칭 에러:', error)

    return {
      props: {
        indexList: [],
        krnmList: [],
      },
      revalidate: 86400,
    }
  }
}

export default Index
