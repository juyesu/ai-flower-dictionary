import Image from 'next/image'
import Link from 'next/link'
import BoxOpen from '@/pages/assets/icons/BoxOpen.svg'
import { AccordionSectionsProps } from '@/types/type'

const AccordionSections = ({
  hasPlantsData,
  accordionOpen,
  setAccordionOpen,
  plantAccordionData,
  data,
}: AccordionSectionsProps) => {
  return (
    <>
      <section className="mt-8 w-full mobile:px-1 sm:px-4">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, likedPlants: !prev.likedPlants }
            })
          }
          className={`flex w-full justify-between border border-l-4 border-l-fuchsia-200 px-6 py-4 font-semibold transition dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 ${
            accordionOpen.likedPlants ? '' : ''
          }`}
        >
          <span className="text-xl">
            내가 좋아요 누른 식물
            <span className="ml-2 text-zinc-400">
              {`(${plantAccordionData.myDictionary.length})`}
            </span>
          </span>
          <span className="text-2xl font-bold">
            {accordionOpen.likedPlants ? '-' : '+'}
          </span>
        </button>

        {accordionOpen.likedPlants &&
          (hasPlantsData.likedPlants ? (
            <div className="accordion_image_grid">
              {plantAccordionData.likedPlants.map((item) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="rounded-lg text-center hover:bg-zinc-300 dark:hover:bg-gray-500 mobile:p-1.5 sm:p-2">
                    <Image
                      src={item.imgUrl}
                      alt={`${item.krnm}식물`}
                      className="h-32 w-full rounded border-4 border-stone-400 object-cover dark:border-stone-500"
                      width={157}
                      height={128}
                      loading="lazy"
                    />
                    <figcaption className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                      {item.krnm}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 bg-stone-100 p-20">
              <BoxOpen
                className="h-10 w-10"
                fill="#a1a1aa"
                aria-hidden="true"
              />
              <p className="font-bold text-zinc-400">
                아직 좋아요를 누른 식물이 존재하지 않습니다.
              </p>
            </div>
          ))}
      </section>
      <section className="my-20 mt-8 w-full mobile:px-1 sm:px-4">
        <button
          onClick={() =>
            setAccordionOpen((prev) => {
              return { ...prev, myDictionary: !prev.myDictionary }
            })
          }
          className={`flex w-full justify-between border border-l-4 border-l-fuchsia-200 px-6 py-4 font-semibold transition dark:border-zinc-600 dark:border-l-gray-700 dark:text-slate-300 ${
            accordionOpen.myDictionary ? '' : ''
          }`}
        >
          <span className="text-xl">
            나의 식물도감
            <span className="ml-2 text-zinc-400">
              {`(${plantAccordionData.myDictionary.length}/${data?.response.response.body.totalCount})`}
            </span>
          </span>
          <span className="text-2xl font-bold">
            {accordionOpen.myDictionary ? '-' : '+'}
          </span>
        </button>

        {accordionOpen.myDictionary &&
          (hasPlantsData.myDictionary ? (
            <div className="accordion_image_grid">
              {plantAccordionData.myDictionary.map((item) => (
                <Link
                  key={item.krnm}
                  href={{
                    pathname: `/view/${item.krnm}`,
                    query: { prevPage: 'my-dictionary' },
                  }}
                  passHref
                  aria-label={`${item.krnm}상세 페이지로 이동`}
                >
                  <figure className="rounded-lg text-center hover:bg-zinc-300 dark:hover:bg-gray-500 mobile:p-1.5 sm:p-2">
                    <Image
                      src={item.imgUrl}
                      alt={`${item.imgUrl}의 이미지`}
                      className="h-32 w-full rounded border-4 border-stone-400 object-cover dark:border-stone-500"
                      width={157}
                      height={128}
                    />
                    <figcaption className="mt-2 text-sm text-gray-700 dark:text-slate-300">
                      {item.krnm}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 bg-stone-100 p-20">
              <BoxOpen
                className="h-10 w-10"
                fill="#a1a1aa"
                aria-hidden="true"
              />
              <p className="font-bold text-zinc-400">
                아직 발견한 식물이 존재하지 않습니다.
              </p>
            </div>
          ))}
      </section>
    </>
  )
}

export default AccordionSections
