import {
  PlantSearchBarContainerProps,
  PlantSearchFormValues,
} from '@/types/type'
import { FormProvider, useForm } from 'react-hook-form'
import PlantSearchBar from '@/components/common/plant-search-bar/PlantSearchBar'
import usePlantSearch from '@/components/common/plant-search-bar/hooks/usePlantSearch'

const PlantSearchBarContainer = (props: PlantSearchBarContainerProps) => {
  const { staticIndexList, staticKrnmList } = props
  const methods = useForm<PlantSearchFormValues>()
  const usePlantSearchHookValues = usePlantSearch({
    methods,
    staticIndexList,
    staticKrnmList,
  })

  return (
    <FormProvider {...methods}>
      <PlantSearchBar {...props} {...usePlantSearchHookValues} />
    </FormProvider>
  )
}

export default PlantSearchBarContainer
