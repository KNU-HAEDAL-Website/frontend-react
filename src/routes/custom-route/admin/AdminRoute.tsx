import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { AdminLayout } from '@/components/feature'
import { useMyInfoStore } from '@/store'

export const AdminRoute = () => {
  const navigate = useNavigate()
  const { role } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (!(role === 'ROLE_ADMIN')) {
      navigate('/', { replace: true })
    }
  }, [role, navigate])

  if (!role) return null

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
