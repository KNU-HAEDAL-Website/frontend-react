import { useLocation, useNavigate } from 'react-router'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'
import { Role } from '@/types'

export const CreatePostButton = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { role } = useMyInfoStore((state) => state.myInfo)

  return (
    <div className="mb-20 flex justify-end">
      <Button
        onClick={() => navigate(`${pathname}/create-post`)}
        disabled={!role?.includes(role as Role)}
        className="max-w-fit"
      >
        게시글 생성하기
      </Button>
    </div>
  )
}
