import { Dispatch, SetStateAction } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AdminUserQuries, expelUserApi } from '@/service/api'

type ExpelMemberDialogFormProps = {
  userId: string
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const ExpelMemberDialogForm = ({
  userId,
  setDialogOpen,
}: ExpelMemberDialogFormProps) => {
  const {
    mutate: expelUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: expelUserApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  if (error) throw error

  const onSuccess = (message: string) => {
    queryClient.invalidateQueries({
      queryKey: AdminUserQuries.filter({ isActive: true }),
    })

    toast(message, { duration: 2000 })
  }

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={() => setDialogOpen(false)}>
        취소하기
      </Button>
      <Button onClick={() => expelUser({ userId })} disabled={isPending}>
        내보내기
      </Button>
    </div>
  )
}
