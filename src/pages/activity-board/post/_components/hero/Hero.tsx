import { useLocation } from 'react-router'

import { Separator } from '@/components/ui'
import { ActivityBreadcrumb } from '@/pages/activity/components'

interface ActivityPostHeroProps {
  boardName: string
}

export const ActivityPostHero = ({ boardName }: ActivityPostHeroProps) => {
  const { pathname } = useLocation()
  const basePath = pathname.split('/').slice(0, -2).join('/')

  const navLinks = [
    {
      link: `${basePath}`,
      name: `${boardName} 게시판`,
    },
  ]

  return (
    <div className="flex flex-col">
      <Separator variant="dark" />
      <ActivityBreadcrumb navLinks={navLinks} />
      <Separator variant="dark" />
    </div>
  )
}
