import { useLocation, useNavigate } from 'react-router'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

export const CreateBoardButton = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { role } = useMyInfoStore((state) => state.myInfo)

  return (
    <Button
      className="max-w-fit"
      onClick={() => navigate(`${pathname}/create-board`)}
      disabled={!(role === 'ROLE_ADMIN' || role === 'ROLE_TEAM_LEADER')}
    >
      게시판 생성하기
    </Button>
  )
}
