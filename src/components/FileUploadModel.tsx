import { useState } from 'react'
import Upload from '@/pages/assets/icons/Upload.svg'

const fileUploadModel = () => {
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [uploadedFileUrl, setUploadedFileUrl] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setUploadedFileName(event.target.files[0].name)
      setUploadedFileUrl(URL.createObjectURL(event.target.files[0]))
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
        {uploadedFileName ? (
          <div className="mt-16 flex flex-row gap-10">
            <div>
              <label
                htmlFor="fileUpload"
                className="p-4 flex items-center justify-center bg-zinc-800 hover:bg-zinc-600 font-semibold text-zinc-100 cursor-pointer border border-zinc-400 rounded-lg"
              >
                <Upload
                  className="mx-2"
                  width="16px"
                  height="16px"
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
              className="mt-16 p-4 flex items-center justify-center bg-zinc-800 hover:bg-zinc-600 font-semibold text-zinc-100 cursor-pointer border border-zinc-400 rounded-lg"
            >
              <Upload
                className="mx-2"
                width="16px"
                height="16px"
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
