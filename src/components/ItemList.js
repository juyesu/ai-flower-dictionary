import Link from "next/link";
import styles from './../../styles/ItemList.module.css';

export default function ItemList({ list }) {

    return (
        <div className="mx-16 my-28">
            <div>
                <h1 className={styles.index}>식물도감</h1>
                <h1 className="ml-1 mt-1.5 font-semibold text-rose-400 text-sm">한국수목원정원관리원에서 제공하는 백두대간의 정원 식물 정보입니다.</h1>
                <hr className="mt-6 border-rose-300" />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
                {list.map(( item ) => (
                    <Link
                        key={item.famlNm}
                        href={{
                            pathname: `/view/${item.famlNm}`,
                            query: {
                                imgUrl: item.imgUrl,
                                krnm: item.krnm,
                                famlNm: item.famlNm,
                                fturCn : item.fturCn
                            }
                        }}
                    >
                        <div className="mb-4 flex flex-col items-center w-full">
                            <img className="h-40 w-60" src={item.imgUrl} alt={item.krnm} />
                            <h1 className="mt-1 font-bold text-rose-400/75">{item.krnm}</h1>
                            <h1 className="font-normal text-rose-300/75">{item.famlNm}</h1>
                        </div>
                    </Link>
                ))}
            </div>

            {/* top/bottom button */}
            {/* <div className="flex flex-col items-center fixed right-7 bottom-5 border rounded-xl">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="fill-slate-400 p-1.5 cursour-poiner border-b"
                    onClick={scrollToTop}
                    >
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="fill-slate-400 p-1.5 cursour-poiner h-9"
                    onClick={scrollToBottom}
                    >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div> */}
        </div>
    )
}