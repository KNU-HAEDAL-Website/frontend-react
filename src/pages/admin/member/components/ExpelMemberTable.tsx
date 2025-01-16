'use client'

import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { NotFound } from '@/components/common'
import { AdminUserQuries } from '@/service/api'
import { UserResponseDto } from '@/service/model'
import { convertRoleName } from '@/utils'

import { ExpelMemberDialog } from './expel-member-dialog'
import {
  MemberTable,
  MemberTableNone,
  MemberTableSkeleton,
} from './member-table'

export const ExpelMemberTable = () => {
  const {
    data: activeUsers,
    status,
    error,
  } = useQuery(AdminUserQuries.active())

  const expelMemberColumn: ColumnDef<UserResponseDto>[] = [
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
      accessorKey: 'role',
      header: '등급',
      cell: ({ row }) => (
        <div className="text-center">
          {convertRoleName(row.getValue('role'))}
        </div>
      ),
    },
    {
      accessorKey: 'isBanned',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <ExpelMemberDialog user={row.original} />
          </div>
        )
      },
    },
  ]

  if (status === 'pending')
    return <MemberTableSkeleton columns={expelMemberColumn} />

  if (error) return <NotFound />

  if (!activeUsers.length) {
    return (
      <MemberTableNone message="회원이 없습니다." columns={expelMemberColumn} />
    )
  }

  return <MemberTable data={activeUsers} columns={expelMemberColumn} />
}
