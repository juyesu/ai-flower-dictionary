import Unliked from '@/pages/assets/icons/Unliked.svg'
import Liked from '@/pages/assets/icons/Liked.svg'
import Share from '@/pages/assets/icons/Share.svg'
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { TableViewProps } from '@/types/type'
import { PlantTableType } from '@/types/type'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

const TableView = ({
  apiData,
  likedPlants,
  copyTooltipIndex,
  currentPage,
  handlePlantLike,
  handlePlantLinkShare,
}: TableViewProps) => {
  const tableData = useMemo(() => {
    return (
      apiData?.response.body.items.item.map((item: any, index: number) => ({
        number: (currentPage - 1) * 30 + index + 1,
        krnm: item.krnm,
        famlNm: item.famlNm,
        kornFamlNm: item.kornFamlNm,
        bloomPeriodCn: item.bloomPeriodCn,
        isLiked: (
          <div className="relative flex flex-row items-center justify-center gap-4">
            <button
              type="button"
              aria-label="이 식물이 좋아요"
              onClick={(e) => {
                e.preventDefault()
                handlePlantLike(item.krnm)
              }}
              className="p-1"
            >
              {likedPlants.includes(item.krnm) ? (
                <Liked className="w-6 h-6" fill="#FF5C8D" />
              ) : (
                <Unliked className="w-6 h-6" />
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
              <Share className="w-6 h-6" />
              {copyTooltipIndex === item.krnm && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm rounded py-1 px-3 transition-opacity duration-300 whitespace-nowrap">
                  링크가 복사되었습니다!
                </div>
              )}
            </button>
          </div>
        ),
      })) || []
    )
  }, [apiData, likedPlants, copyTooltipIndex])

  const [tableDataState, setTableDataState] = useState<PlantTableType[]>([
    ...tableData,
  ])

  useEffect(() => {
    setTableDataState([...tableData])
  }, [tableData])

  const columnHelper = createColumnHelper<PlantTableType>()
  const columns = [
    columnHelper.accessor('number', {
      header: '번호',
      size: 80,
    }),
    columnHelper.accessor('krnm', {
      header: '식물명',
      size: 380,
    }),
    columnHelper.accessor('famlNm', {
      header: '과명',
      size: 300,
    }),
    columnHelper.accessor('kornFamlNm', {
      header: '한글과명',
      size: 300,
    }),
    columnHelper.accessor('bloomPeriodCn', {
      header: '개화기간',
      size: 200,
    }),
    columnHelper.accessor('isLiked', {
      header: '',
      size: 140,
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable<PlantTableType>({
    data: tableDataState,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="mt-16 w-full rounded table-fixed">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <th
                key={header.id}
                className="px-5 py-3 bg-zinc-100"
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
            <tr key={row.id} className="hover:bg-zinc-300" onClick={() => {}}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-2 py-4 align-middle text-center cursor-pointer"
                >
                  <Link
                    key={rowData.famlNm}
                    href={{ pathname: `/view/${rowData.krnm}` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default TableView
