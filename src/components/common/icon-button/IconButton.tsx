import { ReactElement } from 'react'

import { cn } from '@/lib/utils'

interface IconButtonProps {
  icon: ReactElement
  onClick?: () => void
  className?: string
}

export const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={cn('h-auto w-fit cursor-pointer hover:opacity-80', className)}
    >
      {icon}
    </div>
  )
}
