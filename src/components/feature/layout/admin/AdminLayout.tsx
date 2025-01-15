import { ReactNode } from 'react'

import { AdminSidebar } from './sidebar'

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-full min-h-screen w-full flex-1">
      <AdminSidebar />
      <div className="h-full w-full">{children}</div>
    </main>
  )
}
