import PreviousPage from '@/pages/assets/icons/PreviousPage.svg'
import Link from 'next/link'
import Unliked from '@/pages/assets/icons/Unliked.svg'
import Liked from '@/pages/assets/icons/Liked.svg'
import useHandlePlantLike from '@/hooks/useHandlePlantLike'
import handlePlantLinkShare from '@/utils/handlePlantLinkShare'
import Share from '@/pages/assets/icons/Share.svg'
import { useState } from 'react'
import { PlantDetailTitleProps } from '@/types/type'

const PlantDetailTitle = ({
  plantData,
  likedPlants,
  setLikedPlants,
  krnm,
  prevPage,
  sort,
}: PlantDetailTitleProps) => {
  const [CopyTooltipIndex, setCopyTooltipIndex] = useState('')
  const { handlePlantLike } = useHandlePlantLike({
    likedPlants,
    setLikedPlants,
  })
  return (
    <div className="relative flex w-full flex-col items-center gap-5">
      <div className="relative mt-20 flex flex-col items-center">
        <Link
          href={{
            pathname: prevPage && prevPage !== 'home' ? `/${prevPage}` : '/',
            ...(sort ? { query: { sort } } : {}),
          }}
          aria-label="식물 도감 페이지로 이동"
          className="absolute top-6 flex items-center justify-center rounded-2xl border bg-white p-2 dark:border-gray-500 dark:bg-zinc-600 mobile:left-[-12px] lg:left-[-80px]"
          passHref
        >
          <PreviousPage
            className="h-6 w-6 text-gray-600 dark:text-slate-300"
            fill="currentColor"
            aria-hidden="true"
          />
        </Link>
        <h1 className="my-4 text-5xl font-bold text-[#797D48] dark:text-slate-300">
          {plantData?.krnm}
        </h1>
        <h2 className="my-1 text-3xl text-[#797D48] dark:text-slate-300">
          {plantData?.famlNm} / {plantData?.kornFamlNm}
        </h2>
      </div>
      <div className="flex w-full flex-row items-end justify-end">
        <div className="relative flex flex-row justify-end gap-4 mobile:mr-6 mobile:mt-2 lg:mr-16 lg:mt-4">
          <button
            type="button"
            aria-label={
              likedPlants.includes(plantData?.krnm ?? '')
                ? '좋아요 해제'
                : '좋아요 추가'
            }
            onClick={(e) => {
              e.preventDefault()
              if (plantData?.krnm) {
                handlePlantLike(plantData.krnm)
              }
            }}
            className="p-1"
          >
            {typeof krnm === 'string' && likedPlants.includes(krnm) ? (
              <Liked className="h-8 w-8" fill="#FF5C8D" aria-hidden="true" />
            ) : (
              <Unliked
                className="h-8 w-8 text-zinc-800 dark:text-slate-300"
                fill="currentColor"
                aria-hidden="true"
              />
            )}
          </button>
          <button
            type="button"
            aria-label="이 식물 페이지를 공유"
            onClick={(e) => {
              e.preventDefault()
              if (plantData?.krnm) {
                handlePlantLinkShare(plantData.krnm, setCopyTooltipIndex)
              }
            }}
            className="relative p-1"
          >
            <Share
              className="h-8 w-8 text-zinc-800 dark:text-slate-300"
              fill="currentColor"
              aria-hidden="true"
            />
            {CopyTooltipIndex === krnm && (
              <div className="absolute left-1/2 top-full mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black px-3 py-1 text-sm text-white transition-opacity duration-300">
                링크가 복사되었습니다!
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlantDetailTitle
