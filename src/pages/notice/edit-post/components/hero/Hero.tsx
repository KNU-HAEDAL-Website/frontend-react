import { useLocation } from 'react-router'

import { NavLink, PageBreadcrumb } from '@/components/common'
import { Separator } from '@/components/ui'

export const EditNoticePostHero = () => {
  const { pathname } = useLocation()

  const boardPath = pathname.split('/').slice(0, -1).join('/')

  const navLinks: NavLink[] = [
    {
      index: 0,
      link: `${boardPath}`,
      name: '공지사항 게시판',
    },
  ]

  return (
    <div>
      <Separator variant="dark" />
      <PageBreadcrumb navLinks={navLinks} pageName="공지사항 수정하기" />
      <Separator variant="dark" />
    </div>
  )
}
