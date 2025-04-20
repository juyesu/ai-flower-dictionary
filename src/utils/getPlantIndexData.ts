import axios from 'axios'
import { PlantIndexItem, PlantIndexParams, PlantIndexResponse } from '@/types/type'

const fetchPlantIndexData = async (
  pageNumber: number,
  pageSize: number
): Promise<PlantIndexResponse> => {
  try {
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
    const krnmList = response?.data?.response.body.items.item.map(
      (item: PlantIndexItem) => item.krnm
    )

    return {
      response: response.data,
      indexList,
      krnmList,
    }
  } catch (error) {
    console.error('Error fetching plant index data:', error)
    throw error
  }
}

export default fetchPlantIndexData
