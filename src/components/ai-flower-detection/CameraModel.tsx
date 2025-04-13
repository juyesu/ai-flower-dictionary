import Webcam from 'react-webcam'
import NextImage from 'next/image'
import Camera from '@/pages/assets/icons/Camera.svg'
import LoadingSpinner from '@/components/common/ui/LoadingSpinner'
import useCameraModel from '@/components/ai-flower-detection/hooks/useCameraModel'

const CameraModel = () => {
  const {
    isMobileDevice,
    useWebcam,
    setUseWebcam,
    cameraRef,
    flowerName,
    setFlowerName,
    capturedImageUrl,
    plantDescription,
    setPlantDescription,
    isGptFetchingRef,
    isAnalyzing,
    highestPrediction,
    handleMobileCapture,
  } = useCameraModel()

  return (
    <div className="flex w-full flex-col items-center mobile:px-4 sm:px-12 lg:px-28 qhd:px-80">
      <div
        id="camera-display-container"
        className="relative mt-6 flex aspect-[4/3] h-auto max-h-[39rem] min-h-[14rem] w-full min-w-[20rem] max-w-[52rem] rounded border-2 border-zinc-500 bg-zinc-100 dark:bg-gray-800"
      >
        {useWebcam && (
          <Webcam
            audio={false}
            ref={cameraRef}
            screenshotFormat="image/jpeg"
            className="h-full w-full"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user',
            }}
          />
        )}
        {!useWebcam && flowerName && capturedImageUrl && (
          <NextImage
            src={capturedImageUrl}
            alt="촬영된 이미지"
            className="h-full w-full"
            width={832}
            height={624}
          />
        )}
        {isAnalyzing && <LoadingSpinner />}
        {!useWebcam && !flowerName && !capturedImageUrl && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-4">
            <Camera
              className="h-10 w-10 text-zinc-500 dark:text-slate-300"
              fill="currentColor"
              aria-hidden="true"
            />
            <p className="mt-6 text-center font-semibold text-zinc-500 dark:text-slate-300">
              하단의 버튼을 클릭하면 카메라가 실행됩니다.
            </p>
          </div>
        )}
      </div>
      {useWebcam && (
        <p className="mt-6 text-center text-2xl font-semibold">
          예측이 진행중입니다... 현재
          <span
            className={`ml-1.5 font-bold ${
              highestPrediction.probability <= 0.5
                ? 'text-zinc-500'
                : highestPrediction.probability < 0.7
                  ? 'text-lime-500'
                  : highestPrediction.probability < 0.95
                    ? 'text-cyan-400'
                    : 'text-amber-300'
            } `}
          >
            {highestPrediction.probability * 100}%
          </span>
          의 확률로
          <span className="bold ml-1.5 text-fuchsia-400">
            {highestPrediction.className}
          </span>
          식물로 예측하고 있습니다.
        </p>
      )}
      {highestPrediction.className && flowerName && !useWebcam && (
        <div>
          <p className="mt-12 text-center text-zinc-400">
            ※ 인덱스에 식물 정보가 존재하지 않아, 인공지능 생성 답변으로 대체
            됩니다.
          </p>
          <p className="mt-2 w-full text-center text-3xl font-bold text-cyan-600">
            예측 결과 : {flowerName}
          </p>
          <p className="mt-6 text-center text-lg">{plantDescription}</p>
        </div>
      )}
      {!isMobileDevice() ? (
        <button
          type="button"
          className="my-16 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-zinc-400 bg-zinc-300 dark:bg-zinc-500"
          onClick={() => {
            setUseWebcam(!useWebcam)
            setFlowerName('')
            setPlantDescription('')
            isGptFetchingRef.current = false
          }}
          aria-label="카메라 실행"
        >
          <NextImage
            src="/images/camera.png"
            alt=""
            className="h-auto w-12"
            aria-hidden="true"
            width={48}
            height={48}
          />
        </button>
      ) : (
        <>
          <label
            htmlFor="cameraInput"
            className="my-8 flex h-[3rem] w-[8.5rem] cursor-pointer items-center justify-center rounded-full border border-zinc-400 bg-zinc-300 px-1.5 py-0.5 dark:bg-zinc-500"
          >
            <NextImage
              src="/images/camera.png"
              alt=""
              className="mx-1.5 h-auto w-6"
              aria-hidden="true"
              width={24}
              height={24}
            />
            카메라 열기
          </label>
          <input
            type="file"
            id="cameraInput"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleMobileCapture}
          />
        </>
      )}
    </div>
  )
}

export default CameraModel
