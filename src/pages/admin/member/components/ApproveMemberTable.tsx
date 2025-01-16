'use client'

import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { kstFormat } from '@toss/date'

import { NotFound } from '@/components/common'
import { AdminUserQuries } from '@/service/api'
import { AdminUserResponseDto } from '@/service/model'

import { ApproveMemberButton } from './approve-member-button'
import {
  MemberTable,
  MemberTableNone,
  MemberTableSkeleton,
} from './member-table'

export const ApproveMemberTable = () => {
  const {
    data: inActiveUsers,
    status,
    error,
  } = useQuery(AdminUserQuries.inactive())

  const approveMemberColumn: ColumnDef<AdminUserResponseDto>[] = [
    {
      header: '',
      id: 'id',
      cell: ({ row, table }) => (
        <div className="text-center">
          {table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}
        </div>
      ),
    },
    {
      accessorKey: 'userName',
      header: '이름',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('userName')}</div>
      ),
    },
    {
      accessorKey: 'studentNumber',
      header: '학번',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('studentNumber')}</div>
      ),
    },
    {
      accessorKey: 'regDate',
      header: '가입일',
      cell: ({ row }) => (
        <div className="text-center">
          {kstFormat(new Date(row.getValue('regDate')), 'yyyy.LL.dd')}
        </div>
      ),
    },
    {
      accessorKey: 'isAccepted',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <ApproveMemberButton userId={row.original.userId} />
          </div>
        )
      },
    },
  ]

  if (status === 'pending')
    return <MemberTableSkeleton columns={approveMemberColumn} />

  if (error) return <NotFound />

  if (!inActiveUsers.length)
    return (
      <MemberTableNone
        message="회원가입 신청이 없습니다."
        columns={approveMemberColumn}
      />
    )

  return <MemberTable data={inActiveUsers} columns={approveMemberColumn} />
}
