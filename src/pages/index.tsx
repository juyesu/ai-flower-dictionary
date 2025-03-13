import React from 'react'
import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import Homepage from '@/components/homepage/Homepage'
import Head from 'next/head'

const Index = () => {
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
        <Homepage />
        <ScrollButton />
      </Layout>
    </>
  )
}

export default Index
