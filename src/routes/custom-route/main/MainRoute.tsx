import { Outlet } from 'react-router'

import { MainLayout } from '@/components/feature/layout/main'

export const MainRoute = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
