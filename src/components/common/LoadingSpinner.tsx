const LoadingSpinner = () => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50">
      <div className="spinner-border" />
      <p className="mt-8 dark:text-slate-200">
        결과를 생성 중입니다. <br /> 잠시만 기다려주세요
      </p>
    </div>
  )
}

export default LoadingSpinner
