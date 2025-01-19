import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { kstFormat } from '@toss/date'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { CommentResponseDto } from '@/service/model'
import { useMyInfoStore } from '@/store'

interface CommentListItemProps {
  comment: CommentResponseDto
}

export const CommentListItem = ({ comment }: CommentListItemProps) => {
  const { userId } = useMyInfoStore((state) => state.myInfo)

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" className="bg-white" />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col pb-1">
            <div>{comment.userName}</div>
            <div className="text-xs text-primary/60">
              {kstFormat(new Date(comment.commentRegDate), 'yyyy.LL.dd')}
            </div>
          </div>
        </div>
        {comment.userId === userId && (
          <div className="flex flex-row gap-2 text-primary/70">
            <Pencil1Icon className="h-4 w-4 hover:cursor-pointer hover:text-primary" />
            <TrashIcon className="h-4 w-4 hover:cursor-pointer hover:text-primary" />
          </div>
        )}
      </div>
      <div className="px-1">{comment.commentContent}</div>
    </>
  )
}
