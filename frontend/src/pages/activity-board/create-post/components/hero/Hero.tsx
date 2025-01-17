import { useLocation } from 'react-router'

import { NavLink } from '@/components/common'
import { Separator } from '@/components/ui'
import { ActivityBreadcrumb } from '@/pages/activity/components'

type CreateActivityPostHeroProps = {
  boardName: string
}

export const CreateActivityPostHero = ({
  boardName,
}: CreateActivityPostHeroProps) => {
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
      <ActivityBreadcrumb navLinks={navLinks} pageName="게시글 생성하기" />
      <Separator variant="dark" />
    </div>
  )
}
