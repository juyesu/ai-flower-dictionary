import { PageTitleProps } from '@/types/type'
import PlantSearchBar from '@/components/common/PlantSearchBar'
import ModeSwitchButton from '@/components/ai-flower-dection/ModeSwitchButton'
import Image from 'next/image'

const PageTitle = ({
  isCameraMode,
  setIsCameraMode,
  titleImage,
  titleOptions,
}: PageTitleProps) => {
  return (
    <div
      className={`relative flex w-full items-end justify-center overflow-hidden ${titleOptions == 'PlantSearchBar' ? 'mobile:h-[460px] sm:h-[652px]' : 'mobile:h-[360px] sm:h-[500px]'}`}
    >
      <Image
        src={`/images/${titleImage}`}
        alt="타이틀 커버 이미지"
        className="object-cover"
        fill
      />
      <div className="title_image_gradient dark:title_image_gradient absolute inset-0" />
      {(() => {
        switch (titleOptions) {
          case 'ModeSwitchButton':
            return (
              <>
                <div className="mt-30 absolute inset-0 flex flex-col items-center justify-center gap-3 pb-20">
                  <h1 className="page_main_title dark:text-slate-300">
                    AI Flower Detection
                  </h1>
                  <p className="ml-1 mt-1.5 text-center font-semibold text-zinc-800 dark:text-slate-300 sm:text-lg">
                    카메라에 꽃을 비추거나, 꽃 이미지를 업로드하면 <br /> 해당
                    꽃의 이름과 정보를 알려드립니다.
                  </p>
                </div>
                <ModeSwitchButton
                  isCameraMode={isCameraMode}
                  setIsCameraMode={setIsCameraMode}
                />
              </>
            )
          case 'PlantSearchBar':
            return (
              <div className="absolute inset-0 flex w-full flex-col items-center gap-5">
                <div className="mt-28 flex flex-col items-center">
                  <h1 className="page_main_title dark:text-slate-300">
                    Plant Info
                  </h1>
                  <p className="ml-1 mt-1.5 text-center text-lg font-semibold text-zinc-800 dark:text-slate-300">
                    다양한 식물 정보를 탐색하고 사용자들과 <br />
                    식물에 대한 경험을 공유해보세요
                  </p>
                </div>
                <PlantSearchBar color="dark" currentPage="plant-info" />
              </div>
            )
          case 'default' :
            return (
              <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-5">
                <div className="mb-12 flex flex-col items-center">
                  <h1 className="page_main_title dark:text-slate-300">
                    My Dictionary
                  </h1>
                  <p className="ml-1 mt-1.5 text-center text-lg font-semibold text-zinc-800 dark:text-slate-300">
                    내가 발견한 식물들로 <br />
                    세상에 단 하나뿐인 나만의 도감을 완성해보세요
                  </p>
                </div>
              </div>
            )
        }
      })()}
    </div>
  )
}

export default PageTitle
