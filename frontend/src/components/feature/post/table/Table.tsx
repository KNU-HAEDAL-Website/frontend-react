import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  BasePostSummaryResponseDto,
  PostWithBoardSummaryResponseDto,
} from '@/service/model'

import { PostTableContent } from './TableContent'

type PostTableProps = {
  posts: BasePostSummaryResponseDto[] | PostWithBoardSummaryResponseDto[]
  pageNumber: number
  pageSize: number
}

export const PostTable = ({ posts, pageNumber, pageSize }: PostTableProps) => {
  const columns: ColumnDef<
    BasePostSummaryResponseDto | PostWithBoardSummaryResponseDto
  >[] = [
    {
      header: '번호',
      accessorKey: 'postId',
      cell: ({ row, table }) => (
        <div className="text-center">
          {pageNumber * pageSize +
            table?.getSortedRowModel()?.flatRows?.indexOf(row) +
            1}
        </div>
      ),
    },
    {
      accessorKey: 'postTitle',
      header: '제목',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('postTitle')}</div>
      ),
    },
    {
      accessorKey: 'userName',
      header: '작성자',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('userName')}</div>
      ),
    },
    {
      accessorKey: 'postCreateDate',
      header: '작성일',
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue('postCreateDate')}</div>
        )
      },
    },
    {
      accessorKey: 'postViews',
      header: '조회수',
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue('postViews')}</div>
      },
    },
  ]

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <PostTableContent table={table} />
}
