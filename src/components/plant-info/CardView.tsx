import Unliked from '@/pages/assets/icons/Unliked.svg'
import Liked from '@/pages/assets/icons/Liked.svg'
import Share from '@/pages/assets/icons/Share.svg'
import Image from 'next/image'
import Link from 'next/link'
import { PlantIndexItem } from '@/types/type'
import { CardViewProps } from '@/types/type'

const CardView = ({
  apiData,
  likedPlants,
  copyTooltipIndex,
  handlePlantLike,
  handlePlantLinkShare,
}: CardViewProps) => {
  return (
    <div className="mt-16 grid w-full grid-cols-3 gap-y-24 px-4">
      {apiData &&
        apiData?.map((item: PlantIndexItem) => (
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
                  className="h-[22rem] w-[25rem] rounded-t-xl object-cover dark:saturate-[.8]"
                  src={item.imgUrl}
                  alt={`${item.krnm}식물`}
                  width={694}
                  height={521}
                />
                <div className="mx-6 mb-4 mt-7 flex flex-col gap-3">
                  <span className="self-start rounded-full bg-cyan-500 px-3 py-0.5 text-sm font-semibold text-white dark:bg-cyan-700 dark:text-slate-300">
                    {item.famlNm}
                  </span>
                  <p className="mx-1.5 mt-1 text-[22px] font-semibold dark:text-slate-300">
                    {item.krnm}
                  </p>
                  <div className="relative mt-4 flex flex-row justify-end gap-4">
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
                          className="h-6 w-6"
                          fill="#FF5C8D"
                          aria-hidden="true"
                        />
                      ) : (
                        <Unliked
                          className="h-6 w-6 text-zinc-800 dark:text-slate-300"
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
                        await handlePlantLinkShare(item.krnm)
                      }}
                      className="relative p-1"
                    >
                      <Share
                        className="h-6 w-6 text-zinc-800 dark:text-slate-300"
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
