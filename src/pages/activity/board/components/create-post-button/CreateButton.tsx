import { useNavigate } from 'react-router'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'
import { Role } from '@/types'

interface CreatePostButtonProps {
  boardId: number
}

export const CreatePostButton = ({ boardId }: CreatePostButtonProps) => {
  const navigate = useNavigate()

  const { role } = useMyInfoStore((state) => state.myInfo)

  return (
    <div className="mb-20 flex justify-end">
      <Button
        onClick={() => navigate(`/boards/${boardId}/create-post`)}
        disabled={!role?.includes(role as Role)}
        className="max-w-fit"
      >
        게시글 생성하기
      </Button>
    </div>
  )
}
