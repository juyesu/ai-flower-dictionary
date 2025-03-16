import { useEffect, useState, ChangeEvent } from 'react'
import * as tmImage from '@teachablemachine/image'
import * as tf from '@tensorflow/tfjs'
import { CustomMobileNet } from '@teachablemachine/image'
import { fetchChatGptResponse } from '@/utils/fetchChatGptResponse'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { AIModelProps } from '@/types/type'
import { useRouter } from 'next/router'
import Upload from '@/pages/assets/icons/Upload.svg'
import { useCapturedPlantImageStore } from '@/store/imageStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const fileUploadModel = ({ AIErrorModalOpen }: AIModelProps) => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileUrl, setUploadedFileUrl] = useState('')
  const [model, setModel] = useState<CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [useGptResponse, setUseGptResponse] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { data, isLoading, error } = plantIndexFetchData(1, 300)
  const { setImageUrl } = useCapturedPlantImageStore()
  const router = useRouter()

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
        console.error('모델 로드 중 에러 발생:', modelError)
        if (!isLoading && (!data || modelError || error)) {
          model?.dispose()
          tf.engine().disposeVariables()
          setModel(null)
          AIErrorModalOpen()
        }
      }
    }

    loadModel()
  }, [model])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setUploadedFileName(event.target.files[0].name)
      setUploadedFileUrl(URL.createObjectURL(event.target.files[0]))
    }

    const file = event.target.files?.[0]
    if (file) {
      setIsAnalyzing(true)
      setLabel('')
      setUseGptResponse(false)
      setImage(file)
      predict(file)
    }
  }

  const predict = async (file: File) => {
    if (model) {
      const imgURL = URL.createObjectURL(file)
      const img = new Image()
      img.src = imgURL

      img.onload = async () => {
        const predictions = await model.predict(img)
        let highestPrediction = { className: '', probability: 0 }

        for (let i = 0; i < maxPredictions; i++) {
          const className = predictions[i].className
          const probability = Number(predictions[i].probability.toFixed(2))

          if (probability > highestPrediction.probability) {
            highestPrediction = { className, probability }
          }
        }

        if (highestPrediction.probability > 0.7) {
          setImageUrl(imgURL)
          setFlowerName(highestPrediction.className)
          checkPlantMatch(highestPrediction.className)
        } else {
          setIsAnalyzing(false)
          setLabel('일치하는 꽃을 발견하지 못했습니다.')
        }
      }
    }
  }

  const checkPlantMatch = async (className: string) => {
    const matchedPlant = data?.krnmList?.find(
      (name: string) => name === className
    )

    if (matchedPlant) {
      sessionStorage.setItem('cameFromAiFlowerDetection', 'true')
      router.push({
        pathname: `/view/${matchedPlant}`,
        query: { prevPage: 'ai-flower-detection', sort: 'file' },
      })
    } else {
      try {
        const gptResponse = await fetchChatGptResponse(className)
        setUseGptResponse(true)
        setLabel(gptResponse)
      } catch {
        setLabel('인공지능 생성 답변을 불러오는데 실패하였습니다.')
        console.error('GPT API 호출 실패:', error)
      }
    }
    setIsAnalyzing(false)
  }

  return (
    <div className="flex w-full flex-col items-center px-80">
      <div
        id="image-container"
        className="relative mt-6 flex aspect-[4/3] max-h-[624px] w-full max-w-[832px] rounded border-2 border-zinc-500 bg-zinc-100 bg-cover bg-center dark:bg-gray-800"
        style={{
          backgroundImage: uploadedFileUrl ? `url(${uploadedFileUrl})` : 'none',
        }}
      >
        {isAnalyzing && <LoadingSpinner />}
      </div>
      {image && useGptResponse ? (
        <>
          <p className="mt-12 text-center text-zinc-400 dark:text-slate-600">
            ※ 인덱스에 식물 정보가 존재하지 않아, 인공지능 생성 답변으로 대체
            됩니다.
          </p>
          <p className="mt-2 w-full text-center text-3xl font-bold text-cyan-600 dark:text-emerald-700">
            예측 결과 : {flowerName}
          </p>
          <p className="mt-6 text-center text-lg dark:text-slate-300">
            {label}
          </p>
        </>
      ) : (
        <p className="mt-6 text-center text-lg dark:text-slate-300">{label}</p>
      )}
      {uploadedFileName ? (
        <div className="my-16 flex flex-row gap-10">
          <div>
            <label
              htmlFor="fileUpload"
              className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-400 bg-zinc-800 p-4 font-semibold text-zinc-100 hover:bg-zinc-600 dark:border-zinc-600 dark:hover:bg-zinc-700"
            >
              <Upload
                className="mx-2 h-4 w-4 text-zinc-100 dark:text-slate-300"
                fill="currentColor"
                aria-hidden="true"
              />
              파일 업로드하기
            </label>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="border dark:border-zinc-500" />
          <p className="mt-4 text-lg dark:text-slate-300">
            📂 {uploadedFileName}
          </p>
        </div>
      ) : (
        <div>
          <label
            htmlFor="fileUpload"
            className="my-16 flex cursor-pointer items-center justify-center rounded-lg border border-zinc-400 bg-zinc-800 p-4 font-semibold text-zinc-100 hover:bg-zinc-600 dark:border-zinc-600 dark:text-slate-300 dark:hover:bg-zinc-700"
          >
            <Upload
              className="mx-2 h-4 w-4 text-zinc-100 dark:text-slate-300"
              fill="currentColor"
              aria-hidden="true"
            />
            파일 업로드하기
          </label>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  )
}

export default fileUploadModel
