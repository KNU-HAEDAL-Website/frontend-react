import { Navigate, Outlet } from 'react-router'

import { useAuthStore } from '@/store'

export const MyPageRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return accessToken ? <Outlet /> : <Navigate to="/" />
}
