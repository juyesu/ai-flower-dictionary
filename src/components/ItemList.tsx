import Link from 'next/link'
import styles from './../../styles/ItemList.module.css'
import Image from 'next/image'
import { PlantIndexItem } from '@/types/type'
import { plantIndexFetchData } from '@/hooks/plantIndexFetchData'

const ItemList = () => {
  const { data, isLoading, error } = plantIndexFetchData()

  if (isLoading) return
  if (error) return <p>데이터 로딩 중 문제가 발생했습니다.</p>
  return (
    <div className="mx-16 my-28">
      <h1 className={styles.index}>식물도감</h1>
      <p className="ml-1 mt-1.5 font-semibold text-rose-400 text-sm">
        한국수목원정원관리원에서 제공하는 백두대간의 정원 식물 정보입니다.
      </p>
      <hr className="mt-6 border-rose-300" />

      <div className="mt-10 grid grid-cols-2 gap-4">
        {data &&
          data?.response.body.items.item.map((item: PlantIndexItem) => (
            <Link key={item.famlNm} href={{ pathname: `/view/${item.krnm}` }}>
              <div className="mb-4 flex flex-col items-center w-full">
                <Image
                  className="h-40 w-60"
                  src={item.imgUrl}
                  alt={item.krnm}
                  width={500}
                  height={300}
                />
                <p className="mt-1 font-bold text-rose-400/75">{item.krnm}</p>
                <p className="font-normal text-rose-300/75">{item.famlNm}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default ItemList
