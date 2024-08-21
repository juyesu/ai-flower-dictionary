import Link from 'next/link'
import styles from './../../styles/ItemList.module.css'
import Image from 'next/image'
import { PlantIndexItem } from '@/types/type'

type PlantIndexProps = {
  list: Array<PlantIndexItem>
}

const ItemList = ({ list }: PlantIndexProps) => {
  return (
    <div className="mx-16 my-28">
      <div>
        <h1 className={styles.index}>식물도감</h1>
        <h1 className="ml-1 mt-1.5 font-semibold text-rose-400 text-sm">
          한국수목원정원관리원에서 제공하는 백두대간의 정원 식물 정보입니다.
        </h1>
        <hr className="mt-6 border-rose-300" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {list.map((item: PlantIndexItem) => (
          <Link
            key={item.famlNm}
            href={{
              pathname: `/view/${item.famlNm}`,
              query: {
                imgUrl: item.imgUrl,
                krnm: item.krnm,
                famlNm: item.famlNm,
                fturCn: item.fturCn,
              },
            }}
          >
            <div className="mb-4 flex flex-col items-center w-full">
              <Image
                className="h-40 w-60"
                src={item.imgUrl}
                alt={item.krnm}
                width={500}
                height={300}
              />
              <h1 className="mt-1 font-bold text-rose-400/75">{item.krnm}</h1>
              <h1 className="font-normal text-rose-300/75">{item.famlNm}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ItemList
