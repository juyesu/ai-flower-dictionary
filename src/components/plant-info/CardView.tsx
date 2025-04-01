import Unliked from '@/pages/assets/icons/Unliked.svg'
import Liked from '@/pages/assets/icons/Liked.svg'
import Share from '@/pages/assets/icons/Share.svg'
import Image from 'next/image'
import Link from 'next/link'
import handlePlantLinkShare from '@/utils/handlePlantLinkShare'
import handlePlantLike from '@/utils/handlePlantLike'
import { PlantIndexItem } from '@/types/type'
import { CardViewProps } from '@/types/type'

const CardView = ({
  apiData,
  likedPlants,
  copyTooltipIndex,
  setCopyTooltipIndex,
}: CardViewProps) => {
  return (
    <div className="grid w-full mobile:mt-8 mobile:grid-cols-2 mobile:gap-y-8 mobile:px-1 sm:px-4 md:grid-cols-3 md:gap-y-24 lg:mt-16">
      {apiData &&
        apiData?.map((item: PlantIndexItem, index: number) => (
          <div className="mb-4 flex w-full flex-col items-center">
            <article className="flex flex-col rounded-xl bg-white shadow-custom-all hover:bg-sky-100 dark:bg-zinc-800">
              <Link
                key={item.famlNm}
                href={{
                  pathname: `/view/${item.krnm}`,
                  query: { prevPage: 'plant-info', sort: 'card' },
                }}
                passHref
                aria-label={`${item.krnm}상세 페이지로 이동`}
              >
                <Image
                  className="rounded-t-xl object-cover dark:saturate-[.8] mobile:h-32 mobile:w-44 sm:h-56 sm:w-64 md:h-52 md:w-60 lg:h-64 lg:w-80 xl:h-[22rem] xl:w-[25rem]"
                  src={item.imgUrl}
                  alt={`${item.krnm}식물`}
                  width={694}
                  height={521}
                  priority={index < 4}
                />
                <div className="flex flex-col mobile:mt-2 mobile:gap-1 mobile:px-1 mobile:pb-2 sm:mt-5 sm:gap-3 sm:px-4 sm:pb-4 lg:mt-7 lg:px-6">
                  <span className="self-start rounded-full bg-cyan-500 px-3 py-0.5 text-sm font-semibold text-white dark:bg-cyan-700 dark:text-slate-300 mobile:hidden sm:block">
                    {item.famlNm}
                  </span>
                  <p className="mx-1.5 mt-1 font-semibold dark:text-slate-300 mobile:text-center mobile:text-xl sm:text-start sm:text-[22px]">
                    {item.krnm}
                  </p>
                  <div className="relative flex flex-row gap-4 mobile:mt-1.5 mobile:justify-center sm:mt-4 sm:justify-end">
                    <button
                      type="button"
                      aria-label={
                        likedPlants.includes(item.krnm)
                          ? '좋아요 해제'
                          : '좋아요 추가'
                      }
                      onClick={(e) => {
                        e.preventDefault()
                        handlePlantLike(item.krnm)
                      }}
                      className="p-1"
                    >
                      {likedPlants.includes(item.krnm) ? (
                        <Liked
                          className="mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
                          fill="#FF5C8D"
                          aria-hidden="true"
                        />
                      ) : (
                        <Unliked
                          className="text-zinc-800 dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label="이 식물 페이지를 공유"
                      onClick={async (e) => {
                        e.preventDefault()
                        await handlePlantLinkShare(
                          item.krnm,
                          setCopyTooltipIndex
                        )
                      }}
                      className="relative p-1"
                    >
                      <Share
                        className="text-zinc-800 dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
                        fill="currentColor"
                        aria-hidden="true"
                      />
                      {copyTooltipIndex === item.krnm && (
                        <div className="absolute left-1/2 top-full mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black px-3 py-1 text-sm text-white transition-opacity duration-300 dark:bg-zinc-500 dark:text-slate-200">
                          링크가 복사되었습니다!
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        ))}
    </div>
  )
}

export default CardView
