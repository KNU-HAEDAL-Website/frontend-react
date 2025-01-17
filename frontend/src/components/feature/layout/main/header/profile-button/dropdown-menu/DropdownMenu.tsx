import { Link } from 'react-router'

import { GearIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

import { UserAvatar } from '../user-avatar'
import { LogoutButton } from './logout-button'

export const ProfileDropdownMenu = () => {
  const { role } = useMyInfoStore((state) => state.myInfo)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4">
        {role === 'ROLE_ADMIN' && (
          <DropdownMenuItem>
            <Link to={'/admin/member'} className="flex items-center gap-2">
              <GearIcon />
              <div>관리자</div>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to={'/mypage'}>마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
