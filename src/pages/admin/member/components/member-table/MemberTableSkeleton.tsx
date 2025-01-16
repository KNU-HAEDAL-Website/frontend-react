import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Skeleton } from '@/components/ui'

import { MemberTableContent } from './content'
import { MemberTableFilterSkeleton } from './filter/Filter'

interface MemberTableSkeletonProps<T> {
  columns: ColumnDef<T>[]
}

export function MemberTableSkeleton<T>({
  columns,
}: MemberTableSkeletonProps<T>) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-2 pb-20">
      <MemberTableFilterSkeleton />
      <MemberTableContent table={table} />
      <div className="flex flex-col gap-2">
        <Skeleton className="my-2 h-6 w-full" />
        <Skeleton className="my-2 h-6 w-full" />
        <Skeleton className="my-2 h-6 w-full" />
      </div>
    </div>
  )
}
