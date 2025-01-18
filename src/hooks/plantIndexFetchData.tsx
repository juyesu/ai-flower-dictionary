import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const plantIndexFetchData = () => {
  const params = {
    serviceKey: process.env.NEXT_PUBLIC_GARDEN_API_KEY,
    pageNo: 1,
    numOfRows: 100,
    type: 'json',
  }
  return useQuery({
    queryKey: [`GET ${process.env.NEXT_PUBLIC_GARDEN_API_PATH}`, params],
    queryFn: async () => {
      return await axios.get(process.env.NEXT_PUBLIC_GARDEN_API_PATH, {
        params,
      })
    },
  })
}
