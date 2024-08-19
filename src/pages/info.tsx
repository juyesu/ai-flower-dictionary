import React from 'react'
import AxiosComponent from '../components/Axios'
import Layout from '@/components/layout'
import ScrollBtn from '@/components/ScrollBtn'

const Info = () => {
  return (
    <Layout>
      <AxiosComponent />
      <ScrollBtn />
    </Layout>
  )
}

export default Info
