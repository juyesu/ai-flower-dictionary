import React, { useEffect } from 'react'
import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import HeroSection from '@/components/homepage/HeroSection'
import SearchNotFoundModal from '@/components/modal/SearchNotFoundModal'
import FeatureSections from '@/components/homepage/FeatureSections'
import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { useModalStore } from '@/store/useModalStore'
import useSectionScroll from '@/hooks/useSectionScroll'

const Index = () => {
  const methods = useForm()
  const { isModalOpen, currentModal } = useModalStore()
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
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
        <meta name="author" content="Kim Ji Hyeok" />
        <meta property="og:title" content="AI Flower Dictionary" />
        <meta
          property="og:description"
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
        <meta name="twitter:title" content="AI Flower Dictionary" />
        <meta
          name="twitter:description"
          content="카메라로 식물을 비추거나 이미지를 업로드하면, AI 분석을 통해 해당 식물의 정보를 알려드립니다."
        />
        {/* 업데이트 필요 */}
        {/* <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
      </Head>
      <Layout>
        <FormProvider {...methods}>
          <HeroSection />
          <FeatureSections />
          <ScrollButton />
          {isModalOpen && currentModal == 'SearchNotFoundModal' && (
            <SearchNotFoundModal />
          )}
        </FormProvider>
      </Layout>
    </>
  )
}

export default Index
