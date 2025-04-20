import PlantSearchBarContainer from '@/components/common/plant-search-bar'
import { IndexProps } from '@/types/type'

const HeroSection = ({ staticIndexList, staticKrnmList }: IndexProps) => {
  return (
    <section className='relative flex w-full items-center justify-center bg-cover bg-center filter mobile:h-[30rem] sm:h-[40rem] lg:h-[62rem]'>
      <div className='relative z-20 flex flex-col items-center justify-center mobile:gap-1.5 sm:gap-5'>
        <p className='mt-10 text-center font-bold text-white dark:text-gray-800 mobile:text-xl sm:text-4xl lg:text-5xl 2xl:text-6xl'>
          Search for plants you're curious about
        </p>
        <p className='text-white dark:text-gray-800 mobile:text-lg sm:text-2xl lg:text-3xl 2xl:text-3xl'>
          There are about 100+ plants
        </p>
        <PlantSearchBarContainer
          color='white'
          currentPage='home'
          staticIndexList={staticIndexList}
          staticKrnmList={staticKrnmList}
        />
      </div>
      <video
        className='absolute inset-0 z-0 h-full w-full object-cover filter dark:saturate-[.8]'
        poster='/images/homepage_title_viedo_poster.webp'
        autoPlay
        muted
        playsInline
        preload='metadata'
        data-fetchpriority='low'
      >
        <source src='/videos/homepage_title_viedo_1.mp4' type='video/mp4' />
        <source src='/videos/homepage_title_viedo_1.webm' type='video/webm' />
      </video>
      <div className='absolute inset-0 z-10 bg-black opacity-30' />
    </section>
  )
}

export default HeroSection
