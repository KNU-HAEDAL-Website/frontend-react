import { useLocation, useNavigate } from 'react-router'

import { TrashIcon } from '@radix-ui/react-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { NameLabel, NotFound } from '@/components/common'
import { Button, Separator } from '@/components/ui'
import { API_ERROR_MESSAGES } from '@/constant'
import { queryClient } from '@/lib/query-client'
import { ActivityBreadcrumb } from '@/pages/activity/components'
import { boardQueries, deleteBoardApi } from '@/service/api'
import { useMyInfoStore } from '@/store/myInfo'

type BoardHeroProps = {
  activityId: number
  boardId: number
}

export const BoardHero = ({ boardId, activityId }: BoardHeroProps) => {
  const { role } = useMyInfoStore((state) => state.myInfo)

  const { data: boardDetail, status } = useQuery(
    boardQueries.detail({ activityId, boardId }),
  )

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: deleteBoardApi,
    onSuccess: (data) => onSuccess(data.message),
    onError: () => toast.error(API_ERROR_MESSAGES.UNKNOWN_ERROR),
  })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSuccess = (message: string) => {
    toast.success(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: boardQueries.all() })

    const activityPath = pathname.split('/').slice(0, 4).join('/')
    navigate(activityPath)
  }

  if (status === 'pending') return <BoardHeroSkeleton />

  if (!boardDetail) return <NotFound />

  return (
    <div className="flex flex-col pt-10">
      <Separator variant="dark" />
      <ActivityBreadcrumb
        navLinks={[]}
        pageName={`${boardDetail.boardName} 게시판`}
      />
      <div className="flex flex-col gap-1 pl-1 text-primary">
        <div className="text-2xl font-semibold">{boardDetail.boardName}</div>
        <div className="flex flex-wrap gap-2">
          {boardDetail.participants?.map((user) => (
            <NameLabel key={user.participantId} name={user.userName} />
          ))}
        </div>
        <div className="py-3 text-primary/70">{boardDetail.boardIntro}</div>
      </div>
      {role === 'ROLE_ADMIN' && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => deleteBoard({ boardId, activityId })}
            disabled={isPending}
            className="mb-3 gap-1 px-2 text-primary/70"
          >
            <TrashIcon />
            <div>삭제하기</div>
          </Button>
        </div>
      )}
      <Separator variant="dark" />
    </div>
  )
}

export const BoardHeroSkeleton = () => {
  return (
    <div className="flex flex-col pt-10">
      <Separator variant="dark" />
      <div className="h-40"></div>
      <div className="h-0.5"></div>
      <Separator variant="dark" />
    </div>
  )
}
