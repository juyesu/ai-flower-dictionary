import Link from 'next/link'
import styles from './../../styles/Homepage.module.css'
import MagnifyingGlass from '@/pages/assets/icons/MagnifyingGlass.svg'
import Close from '@/pages/assets/icons/Close.svg'
import useFadeInOnScroll from '../hooks/useFadeInOnScroll'
import useSectionScroll from '../hooks/useSectionScroll'
import reactStringReplace from 'react-string-replace'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'
import { PreviewContentSectionProps } from '@/types/type'
import { PlantIndexItem } from '@/types/type'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const Homepage = () => {
  useSectionScroll()
  const methods = useForm()
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const { data, isLoading } = plantIndexFetchData()
  const [randomItems, setRandomItems] = useState<PlantIndexItem[]>([])
  const [autocompletePlantName, setAutocompletePlantName] = useState<string[]>(
    []
  )
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] = useState(-1)
  const [currentAutocompletePlantName, setCurrentAutocompletePlantName] =
    useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setRandomItems(
        [...(data?.response?.body?.items?.item || [])]
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
      )
      const mappedPlantName = data?.response?.body?.items?.item.map(
        (item: PlantIndexItem, index: number) =>
          (autocompletePlantName[index] = item.krnm)
      )
      setAutocompletePlantName(mappedPlantName)
    }
  }, [data])

  useEffect(() => {
    const filteredItems = autocompletePlantName
      .filter((el) => el.includes(methods.getValues('input')))
      .slice(0, 7)

    setCurrentAutocompletePlantName(filteredItems)
  }, [methods.watch('input'), autocompletePlantName])

  const searchKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchInputValue = methods.getValues('input')
    const filteredList = autocompletePlantName.filter((el) =>
      el.includes(searchInputValue)
    )
    if (e.key === 'Enter') {
      if (selectedAutocompleteIndex != -1) {
        methods.setValue(
          'input',
          currentAutocompletePlantName[selectedAutocompleteIndex]
        )
      } else {
        if (
          data?.response?.body?.items?.item?.some(
            (item: PlantIndexItem) => item.krnm == searchInputValue
          )
        ) {
          router.push(`view/${searchInputValue}`)
        } else {
          // 현재 alert 출력 후 input focus 해제되는 문제 발생. 추후에 modal 또는 toast popup으로 대체
          alert('일치하는 이름의 식물이 존재하지 않습니다.')
        }
      }
      setSelectedAutocompleteIndex(-1)
    }

    if (e.key === 'ArrowUp') {
      setSelectedAutocompleteIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      )
    } else if (e.key === 'ArrowDown') {
      setSelectedAutocompleteIndex((prevIndex) =>
        prevIndex < filteredList.length - 1 ? prevIndex + 1 : prevIndex
      )
    }
  }

  if (isLoading) return

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
            className="mt-12 relative flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="flex items-center">
              <label htmlFor="search_plant" className="sr-only">
                Search for Plants
              </label>
              <MagnifyingGlass
                className="mx-6 absolute z-10"
                width="22px"
                height="22px"
                fill="#787878"
                aria-hidden="true"
              />
              <input
                {...methods.register('input')}
                id="search_plant"
                type="search"
                onFocus={(e) => {
                  setIsSearchFocus(true)
                  setSelectedAutocompleteIndex(-1)
                }}
                onBlur={(e) => {
                  setTimeout(() => {
                    if (!e.relatedTarget?.closest('ul')) {
                      setIsSearchFocus(false)
                    }
                  }, 100)
                }}
                onChange={(e) => methods.setValue('input', e.target.value)}
                onKeyUp={searchKeyUp}
                className="pl-16 py-2 sm:w-[40rem] lg:w-[48rem] h-[3.2rem] rounded-full opacity-80 text-xl font-bold"
              />
              {methods.getValues('input') && (
                <button
                  type="button"
                  onClick={() => methods.setValue('input', '')}
                  aria-label="검색어 초기화"
                  className="absolute right-8 cursor-pointer"
                >
                  <Close width="16px" height="16px" fill="#787878" />
                </button>
              )}
            </div>
            {isSearchFocus && methods.watch('input') && (
              <ul className="absolute top-16 flex flex-col w-full bg-white opacity-80 rounded-3xl">
                {currentAutocompletePlantName.map((item, index, array) => {
                  return (
                    <li
                      tabIndex={0}
                      onClick={() => {
                        methods.setValue('input', item)
                      }}
                      className={`px-10 py-4 hover:bg-zinc-300 ${
                        selectedAutocompleteIndex == index ? 'bg-zinc-300' : ''
                      } ${
                        index === 0 && array.length === 1
                          ? 'rounded-3xl'
                          : index === 0
                          ? 'rounded-t-3xl'
                          : index === array.length - 1
                          ? 'rounded-b-3xl'
                          : ''
                      }`}
                    >
                      {reactStringReplace(
                        item,
                        methods.getValues('input'),
                        (match) => (
                          <span>{match}</span>
                        )
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </form>
          <div className="mt-2 mb-4 flex gap-6 text-white">
            {randomItems ? (
              <>
                {randomItems.map((item, index) => (
                  <Link
                    key={index}
                    href={`/view/${item.krnm}`}
                    className="underline"
                  >
                    #{item.krnm}
                  </Link>
                ))}
              </>
            ) : (
              <p>현재 오류가 발생하여 정보를 불러올 수 없습니다.</p>
            )}
          </div>
        </div>
      </section>
      <div className="my-12 flex flex-col items-center w-full sm:px-2 xl:px-8 2xl:px-16 min-[1920px]:px-[32rem]">
        <div className="mt-16 mb-12 flex flex-col items-center w-full">
          <h1 className="text-5xl pb-3 border-b-2 border-black">Features</h1>
        </div>
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
