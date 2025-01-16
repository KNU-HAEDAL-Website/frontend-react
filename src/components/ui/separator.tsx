import { HTMLAttributes } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const separatorVariants = cva('border-none', {
  variants: {
    variant: {
      light: 'bg-input',
      dark: 'bg-primary/40',
    },
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    variant: 'light',
    orientation: 'horizontal',
  },
})

interface SeparatorProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

export const Separator = ({
  variant,
  orientation,
  className,
  ...props
}: SeparatorProps) => {
  return (
    <hr
      className={cn(separatorVariants({ variant, orientation, className }))}
      {...props}
    />
  )
}
