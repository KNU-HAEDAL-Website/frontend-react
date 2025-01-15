'use client'

import { Link, useLocation } from 'react-router'

import { PersonIcon, RocketIcon } from '@radix-ui/react-icons'

import { Sidebar, SidebarItem } from '@/components/ui'

export const AdminSidebar = () => {
  const { pathname } = useLocation()

  return (
    <div>
      <Sidebar name="관리자 메뉴">
        <Link to="/admin/member">
          <SidebarItem
            icon={<PersonIcon className="h-5 w-5" />}
            text="멤버 관리"
            active={pathname === '/admin/member'}
          />
        </Link>
        <Link to={'/admin/semester'}>
          <SidebarItem
            icon={<RocketIcon className="h-5 w-5" />}
            text="학기&활동 관리"
            active={pathname === '/admin/semester'}
          />
        </Link>
      </Sidebar>
    </div>
  )
}
