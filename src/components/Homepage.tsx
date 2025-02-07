import Link from 'next/link'
import styles from './../../styles/Homepage.module.css'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import useFadeInOnScroll from '../hooks/useFadeInOnScroll'
import useSectionScroll from '../hooks/useSectionScroll'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PreviewContentSectionProps } from '@/types/type'

const Homepage = () => {
  useSectionScroll()
  const { data, isLoading } = plantIndexFetchData()

  if (isLoading) return
  const randomItems = [...data?.response.body.items.item]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)

  return (
    <div className="flex flex-col items-center w-full h-auto">
      <section className="relative flex justify-center items-center w-full sm:h-[40rem] lg:h-[62rem] bg-center bg-cover filter">
        <video
          className="absolute w-full h-full inset-0 object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/homepage_title_viedo_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative flex flex-col justify-center items-center gap-5">
          <p className="mt-10 sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white">
            Search for plants you're curious about
          </p>
          <p className="sm:text-2xl lg:text-3xl 2xl:text-3xl text-white">
            There are about 1,000 plants
          </p>
          <form
            className="mt-12 relative flex items-center"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <label htmlFor="search_plant" className="sr-only">
              Search for Plants
            </label>
            <MagnifyingGlass
              className="mx-6 absolute z-10"
              width="22px"
              height="22px"
              fill="#787878"
            />
            <input
              id="search_plant"
              type="search"
              className="pl-16 py-2 sm:w-[40rem] lg:w-[48rem] h-[3.2rem] rounded-full opacity-80 text-xl font-bold"
            />
          </form>
          <div className="mt-2 mb-4 flex gap-6 text-white">
            {randomItems.map((item, index) => (
              <Link
                key={index}
                href={`/view/${item.krnm}`}
                className="underline"
              >
                #{item.krnm}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="my-12 flex flex-col items-center w-full sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
        <div className="mt-16 mb-12 flex flex-col items-center w-full">
          <h1 className="text-5xl pb-3 border-b-2 border-black">Features</h1>
        </div>
        {/* aiFlowerDetection */}
        {/* <section
          id="aiFlowerDetectionSection"
          className={`mt-16 mb-32 flex flex-row justify-center items-center w-full content-section ${
            styles['content-section']
          } ${
            activeSection === 'aiFlowerDetectionSection' ? styles.scale105 : ''
          }`}
        >
          <div
            id="aiFlowerDetection"
            className={`flex flex-col w-1/2 sm:p-3 lg:p-10 2xl:p-24 hidden-until-scroll ${
              isInView.aiFlowerDetection
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <img
              src="/images/webcam_title_image_2.jpg"
              className="h-[52rem] object-cover object-center hover:scale-105 overflow-hidden transition-transform duration-500 ease-out"
            />
          </div>
          <div
            className={`flex flex-col w-1/2 hidden-until-scroll ${
              isInView.aiFlowerDetection
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="sm:mt-8 lg:mt-12 xl:mt-16 sm:ml-8 lg:ml-12 xl:ml-16">
              <h2 className="my-6 sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-800 leading-[1.2]">
                WebCam AI 분석을 통해 <br /> 눈앞의 꽃을 판별
              </h2>
              <p className="sm:text-base lg:text-lg xl:text-xl font-normal text-zinc-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Rerum deserunt iste nulla sequi
              </p>
              <Link
                href="/ai-flower-detection"
                className="inline-block mt-20 px-6 sm:py-2 lg:py-3 sm:text-lg lg:text-xl font-semibold bg-black text-zinc-100 rounded-full"
              >
                Go to WebCam
              </Link>
            </div>
          </div>
        </section> */}
        <PreviewContentSection
          sectionTagId="aiFlowerDetectionSection"
          id="aiFlowerDetection"
          title="카메라, 이미지 파일 AI 분석을 통해 <br> 궁금한 식물을 알아보세요"
          description="인공지능으로 학습한 모델을 통해 <br> 식물의 종류를 식별하고, 꽃말과 피는 시기 등 정보를 출력해줍니다."
          linkHref="/ai-flower-detection"
          linkText="Go to WebCam"
          imgSrc="/images/webcam_title_image_2.jpg"
          isLeftAligned={false}
        />
        <hr className="w-1/4" />
        {/* PlantInfo */}
        {/* <section
          id="plantInfoSection"
          className={`my-32 flex flex-row justify-center items-center w-full content-section ${
            styles['content-section']
          } ${activeSection === 'plantInfoSection' ? styles.scale105 : ''}`}
        >
          <div
            id="plantInfo"
            className={`flex flex-col w-1/2 hidden-until-scroll ${
              isInView.plantInfo
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="sm:mt-8 lg:mt-12 xl:mt-16 sm:mr-8 lg:mr-12 xl:mr-16 text-right">
              <h2 className="my-6 sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-800 leading-[1.2]">
                한국수목원정원관리원에서 제공하는 <br /> 100종 이상의 식물들
              </h2>
              <p className="lg:text-lg xl:text-xl font-normal text-zinc-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Rerum deserunt iste nulla sequi
              </p>
              <Link
                href="/info"
                className="inline-block mt-20 px-6 sm:py-2 lg:py-3 sm:text-lg lg:text-xl font-semibold bg-black text-zinc-100 rounded-full"
              >
                Go to PlantInfo
              </Link>
            </div>
          </div>
          <div
            className={`flex flex-col w-1/2 sm:p-3 lg:p-10 2xl:p-24 hidden-until-scroll ${
              isInView.plantInfo
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <img
              src="/images/plantInfo_title_image_1.jpg"
              className="h-[52rem] object-cover object-center hover:scale-105 overflow-hidden transition-transform duration-500 ease-out"
            />
          </div>
        </section> */}
        <PreviewContentSection
          sectionTagId="plantInfoSection"
          id="plantInfo"
          title="한국수목원정원관리원에서 제공하는 <br> 100종 이상의 식물들을 확인해보세요"
          description="각양각색 식물들의 이미지와 구체적인 정보를 확인하고 <br> 다른 사람과 식물을 발견한 경험과 나만의 추억 등 의견을 나눠보세요."
          linkHref="/info"
          linkText="Go to PlantInfo"
          imgSrc="/images/plantInfo_title_image_1.jpg"
          isLeftAligned={true}
        />
        <hr className="w-1/4" />
        {/* My Dictionary */}
        {/* <section
          id="myDictionarySection"
          className={`my-32 flex flex-row justify-center items-center w-full content-section ${
            styles['content-section']
          } ${activeSection === 'myDictionarySection' ? styles.scale105 : ''}`}
        >
          <div
            id="myDictionary"
            className={`flex flex-col w-1/2 sm:p-3 lg:p-10 2xl:p-24 hidden-until-scroll ${
              isInView.myDictionary
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <img
              src="/images/mydictionary_title_image_2.jpg"
              className="h-[52rem] object-cover object-center hover:scale-105 overflow-hidden transition-transform duration-500 ease-out"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <div
              className={`sm:mt-8 lg:mt-12 xl:mt-16 sm:ml-8 lg:ml-12 xl:ml-16 hidden-until-scroll ${
                isInView.myDictionary
                  ? styles['fade-in-left']
                  : styles['hidden-until-scroll']
              }`}
            >
              <h2 className="my-6 sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-800 leading-[1.2]">
                내가 발견한 식물들로 <br /> 채워나가는 도감
              </h2>
              <p className="lg:text-lg xl:text-xl font-normal text-zinc-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                Rerum deserunt iste nulla sequi
              </p>
              <Link
                href="/dictionary"
                className="inline-block mt-20 px-6 sm:py-2 lg:py-3 sm:text-lg lg:text-xl font-semibold bg-black text-zinc-100 rounded-full"
              >
                Go to My Dictionary
              </Link>
            </div>
          </div>
        </section> */}
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
      className={`my-32 flex flex-row justify-center items-center w-full scroll-trigger`}
    >
      {!isLeftAligned ? (
        <>
          <div
            id={id}
            className={`flex flex-col w-1/2 sm:p-3 lg:p-10 2xl:p-24 hidden-until-scroll ${
              isInView[id]
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <img
              src={imgSrc}
              className="h-[52rem] object-cover object-center hover:scale-105 overflow-hidden transition-transform duration-500 ease-out"
            />
          </div>
          <div
            className={`flex flex-col w-1/2 hidden-until-scroll ${
              isInView[id]
                ? styles['fade-in-left']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="sm:mt-8 lg:mt-12 xl:mt-16 sm:ml-8 lg:ml-12 xl:ml-16">
              <h2
                className="my-6 sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-800 leading-[1.2]"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(title),
                }}
              />
              <p
                className="lg:text-lg xl:text-xl font-normal text-zinc-800"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(description),
                }}
              />
              <Link
                href={linkHref}
                className="inline-block mt-20 px-6 sm:py-2 lg:py-3 w-auto sm:text-lg lg:text-xl font-semibold bg-black text-zinc-100 rounded-full"
              >
                {linkText}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col w-1/2 hidden-until-scroll ${
              isInView[id]
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <div className="sm:mt-8 lg:mt-12 xl:mt-16 sm:mr-8 lg:mr-12 xl:mr-16 text-right">
              <h2
                className="my-6 sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-zinc-800 leading-[1.2]"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(title),
                }}
              />
              <p
                className="lg:text-lg xl:text-xl font-normal text-zinc-800"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithLineBreaks(description),
                }}
              />
              <Link
                href={linkHref}
                className="inline-block mt-20 px-6 sm:py-2 lg:py-3 sm:text-lg lg:text-xl font-semibold bg-black text-zinc-100 rounded-full"
              >
                {linkText}
              </Link>
            </div>
          </div>
          <div
            id={id}
            className={`flex flex-col w-1/2 sm:p-3 lg:p-10 2xl:p-24 hidden-until-scroll ${
              isInView[id]
                ? styles['fade-in-right']
                : styles['hidden-until-scroll']
            }`}
          >
            <img
              src={imgSrc}
              className="h-[52rem] object-cover object-center hover:scale-105 overflow-hidden transition-transform duration-500 ease-out"
            />
          </div>
        </>
      )}
    </section>
  )
}
