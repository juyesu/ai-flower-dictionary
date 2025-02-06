import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PlantIndexParams } from '@/types/type'

const fetchPlantIndexData = async (params: PlantIndexParams) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_GARDEN_API_PATH, {
    params,
  })
  return response.data
}

export const plantIndexFetchData = () => {
  const params: PlantIndexParams = {
    serviceKey: process.env.NEXT_PUBLIC_GARDEN_API_KEY,
    pageNo: 1,
    numOfRows: 100,
    type: 'json',
  }

  return useQuery({
    queryKey: [`GET ${process.env.NEXT_PUBLIC_GARDEN_API_PATH}`, params],
    queryFn: () => fetchPlantIndexData(params),
    retry: (failureCount, error) =>
      axios.isAxiosError(error) && error.response
        ? failureCount < 3 && error.response.status !== 400
        : false,
    retryDelay: (retryAttempt) => Math.min(10000 * retryAttempt, 30000),
  })
}
