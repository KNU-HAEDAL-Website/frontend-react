import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui'
import { useAuthStore } from '@/store/auth'

import { ProfileDropdownMenu } from './dropdown-menu'

export const ProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)

  useEffect(() => {
    setIsLoggedIn(!!accessToken)
  }, [accessToken])

  if (!isLoggedIn) {
    return (
      <Link to="/auth/login">
        <Button
          variant="ghost"
          className="h-fit border-[1px] border-white py-1.5"
        >
          로그인
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex">
      <ProfileDropdownMenu />
    </div>
  )
}
