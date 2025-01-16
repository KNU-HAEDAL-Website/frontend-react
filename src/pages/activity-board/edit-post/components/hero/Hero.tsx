import { useLocation } from 'react-router'

import { NavLink } from '@/components/common'
import { Separator } from '@/components/ui'
import { ActivityBreadcrumb } from '@/pages/activity/components'

type EditActivityPostHeroProps = {
  boardName: string
}

export const EditActivityPostHero = ({
  boardName,
}: EditActivityPostHeroProps) => {
  const { pathname } = useLocation()

  const boardPath = pathname.split('/').slice(0, -1).join('/')

  const navLinks: NavLink[] = [
    {
      link: `${boardPath}`,
      name: `${boardName} 게시판`,
    },
  ]

  return (
    <div>
      <Separator variant="dark" />
      <ActivityBreadcrumb navLinks={navLinks} pageName="게시글 수정하기" />
      <Separator variant="dark" />
    </div>
  )
}
