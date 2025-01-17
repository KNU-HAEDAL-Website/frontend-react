import { useLocation } from 'react-router'

import { NavLink, PageBreadcrumb } from '@/components/common'

type ActivityBreadcrumbProps = {
  navLinks: NavLink[]
  pageName?: string
}

export const ActivityBreadcrumb = ({
  navLinks,
  pageName,
}: ActivityBreadcrumbProps) => {
  const { pathname } = useLocation()
  const activityPath = pathname.split('/').slice(0, 4).join('/')

  const activityNav: NavLink = {
    index: 0,
    link: activityPath,
    name: '활동',
  }
  const finalNavLinks: NavLink[] = navLinks.map((link, index) => ({
    ...link,
    index: index + 1,
  }))
  finalNavLinks.unshift(activityNav)

  return <PageBreadcrumb navLinks={finalNavLinks} pageName={pageName} />
}
