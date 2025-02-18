import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PlantIndexParams } from '@/types/type'

export const MAXIMUM_PAGE_SIZE = 15

const fetchPlantIndexData = async (pageNumber: number, pageSize: number) => {
  const params: PlantIndexParams = {
    serviceKey: process.env.NEXT_PUBLIC_GARDEN_API_KEY,
    pageNo: pageNumber,
    numOfRows: pageSize,
    type: 'json',
  }
  const response = await axios.get(process.env.NEXT_PUBLIC_GARDEN_API_PATH, {
    params,
  })
  return response.data
}

export const plantIndexFetchData = (currentPage: number, pageSize: number) => {
  return useQuery({
    queryKey: [
      `GET ${process.env.NEXT_PUBLIC_GARDEN_API_PATH}`,
      { currentPage },
    ],
    queryFn: () => fetchPlantIndexData(currentPage, pageSize),
    retry: (failureCount, error) =>
      axios.isAxiosError(error) && error.response
        ? failureCount < 3 && error.response.status !== 400
        : false,
    retryDelay: (retryAttempt) => Math.min(10000 * retryAttempt, 30000),
  })
}
