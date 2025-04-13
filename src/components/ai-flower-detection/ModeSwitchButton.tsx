import { ModeSwitchButtonProps } from "@/types/type"

const ModeSwitchButton = ({
  analysisMode,
  setAnalysisMode,
}: ModeSwitchButtonProps) => {
  return (
    <div className="z-10 flex flex-row rounded-full border dark:border-gray-600 mobile:mb-16 mobile:w-80 sm:mb-20 sm:w-[28rem]">
      <button
        type="button"
        className={`h-full w-1/2 rounded-l-full mobile:p-2 sm:p-3 ${
          analysisMode == 'camera'
            ? 'bg-zinc-600 font-semibold text-white dark:bg-zinc-800 dark:text-slate-300'
            : 'bg-white text-zinc-800 dark:bg-zinc-400'
        }`}
        onClick={() => setAnalysisMode('camera')}
        aria-label="카메라로 꽃을 인식하는 모드로 전환"
      >
        카메라
      </button>
      <button
        type="button"
        className={`h-full w-1/2 rounded-r-full mobile:p-2 sm:p-3 ${
          analysisMode == 'camera'
            ? 'bg-white text-zinc-800 dark:bg-zinc-400'
            : 'bg-zinc-600 font-semibold text-white dark:bg-zinc-800 dark:text-slate-300'
        }`}
        onClick={() => setAnalysisMode('imageUpload')}
        aria-label="사진을 업로드하여 꽃을 인식하는 모드로 전환"
      >
        파일 업로드
      </button>
    </div>
  )
}

 export default ModeSwitchButton