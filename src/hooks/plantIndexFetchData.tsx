import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const GARDEN_API_URL =
  'https://apis.data.go.kr/B554620/gardenPrntInfoService/getGardenPrntInfoList?serviceKey=sL7tbaOTpeVYTaIXr22d8usE%2FX0BGm8MmIKamsm%2B%2BqYtrxj%2BPgUqop7AJuJlUjhiEsJzYzdRHjRkXgAnVI7TeA%3D%3D&pageNo=1&numOfRows=100&type=json'

const GARDEN_API_PATH =
  'https://apis.data.go.kr/B554620/gardenPrntInfoService/getGardenPrntInfoList'

export const plantIndexFetchData = () => {
  const params = {
    serviceKey:
      'sL7tbaOTpeVYTaIXr22d8usE/X0BGm8MmIKamsm++qYtrxj+PgUqop7AJuJlUjhiEsJzYzdRHjRkXgAnVI7TeA==',
    pageNo: 1,
    numOfRows: 100,
    type: 'json',
  }
  return useQuery({
    queryKey: [`GET ${GARDEN_API_PATH}`, params],
    queryFn: async () => {
      return await axios.get(GARDEN_API_PATH, { params })
    },
  })
}
