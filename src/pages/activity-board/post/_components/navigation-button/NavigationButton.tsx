import { useLocation, useNavigate } from 'react-router'

import { ArrowRightIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui'

export const BoardNavigationButton = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const boardPath = pathname.split('/').slice(0, -2).join('/')

  return (
    <div className="flex justify-end pt-20">
      <Button onClick={() => navigate(boardPath)} variant="link">
        <div>게시판으로 이동하기</div>
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
