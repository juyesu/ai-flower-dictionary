import { PlantDetailContentProps } from '@/types/type'
import Image from 'next/image'

const PlantDetailContent = ({ plantData }: PlantDetailContentProps) => {
  return (
    <figure className="flex w-full items-center justify-center mobile:flex-col mobile:px-2 lg:flex-row lg:px-0">
      {plantData?.imgUrl ? (
        <Image
          className="rounded-xl border dark:border-zinc-400 dark:saturate-[.8] lg:mx-16 lg:my-12 lg:w-1/2"
          src={plantData?.imgUrl}
          alt={`${plantData?.krnm}식물`}
          width={1200}
          height={900}
        />
      ) : (
        <div
          role="img"
          className="text-semibold flex h-96 w-96 items-center justify-center rounded-xl border bg-zinc-400 dark:border-zinc-400 dark:bg-zinc-600 lg:mx-16 lg:my-12 lg:w-1/2"
          aria-labelledby="image-error-text"
        >
          <span id="image-error-text">이미지 로드 중 오류가 발생했습니다</span>
        </div>
      )}
      <figcaption className="self-center justify-self-center text-[#797D48] dark:text-slate-300 mobile:my-8 mobile:px-2 mobile:text-center lg:my-0 lg:w-1/2 lg:px-8 lg:text-start">
        <dl>
          <div className="my-4 font-semibold mobile:text-2xl lg:text-3xl">
            <dt className="inline-block">색상:</dt>
            <dd className="ml-2 inline-block">{plantData?.flwrClorCn}</dd>
          </div>
          <div className="my-4 font-semibold mobile:text-2xl lg:text-3xl">
            <dt className="inline-block">개화시기:</dt>
            <dd className="ml-2 inline-block">{plantData?.bloomPeriodCn}</dd>
          </div>
          <div className="my-4 font-semibold">
            <dt className="inline-block mobile:text-2xl lg:text-3xl">특징:</dt>
            <dd className="inline-block text-xl">{plantData?.fturCn}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  )
}

export default PlantDetailContent
