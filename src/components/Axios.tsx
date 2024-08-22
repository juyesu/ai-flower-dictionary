'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ItemList from './ItemList'

const GARDEN_API_URL =
  'https://apis.data.go.kr/B554620/gardenPrntInfoService/getGardenPrntInfoList?serviceKey=sL7tbaOTpeVYTaIXr22d8usE%2FX0BGm8MmIKamsm%2B%2BqYtrxj%2BPgUqop7AJuJlUjhiEsJzYzdRHjRkXgAnVI7TeA%3D%3D&pageNo=1&numOfRows=10&type=json'


const AxiosComponent = () => {
  const [list, setList] = useState([])

  const getData = async () => {
    await axios.get(GARDEN_API_URL).then((res) => {
      setList(res.data.response.body.items.item)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <ItemList list={list} />
    </>
  )
}

export default AxiosComponent
