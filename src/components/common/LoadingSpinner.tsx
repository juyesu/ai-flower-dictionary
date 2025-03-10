const LoadingSpinner = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="spinner-border" />
      <p className="mt-8">
        결과를 생성 중입니다. <br /> 잠시만 기다려주세요
      </p>
    </div>
  )
}

export default LoadingSpinner
