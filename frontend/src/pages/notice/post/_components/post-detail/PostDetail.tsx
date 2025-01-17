import { useLocation, useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { DeletePostDialog } from '@/components/feature'
import { Button, Separator } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { NoticePostQuries, deleteNoticePostApi } from '@/service/api'
import { BasePostResponseDto } from '@/service/model'
import { useMyInfoStore } from '@/store/myInfo'

interface NoticePostDetailProps {
  post: BasePostResponseDto
}

export const NoticePostDetail = ({ post }: NoticePostDetailProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { role } = useMyInfoStore((state) => state.myInfo)

  const { mutate: deleteNoticePost, isPending } = useMutation({
    mutationFn: deleteNoticePostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const onSuccess = (message?: string) => {
    toast(message, { duration: 2000 })

    queryClient.invalidateQueries({ queryKey: NoticePostQuries.all() })
    navigate('/notice')
  }

  return (
    <div className="flex flex-col gap-3 py-4 text-primary">
      <div className="py-4 text-2xl font-semibold">{post.postTitle}</div>
      <div className="flex justify-end">
        {role === 'ROLE_ADMIN' && (
          <div className="flex gap-2">
            <Button
              variant="link"
              onClick={() => navigate(`${pathname}/edit`)}
              className="h-fit p-0 font-normal text-primary/70 hover:text-primary"
            >
              수정
            </Button>
            <DeletePostDialog
              onClick={() => deleteNoticePost({ postId: post.postId })}
              disabled={isPending}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="font-semibold">{post.userName}</div>
        <div className="flex gap-2">
          <div className="text-primary/60">
            {format(new Date(post.postRegDate), 'yyyy-MM-dd')}
          </div>
          <div className="text-primary/60">조회 {post.postViews}</div>
        </div>
      </div>
      <Separator />
    </div>
  )
}
