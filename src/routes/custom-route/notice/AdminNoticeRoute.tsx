import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useMyInfoStore } from '@/store'

export const AdminNoticeRoute = () => {
  const navigate = useNavigate()
  const { role } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (role !== 'ROLE_ADMIN') {
      navigate(-1)
    }
  }, [role, navigate])

  return <Outlet />
}
