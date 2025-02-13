import { Link, useLocation } from 'react-router'

import { cn } from '@/lib/utils'

interface NavigationItemProps {
  name: string
  linkTo: string
}

export const NavigationItem = ({ name, linkTo }: NavigationItemProps) => {
  const { pathname } = useLocation()

  const isActive =
    pathname.startsWith(`${linkTo}`) ||
    (pathname.startsWith('/boards') && linkTo === '/activity')

  return (
    <Link
      to={linkTo}
      className={cn(
        'pb-1 font-normal hover:text-slate-300',
        isActive && 'border-b font-medium',
      )}
    >
      {name}
    </Link>
  )
}
