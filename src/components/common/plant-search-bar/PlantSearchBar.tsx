import { PlantSearchBarProps } from '@/types/type'
import Link from 'next/link'
import { MagnifyingGlass, Close } from '@/pages/assets/icons'
import { useFormContext } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'

const PlantSearchBar = ({
  color,
  currentPage,
  searchInputFocus,
  searchInputBlur,
  searchKeyUp,
  isSearchInputFocus,
  currentAutoCompletePlantNames,
  selectedAutocompleteIndex,
  randomPlants,
  isMinSmScreen,
  isMinMobileScreen,
}: PlantSearchBarProps) => {
  const methods = useFormContext()

  return (
    <>
      <form
        className='relative flex-col items-center mobile:mt-8 sm:mt-12'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className='flex items-center'>
          <label htmlFor='search_plant' className='sr-only'>
            Search for Plants
          </label>
          <MagnifyingGlass
            className='absolute z-10 mobile:mx-4 mobile:h-5 mobile:w-5 sm:mx-6 sm:h-[1.4rem] sm:w-[1.4rem]'
            fill='#787878'
            aria-hidden='true'
          />
          <input
            {...methods.register('input')}
            id='search_plant'
            type='search'
            autoComplete='off'
            onFocus={searchInputFocus}
            onBlur={searchInputBlur}
            onChange={(e) => methods.setValue('input', e.target.value)}
            onKeyUp={searchKeyUp}
            className='rounded-full bg-white py-2 opacity-80 dark:bg-zinc-900 dark:text-slate-200 mobile:h-[2.8rem] mobile:w-[22rem] mobile:pl-12 mobile:text-lg mobile:font-semibold sm:h-[3.2rem] sm:w-[40rem] sm:pl-16 sm:text-xl sm:font-bold lg:w-[48rem]'
          />
          {methods.getValues('input') && (
            <button
              type='button'
              onClick={() => methods.setValue('input', '')}
              aria-label='검색어 초기화'
              className='absolute cursor-pointer mobile:right-4 sm:right-8'
            >
              <Close className='h-4 w-4' fill='#787878' aria-hidden='true' />
            </button>
          )}
        </div>
        {isSearchInputFocus && methods.watch('input') && (
          <ul className='absolute top-16 flex w-full flex-col rounded-3xl bg-white opacity-100 dark:bg-zinc-800'>
            {currentAutoCompletePlantNames.map((item, index, array) => {
              return (
                <Link
                  key={item}
                  href={{
                    pathname: '/view/plant-detail',
                    query: {
                      plantName: item,
                      prevPage: currentPage === 'home' ? '' : currentPage,
                    },
                  }}
                  passHref
                >
                  <li
                    tabIndex={0}
                    className={`cursor-pointer px-10 py-4 hover:bg-zinc-300 dark:text-slate-300 dark:hover:bg-zinc-700 ${
                      selectedAutocompleteIndex == index
                        ? 'bg-zinc-300 font-semibold dark:bg-zinc-700'
                        : ''
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
                    {reactStringReplace(item, methods.getValues('input'), (match) => (
                      <span>{match}</span>
                    ))}
                  </li>
                </Link>
              )
            })}
          </ul>
        )}
      </form>
      <div
        className={`mb-4 mt-2 flex mobile:gap-3 sm:gap-4 ${
          color == 'white' ? 'text-white' : 'text-zinc-800'
        }`}
      >
        {randomPlants ? (
          <>
            {isMinSmScreen
              ? randomPlants.map((item, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: '/view/plant-detail',
                      query: {
                        plantName: item.krnm,
                        prevPage: currentPage === 'home' ? 'home' : currentPage,
                      },
                    }}
                    className={`rounded-xl px-2 py-1 underline ${
                      color == 'white'
                        ? 'dark:text-zinc-900'
                        : 'dark:bg-zinc-900 dark:text-slate-400 dark:opacity-80'
                    }`}
                  >
                    #{item.krnm}
                  </Link>
                ))
              : isMinMobileScreen
                ? randomPlants.slice(0, 4).map((item, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: '/view/plant-detail',
                        query: {
                          plantName: item.krnm,
                          prevPage: currentPage === 'home' ? 'home' : currentPage,
                        },
                      }}
                      className={`rounded-xl px-1.5 py-1 text-sm underline ${
                        color == 'white'
                          ? 'dark:text-zinc-900'
                          : 'dark:bg-zinc-900 dark:text-slate-400 dark:opacity-80'
                      }`}
                    >
                      #{item.krnm}
                    </Link>
                  ))
                : null}
          </>
        ) : (
          <p>현재 오류가 발생하여 정보를 불러올 수 없습니다.</p>
        )}
      </div>
    </>
  )
}

export default PlantSearchBar
