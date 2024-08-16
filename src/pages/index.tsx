import React from 'react'
import WebcamModel from '../components/WebcamModel'
import Layout from '@/components/layout'
import ScrollBtn from '@/components/ScrollBtn'

export default function Home() {
  return (
    <Layout>
      <div className="mt-16 max-w-[420px] mx-auto my-7">
        <WebcamModel />
        <ScrollBtn />
      </div>
    </Layout>
  )
}
