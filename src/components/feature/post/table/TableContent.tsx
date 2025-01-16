import { Link, useLocation } from 'react-router'

import { flexRender, Table as tanskTable } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

interface TableContentProps<T> {
  table: tanskTable<T>
}

export function PostTableContent<T>({ table }: TableContentProps<T>) {
  const { pathname } = useLocation()
  const boardId = pathname[pathname.length - 1]

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="text-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                <Link to={`/boards/${boardId}/posts/${row.getValue('postId')}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
