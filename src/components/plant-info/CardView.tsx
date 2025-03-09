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
    <div className="mt-16 px-4 grid grid-cols-3 gap-y-24 w-full">
      {apiData &&
        apiData?.map((item: PlantIndexItem) => (
          <div className="mb-4 flex flex-col items-center w-full">
            <article className="flex flex-col shadow-custom-all rounded-xl bg-white">
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
                  className="h-[22rem] w-[25rem] object-cover rounded-t-xl"
                  src={item.imgUrl}
                  alt={`${item.krnm}식물`}
                  width={694}
                  height={521}
                />
                <div className="mx-6 mt-7 mb-4 flex flex-col gap-3">
                  <span className="self-start px-3 py-0.5 bg-cyan-500 bg-[#797D48] rounded-full font-semibold text-sm text-white">
                    {item.famlNm}
                  </span>
                  <p className="mx-1.5 mt-1 font-semibold text-[22px]">
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
                          className="w-6 h-6"
                          fill="#FF5C8D"
                          aria-hidden="true"
                        />
                      ) : (
                        <Unliked className="w-6 h-6" aria-hidden="true" />
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
                      <Share className="w-6 h-6" aria-hidden="true" />
                      {copyTooltipIndex === item.krnm && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm rounded py-1 px-3 transition-opacity duration-300 whitespace-nowrap">
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
