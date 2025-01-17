import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { Logo } from '@/components/common'
import { useAuthStore } from '@/store/auth'

export const AuthRoute = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn())

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  if (isLoggedIn) return null

  return (
    <main className="flex h-fit min-h-screen flex-col items-center justify-center gap-4 bg-primary py-20">
      <Logo className="w-40 sm:w-52" />
      <Outlet />
    </main>
  )
}
