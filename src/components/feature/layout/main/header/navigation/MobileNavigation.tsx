import { Link } from 'react-router'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'

import { navigationLinks } from './Navigation'

export const MobileNavigation = () => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon className="h-auto w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4">
        {navigationLinks.map((route) => (
          <DropdownMenuItem key={route.linkTo}>
            <Link to={route.linkTo}>{route.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
