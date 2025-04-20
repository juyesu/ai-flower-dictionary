import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { PlantIndexItem, PlantIndexParams, PlantIndexResponse } from '@/types/type'

const fetchPlantIndexData = async (
  pageNumber: number,
  pageSize: number
): Promise<PlantIndexResponse> => {
  const params: PlantIndexParams = {
    serviceKey: process.env.NEXT_PUBLIC_GARDEN_API_KEY,
    pageNo: pageNumber,
    numOfRows: pageSize,
    type: 'json',
  }
  const response = await axios.get(process.env.NEXT_PUBLIC_GARDEN_API_PATH, {
    params,
  })
  const indexList = response?.data?.response.body.items.item.map((item: PlantIndexItem) => item)
  const krnmList = response?.data?.response.body.items.item.map((item: PlantIndexItem) => item.krnm)
  return {
    response: response.data,
    indexList,
    krnmList,
  }
}

export const usePlantIndexFetchData = (
  currentPage: number,
  pageSize: number
): UseQueryResult<PlantIndexResponse, Error> => {
  return useQuery({
    queryKey: [`GET ${process.env.NEXT_PUBLIC_GARDEN_API_PATH}`, { currentPage, pageSize }],
    queryFn: () => fetchPlantIndexData(currentPage, pageSize),
    retry: (failureCount, error) =>
      axios.isAxiosError(error) && error.response
        ? failureCount < 3 && error.response.status !== 400
        : false,
    retryDelay: (retryAttempt) => Math.min(10000 * retryAttempt, 30000),
  })
}
