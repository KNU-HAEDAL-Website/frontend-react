import { HTMLAttributes } from 'react'
import { Link } from 'react-router'

import { default as logo } from '@/assets/logo.svg'

export const Logo = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Link to="/" className={className}>
      <img src={logo} alt="logo" sizes="100vw" className="h-full w-auto" />
    </Link>
  )
}
