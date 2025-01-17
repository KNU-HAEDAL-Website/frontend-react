import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { MemberTableContent } from './content'
import { MemberTableFilterSkeleton } from './filter/Filter'

interface MemberTableNoneProps<T> {
  message: string
  columns: ColumnDef<T>[]
}

export function MemberTableNone<T>({
  message,
  columns,
}: MemberTableNoneProps<T>) {
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
      <div className="flex justify-center pt-2 text-primary/70">{message}</div>
    </div>
  )
}
