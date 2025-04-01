import Link from 'next/link'
import Image from 'next/image'
import { PreviewContentSectionProps } from '@/types/type'
import useFadeInOnScroll from '@/hooks/useFadeInOnScroll'

const FeatureSections = () => {
  return (
    <div className="flex w-full flex-col items-center mobile:my-6 sm:my-12 sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
      <div className="flex w-full flex-col items-center mobile:mb-4 mobile:mt-4 sm:mb-12 sm:mt-16">
        <h1 className="border-b-2 border-black dark:border-zinc-300 dark:text-slate-300 mobile:pb-2 mobile:text-3xl sm:pb-3 sm:text-5xl">
          Features
        </h1>
      </div>
      <PreviewContentSection
        sectionTagId="aiFlowerDetectionSection"
        id="aiFlowerDetection"
        title="카메라, 이미지 파일 AI 분석을 통해 <br> 궁금한 식물을 알아보세요"
        description="인공지능으로 학습한 모델을 통해 <br> 식물의 종류를 식별하고, 꽃말과 피는 시기 등 정보를 출력해줍니다."
        linkHref="/ai-flower-detection"
        linkText="Go to AI flower detection"
        imgSrc="/images/webcam_title_image_2.jpg"
        isLeftAligned={false}
      />
      <hr className="w-1/4 dark:border-zinc-500" />
      <PreviewContentSection
        sectionTagId="plantInfoSection"
        id="plantInfo"
        title="한국수목원정원관리원에서 제공하는 <br> 100종 이상의 식물들을 확인해보세요"
        description="각양각색 식물들의 이미지와 구체적인 정보를 확인하고 <br> 다른 사람과 식물을 발견한 경험과 나만의 추억 등 의견을 나눠보세요."
        linkHref="/plant-info"
        linkText="Go to PlantInfo"
        imgSrc="/images/plantInfo_title_image_1.jpg"
        isLeftAligned={true}
      />
      <hr className="w-1/4 dark:border-zinc-500" />
      <PreviewContentSection
        sectionTagId="myDictionarySection"
        id="myDictionary"
        title="내가 발견한 식물들로 <br> 도감을 수집해보세요"
        description="계정을 만들고 AI Flower Detection을 통해 발견한 식물들을 <br> 나만의 도감에 수집시켜보세요"
        linkHref="/dictionary"
        linkText="Go to My Dictionary"
        imgSrc="/images/mydictionary_title_image_2.jpg"
        isLeftAligned={false}
      />
    </div>
  )
}

export default FeatureSections

const PreviewContentSection = ({
  sectionTagId,
  id,
  title,
  description,
  linkHref,
  linkText,
  imgSrc,
  isLeftAligned,
}: PreviewContentSectionProps) => {
  const isInView = useFadeInOnScroll()
  const formatTextWithLineBreaks = (text: string) => {
    return text.replace(/<br>/g, '<br />')
  }

  return (
    <section
      id={sectionTagId}
      className="scroll-trigger w-full mobile:my-16 sm:my-32 sm:flex-row"
    >
      {!isLeftAligned ? (
        <div className="flex w-full items-center justify-center overflow-hidden mobile:flex-col sm:flex-row">
          <div
            id={id}
            className={`flex flex-col mobile:w-11/12 sm:w-1/2 sm:p-3 lg:p-10 2xl:p-24 ${
              isInView[id] ? 'fade_in_left' : 'hidden_opacity'
            }`}
          >
            <div className="relative overflow-hidden transition-transform duration-500 ease-out hover:scale-105 mobile:h-[28rem] sm:h-[52rem]">
              <Image
                src={imgSrc}
                alt=""
                aria-hidden="true"
                className="overflow-hidden object-cover object-center dark:saturate-[.8] mobile:h-[28rem] sm:h-[52rem]"
                fill
              />
            </div>
          </div>
          <div
            className={`flex flex-col mobile:w-4/5 sm:w-1/2 ${
              isInView[id] ? 'fade_in_left' : 'hidden_opacity'
            }`}
          >
            <div className="mobile:mt-4 mobile:text-center sm:mt-8 sm:pl-3 sm:text-start md:pl-6 lg:ml-12 lg:mt-12 lg:px-3 xl:ml-16 xl:mt-16">
              <h2
                className="my-6 font-semibold text-zinc-800 dark:text-slate-300 mobile:text-xl sm:leading-[1.2] lg:text-3xl xl:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(title),
                }}
              />
              <p
                className="font-normal text-zinc-800 dark:text-slate-300 lg:text-lg xl:text-xl"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(description),
                }}
              />
              <Link
                href={linkHref}
                className="inline-block w-auto rounded-full bg-black px-6 font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 mobile:mt-10 mobile:py-2 sm:mt-20 sm:text-lg lg:py-3 lg:text-xl"
              >
                {linkText}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center mobile:flex-col-reverse sm:flex-row">
          <div
            className={`flex sm:h-[52rem] sm:flex-col sm:justify-center ${
              isInView[id] ? 'fade_in_right' : 'hidden_opacity'
            }`}
          >
            <div className="mobile:mt-4 mobile:text-center sm:mt-8 sm:pr-3 sm:text-right md:pr-6 lg:mt-12 xl:mr-16 xl:mt-16">
              <h2
                className="my-6 font-semibold leading-[1.2] text-zinc-800 dark:text-slate-300 mobile:text-xl lg:text-3xl xl:text-4xl"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(title),
                }}
              />
              <p
                className="font-normal text-zinc-800 dark:text-slate-300 lg:text-lg xl:text-xl"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(description),
                }}
              />
              <Link
                href={linkHref}
                className="inline-block rounded-full bg-black px-6 font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 mobile:mt-10 mobile:py-2 sm:mt-20 sm:text-lg lg:py-3 lg:text-xl"
              >
                {linkText}
              </Link>
            </div>
          </div>
          <div
            id={id}
            className={`flex flex-col mobile:w-11/12 sm:w-1/2 sm:p-3 lg:p-10 2xl:p-24 ${
              isInView[id] ? 'fade_in_right' : 'hidden_opacity'
            }`}
          >
            <div className="relative overflow-hidden transition-transform duration-500 ease-out hover:scale-105 mobile:h-[28rem] sm:h-[52rem]">
              <Image
                src={imgSrc}
                alt=""
                aria-hidden="true"
                className="overflow-hidden object-cover object-center filter dark:saturate-[.8]"
                fill
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
