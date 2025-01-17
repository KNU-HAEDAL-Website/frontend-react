import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AdminUserQuries, approveUserApi, rejectUserApi } from '@/service/api'

type ApproveMemberButtonProps = {
  userId: string
}

export const ApproveMemberButton = ({ userId }: ApproveMemberButtonProps) => {
  const {
    mutate: approveUser,
    isPending: isPendingApprove,
    error: approveError,
  } = useMutation({
    mutationFn: approveUserApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const {
    mutate: rejectUser,
    isPending: isPendingReject,
    error: rejectError,
  } = useMutation({
    mutationFn: rejectUserApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  if (approveError) {
    throw approveError
  }

  if (rejectError) {
    throw rejectError
  }

  const onSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: AdminUserQuries.all() })

    toast.success(message, { duration: 2000 })
  }

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => approveUser({ userId })}
        disabled={isPendingApprove || isPendingReject}
        className="h-fit w-14 py-1.5"
      >
        수락
      </Button>
      <Button
        variant="secondary"
        onClick={() => rejectUser({ userId })}
        disabled={isPendingApprove || isPendingReject}
        className="h-fit w-14 py-1.5 hover:bg-primary/5"
      >
        거절
      </Button>
    </div>
  )
}
