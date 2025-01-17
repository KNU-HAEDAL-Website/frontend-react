import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

export const CreateNoticePostButton = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { role } = useMyInfoStore((state) => state.myInfo)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!(role === 'ROLE_ADMIN'))
  }, [role])

  if (disabled) return null

  return (
    <Button
      onClick={() => navigate(`${pathname}/create-post`)}
      disabled={disabled}
    >
      공지사항 작성하기
    </Button>
  )
}
