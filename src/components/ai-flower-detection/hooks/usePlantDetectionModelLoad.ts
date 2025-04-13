import * as tmImage from '@teachablemachine/image'
import * as tf from '@tensorflow/tfjs'
import { useModalStore } from '@/store/useModalStore'
import { PlantDetectionModelLoadOptions } from '@/types/type'
import { useEffect } from 'react'

const usePlantDetectionModelLoad = async ({
  plantDetectionModel,
  setPlantDetectionModel,
  setMaxPredictions,
  data,
  isLoading,
  error,
}: PlantDetectionModelLoadOptions) => {
  const { openModal } = useModalStore()

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (plantDetectionModel) return

        const loadedModel = await tmImage.load(
          '/plants_detection_model/model.json',
          '/plants_detection_model/metadata.json'
        )

        setPlantDetectionModel(loadedModel)
        setMaxPredictions(loadedModel.getTotalClasses())
      } catch (modelError) {
        console.error('Error loading model:', modelError)
        if (!isLoading && (!data || modelError || error)) {
          plantDetectionModel?.dispose()
          tf.engine().disposeVariables()
          setPlantDetectionModel(null)
          openModal({ type: 'PLANT_DETECTION_MODEL_ERROR' })
        }
      }
    }

    loadModel()
  }, [plantDetectionModel])
}

export default usePlantDetectionModelLoad
