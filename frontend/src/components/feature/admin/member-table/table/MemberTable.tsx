import { useState } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { TableContent, TableFilter, TablePagination } from '@/components/common'

interface MemberTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
}

export function MemberTable<T>({ data, columns }: MemberTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination,
      columnFilters,
    },
  })

  const pageNumList = Array.from(
    { length: table.getPageCount() },
    (_, i) => i + 1,
  )

  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-2 pb-20">
      <TableFilter table={table} />
      <TableContent table={table} />
      <TablePagination table={table} pageNumList={pageNumList} />
    </div>
  )
}
