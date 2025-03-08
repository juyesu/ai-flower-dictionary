import React from 'react'
import Layout from '@/components/common/Layout'
import ScrollBtn from '@/components/common/ScrollBtn'
import ItemList from '@/components/plant-info/ItemList'

const PlantInfo = () => {
  return (
    <Layout>
      <ItemList />
      <ScrollBtn />
    </Layout>
  )
}

export default PlantInfo
