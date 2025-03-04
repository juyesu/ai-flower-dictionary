import { useEffect, useState } from 'react'
import * as tmImage from '@teachablemachine/image'
import { CustomMobileNet } from '@teachablemachine/image'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PlantIndexItem, AIModelProps } from '@/types/type'
import { useRouter } from 'next/router'
import Upload from '@/pages/assets/icons/Upload.svg'

const fileUploadModel = ({ AIErrorModalOpen }: AIModelProps) => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileUrl, setUploadedFileUrl] = useState('')
  const [model, setModel] = useState<CustomMobileNet | null>(null)
  const [maxPredictions, setMaxPredictions] = useState(0)
  const [label, setLabel] = useState('')
  const [flowerName, setFlowerName] = useState('')
  const [isPredicting, setIsPredicting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const { data, isLoading, error } = plantIndexFetchData(1, 300)
  const router = useRouter()

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (!model) {
          const loadedModel = await tmImage.load(
            '/plants_detection_model/model.json',
            '/plants_detection_model/metadata.json'
          )
          setModel(loadedModel)
          setMaxPredictions(loadedModel.getTotalClasses())
        }
      } catch (modelError) {
        console.error('모델 로드 중 에러 발생:', modelError)
        if (!isLoading && (!data || modelError || error)) {
          AIErrorModalOpen()
        }
      }
    }

    loadModel()
  }, [model])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setUploadedFileName(event.target.files[0].name)
      setUploadedFileUrl(URL.createObjectURL(event.target.files[0]))
    }

    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
      predict(file)
    }
  }

  const predict = async (file: File) => {
    if (model && !isPredicting) {
      setIsPredicting(true)
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
          setFlowerName(highestPrediction.className)
          checkPlantMatch(highestPrediction.className)
        } else {
          setLabel('일치하는 꽃을 발견하지 못했습니다.')
        }

        setIsPredicting(false)
      }
    }
  }

  const checkPlantMatch = (className: string) => {
    const matchedPlant = data?.krnmList?.find(
      (name: string) => name === className
    )

    if (matchedPlant) {
      router.push({
        pathname: `/view/${matchedPlant}`,
        query: { prevPage: 'ai-flower-detection', sort: 'file' },
      })
    } else {
      setLabel(
        `인식한 식물은 ${className}입니다. 일치하는 검색 결과가 없습니다.`
      )
    }
  }

  return (
    <>
      <div className="flex flex-col items-center px-80 w-full">
        <div
          id="webcam-container"
          className="flex mt-6 w-full max-w-[832px] max-h-[624px] aspect-[4/3] border border-2 border-zinc-500 bg-zinc-100 rounded bg-cover bg-center"
          style={{
            backgroundImage: uploadedFileUrl
              ? `url(${uploadedFileUrl})`
              : 'none',
          }}
        />
        {image && (
          <div className="mt-2">
            <h2 className="text-xl text-center">{flowerName}</h2>
            <p className="font-semibold text-center">{label}</p>
          </div>
        )}
        {uploadedFileName ? (
          <div className="my-16 flex flex-row gap-10">
            <div>
              <label
                htmlFor="fileUpload"
                className="p-4 flex items-center justify-center bg-zinc-800 hover:bg-zinc-600 font-semibold text-zinc-100 cursor-pointer border border-zinc-400 rounded-lg"
              >
                <Upload
                  className="mx-2 w-4 h-4"
                  fill="#f4f4f5"
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
            <div className="border"></div>
            <p className="mt-4 text-lg">📂 {uploadedFileName}</p>
          </div>
        ) : (
          <div>
            <label
              htmlFor="fileUpload"
              className="my-16 p-4 flex items-center justify-center bg-zinc-800 hover:bg-zinc-600 font-semibold text-zinc-100 cursor-pointer border border-zinc-400 rounded-lg"
            >
              <Upload
                className="w-4 h-4 mx-2"
                fill="#f4f4f5"
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
    </>
  )
}

export default fileUploadModel
