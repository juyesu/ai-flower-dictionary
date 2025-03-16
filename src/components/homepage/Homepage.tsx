import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@styles/Homepage.module.css'
import PlantSearchBar from '@/components/common/PlantSearchBar'
import useFadeInOnScroll from '@/hooks/useFadeInOnScroll'
import useSectionScroll from '@/hooks/useSectionScroll'
import { PreviewContentSectionProps } from '@/types/type'
import SearchNotFoundModal from '@/components/modal/SearchNotFoundModal'
import { useForm } from 'react-hook-form'

const Homepage = () => {
  const methods = useForm()
  const [openModal, setOpenModal] = useState(false)
  useSectionScroll()

  const modalOpen = () => {
    document.body.style.position = 'fixed'
    setOpenModal(true)
  }

  const modalClose = () => {
    document.body.style.position = ''
    setOpenModal(false)
    setTimeout(() => {
      methods.setFocus('input')
    }, 100)
  }

  return (
    <div className="flex h-auto w-full flex-col items-center">
      <section className="relative flex w-full items-center justify-center bg-cover bg-center filter sm:h-[40rem] lg:h-[62rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover filter dark:saturate-[.8]"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/homepage_title_viedo_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative flex flex-col items-center justify-center gap-5">
          <p className="mt-10 font-bold text-white dark:text-gray-800 sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Search for plants you're curious about
          </p>
          <p className="text-white dark:text-gray-800 sm:text-2xl lg:text-3xl 2xl:text-3xl">
            There are about 100+ plants
          </p>
          <PlantSearchBar
            methods={methods}
            color="white"
            onSearchFail={modalOpen}
            currentPage="home"
          />
        </div>
      </section>
      <div className="my-12 flex w-full flex-col items-center sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
        <div className="mb-12 mt-16 flex w-full flex-col items-center">
          <h1 className="border-b-2 border-black pb-3 text-5xl dark:border-zinc-300 dark:text-slate-300">
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
      {openModal && <SearchNotFoundModal onClose={modalClose} />}
    </div>
  )
}

export default Homepage

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
      className={`scroll-trigger my-32 flex w-full flex-row items-center justify-center`}
    >
      {!isLeftAligned ? (
        <>
          <div
            id={id}
            className={`hidden-until-scroll flex w-1/2 flex-col sm:p-3 lg:p-10 2xl:p-24 ${
              isInView[id]
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="relative h-[52rem] overflow-hidden transition-transform duration-500 ease-out hover:scale-105">
              <Image
                src={imgSrc}
                alt=""
                aria-hidden="true"
                className="h-[52rem] overflow-hidden object-cover object-center dark:saturate-[.8]"
                layout="fill"
              />
            </div>
          </div>
          <div
            className={`hidden-until-scroll flex w-1/2 flex-col ${
              isInView[id]
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="sm:ml-8 sm:mt-8 lg:ml-12 lg:mt-12 xl:ml-16 xl:mt-16">
              <h2
                className="my-6 font-semibold leading-[1.2] text-zinc-800 dark:text-slate-300 sm:text-2xl lg:text-3xl xl:text-4xl"
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
                className="mt-20 inline-block w-auto rounded-full bg-black px-6 font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 sm:py-2 sm:text-lg lg:py-3 lg:text-xl"
              >
                {linkText}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`hidden-until-scroll flex w-1/2 flex-col ${
              isInView[id]
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="text-right sm:mr-8 sm:mt-8 lg:mr-12 lg:mt-12 xl:mr-16 xl:mt-16">
              <h2
                className="my-6 font-semibold leading-[1.2] text-zinc-800 dark:text-slate-300 sm:text-2xl lg:text-3xl xl:text-4xl"
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
                className="mt-20 inline-block rounded-full bg-black px-6 font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 sm:py-2 sm:text-lg lg:py-3 lg:text-xl"
              >
                {linkText}
              </Link>
            </div>
          </div>
          <div
            id={id}
            className={`hidden-until-scroll flex w-1/2 flex-col sm:p-3 lg:p-10 2xl:p-24 ${
              isInView[id]
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="relative h-[52rem] overflow-hidden transition-transform duration-500 ease-out hover:scale-105">
              <Image
                src={imgSrc}
                alt=""
                aria-hidden="true"
                className="overflow-hidden object-cover object-center filter dark:saturate-[.8]"
                layout="fill"
              />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
