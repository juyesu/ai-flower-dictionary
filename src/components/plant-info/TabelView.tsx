import { Unliked, Liked, Share } from '@/pages/assets/icons'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import handlePlantLinkShare from '@/utils/handlePlantLinkShare'
import useHandlePlantLike from '@/hooks/useHandlePlantLike'
import { TableViewProps } from '@/types/type'
import { PlantTableType } from '@/types/type'
import { useEffect, useMemo, useState } from 'react'
import router from 'next/router'

const TableView = ({
  viewPortWidth,
  apiData,
  likedPlants,
  setLikedPlants,
  activeTooltipKey,
  setActiveTooltipKey,
  currentPage,
}: TableViewProps) => {
  const { handlePlantLike } = useHandlePlantLike({
    likedPlants,
    setLikedPlants,
  })
  const tableData = useMemo(() => {
    return (
      (apiData &&
        apiData?.map((item: any, index: number) => ({
          number: (currentPage - 1) * 30 + index + 1,
          krnm: item.krnm,
          famlNm: item.famlNm,
          kornFamlNm: item.kornFamlNm,
          bloomPeriodCn: item.bloomPeriodCn,
          isLiked: (
            <div className="relative flex flex-row items-center justify-center mobile:gap-2 md:gap-4">
              <button
                type="button"
                aria-label={
                  likedPlants.includes(item.krnm)
                    ? '좋아요 해제'
                    : '좋아요 추가'
                }
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
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
                  e.stopPropagation()
                  await handlePlantLinkShare(item.krnm, setActiveTooltipKey)
                }}
                className="relative p-1"
              >
                <Share
                  className="text-zinc-800 dark:text-slate-300 mobile:h-5 mobile:w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  aria-hidden="true"
                />
                {activeTooltipKey === item.krnm && (
                  <div className="absolute left-1/2 top-full mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black px-3 py-1 text-sm text-white transition-opacity duration-300">
                    링크가 복사되었습니다!
                  </div>
                )}
              </button>
            </div>
          ),
        }))) ||
      []
    )
  }, [apiData, likedPlants, activeTooltipKey])

  const [tableDataState, setTableDataState] = useState<PlantTableType[]>([
    ...tableData,
  ])

  useEffect(() => {
    setTableDataState([...tableData])
  }, [tableData])

  const columnHelper = createColumnHelper<PlantTableType>()
  const columns = [
    ...(viewPortWidth.is1280To1535pxScreen || viewPortWidth.isAbove1536pxScreen
      ? [
          columnHelper.accessor('number', {
            header: '번호',
            size: 80,
          }),
        ]
      : []),
    columnHelper.accessor('krnm', {
      header: '식물명',
      size:
        viewPortWidth.isUnder767pxScreen || viewPortWidth.is768To1023pxScreen
          ? 80
          : viewPortWidth.is1024To1279pxScreen ||
              viewPortWidth.is1280To1535pxScreen
            ? 200
            : viewPortWidth.isAbove1536pxScreen
              ? 380
              : 0,
    }),
    ...(viewPortWidth.is1280To1535pxScreen || viewPortWidth.isAbove1536pxScreen
      ? [
          columnHelper.accessor('famlNm', {
            header: '과명',
            size: viewPortWidth.is1280To1535pxScreen
              ? 200
              : viewPortWidth.isAbove1536pxScreen
                ? 300
                : 0,
          }),
        ]
      : []),
    columnHelper.accessor('kornFamlNm', {
      header: '한글과명',
      size:
        viewPortWidth.isUnder767pxScreen || viewPortWidth.is768To1023pxScreen
          ? 80
          : viewPortWidth.is1024To1279pxScreen ||
              viewPortWidth.is1280To1535pxScreen
            ? 200
            : viewPortWidth.isAbove1536pxScreen
              ? 300
              : 0,
    }),
    ...(viewPortWidth.is1280To1535pxScreen || viewPortWidth.isAbove1536pxScreen
      ? [
          columnHelper.accessor('bloomPeriodCn', {
            header: '개화기간',
            size: viewPortWidth.is1280To1535pxScreen
              ? 120
              : viewPortWidth.isAbove1536pxScreen
                ? 200
                : 0,
          }),
        ]
      : []),
    columnHelper.accessor('isLiked', {
      header: '',
      size:
        viewPortWidth.isUnder767pxScreen || viewPortWidth.is768To1023pxScreen
          ? 40
          : viewPortWidth.is1024To1279pxScreen ||
              viewPortWidth.is1280To1535pxScreen
            ? 120
            : viewPortWidth.isAbove1536pxScreen
              ? 140
              : 0,
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable<PlantTableType>({
    data: tableDataState,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="mt-16 w-full table-fixed rounded text-zinc-900 dark:text-slate-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className="bg-zinc-100 px-5 py-3 dark:bg-zinc-600"
                style={{ width: columns[index].size || 'auto' }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          const rowData = row.original
          return (
            <tr
              key={row.id}
              className="cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              onClick={() => {
                router.push({
                  pathname: '/view/plant-detail',
                  query: {
                    plantName: rowData.krnm,
                    prevPage: 'plant-info',
                    sort: 'table',
                  },
                })
              }}
            >
              {row.getVisibleCells().map((cell) => {
                const isKrnmColumn = cell.column.id === 'krnm'
                return (
                  <td
                    key={cell.id}
                    className={`px-2 py-4 text-center align-middle ${isKrnmColumn ? 'font-semibold' : ''}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableView
