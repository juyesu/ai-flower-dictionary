import * as tmImage from '@teachablemachine/image'
import * as tf from '@tensorflow/tfjs'
import { useModalStore } from '@/store/useModalStore'
import { PlantDetectionModelLoadOptions } from '@/types/type'
import { useEffect } from 'react'

const usePlantDetectionModelLoad = async ({
  model,
  setModel,
  setMaxPredictions,
  data,
  isLoading,
  error,
}: PlantDetectionModelLoadOptions) => {
  const { setModalOpen } = useModalStore()
  
  useEffect(() => {
    const loadModel = async () => {
      try {
        if (model) return

        const loadedModel = await tmImage.load(
          '/plants_detection_model/model.json',
          '/plants_detection_model/metadata.json'
        )

        setModel(loadedModel)
        setMaxPredictions(loadedModel.getTotalClasses())
      } catch (modelError) {
        console.error('Error loading model:', modelError)
        if (!isLoading && (!data || modelError || error)) {
          model?.dispose()
          tf.engine().disposeVariables()
          setModel(null)
          setModalOpen('PlantDetectionModelErrorModal')
        }
      }
    }

    loadModel()
  }, [model])
}

export default usePlantDetectionModelLoad
