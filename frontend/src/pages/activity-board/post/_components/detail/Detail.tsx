import { useLocation, useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { DeletePostDialog } from '@/components/feature'
import { Button, Separator } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { activityPostQuries, deleteActivityPostApi } from '@/service/api'
import { PostWithBoardResponseDto } from '@/service/model'
import { useMyInfoStore } from '@/store/myInfo'

interface ActivityPostDetailProps {
  boardId: number
  post: PostWithBoardResponseDto
}

export const ActivityPostDetail = ({
  boardId,
  post,
}: ActivityPostDetailProps) => {
  const { userId } = useMyInfoStore((state) => state.myInfo)

  const { mutate: deleteActivityPost, isPending } = useMutation({
    mutationFn: deleteActivityPostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSuccess = (message?: string) => {
    toast.success(message, { duration: 2000 })

    queryClient.refetchQueries({
      queryKey: activityPostQuries.board(boardId),
    })

    const boardPath = pathname.split('/').slice(0, -2).join('/')
    navigate(boardPath)
  }

  return (
    <div className="flex flex-col gap-3 py-4 text-primary">
      <div className="pt-4 text-4xl font-semibold">{post.postTitle}</div>
      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          {userId === post.userId && (
            <div className="flex gap-2">
              <Button
                variant="link"
                onClick={() =>
                  navigate(`${pathname.split('/').join('/')}/edit`)
                }
                className="h-fit p-0 font-normal text-primary/70 hover:text-primary"
              >
                수정
              </Button>
              <DeletePostDialog
                onClick={() =>
                  deleteActivityPost({ boardId, postId: post.postId })
                }
                disabled={isPending}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{post.userName}</div>
          <div>·</div>
          <div className="text-primary/60">
            {format(new Date(post.postRegDate), 'yyyy-MM-dd')}
          </div>
          <div className="text-primary/60">조회 {post.postViews}</div>
        </div>
        <div className="flex">
          <div>활동일 {post.postActivityStartDate}</div>
          {post.postActivityEndDate && <div>~{post.postActivityEndDate}</div>}
        </div>
      </div>
      <Separator />
    </div>
  )
}
