import Upload from '@/pages/assets/icons/Upload.svg'
import LoadingSpinner from '@/components/common/ui/LoadingSpinner'
import useFileUploadModel from '@/components/ai-flower-detection/hooks/useFileUploadModel'

const fileUploadModel = () => {
  const {
    uploadedFileUrl,
    isAnalyzing,
    image,
    useGptResponse,
    flowerName,
    label,
    uploadedFileName,
    handleFileChange,
  } = useFileUploadModel()

  return (
    <div className="flex w-full flex-col items-center mobile:px-4 sm:px-12 lg:px-28 qhd:px-80">
      <div
        id="image-container"
        className="relative mt-6 flex aspect-[4/3] max-h-[39rem] w-full max-w-[52rem] rounded border-2 border-zinc-500 bg-zinc-100 bg-cover bg-center dark:bg-gray-800"
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
            className="flex cursor-pointer items-center justify-center rounded-lg border border-zinc-400 bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-600 dark:border-zinc-600 dark:text-slate-300 dark:hover:bg-zinc-700 mobile:my-6 mobile:p-3 sm:my-16 sm:p-4"
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
