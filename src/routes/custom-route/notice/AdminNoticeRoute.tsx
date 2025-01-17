import { Navigate, Outlet } from 'react-router'

import { useMyInfoStore } from '@/store'

export const AdminNoticeRoute = () => {
  const { role } = useMyInfoStore((state) => state.myInfo)

  return role === 'ROLE_ADMIN' ? <Outlet /> : <Navigate to="/notice" />
}
