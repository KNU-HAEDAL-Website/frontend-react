import { ReactNode } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui'

type LinkButtonProps = {
  children: ReactNode
  linkTo: string
}

export const LinkButton = ({ children, linkTo }: LinkButtonProps) => {
  return (
    <div className="flex w-fit justify-center">
      <Button variant="link">
        <Link to={linkTo} className="text-border hover:text-white">
          {children}
        </Link>
      </Button>
    </div>
  )
}
