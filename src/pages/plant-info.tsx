import React from 'react'
import Layout from '@/components/common/Layout'
import ScrollButton from '@/components/common/ScrollButton'
import ItemList from '@/components/plant-info/ItemList'

const PlantInfo = () => {
  return (
    <Layout>
      <ItemList />
      <ScrollButton />
    </Layout>
  )
}

export default PlantInfo
