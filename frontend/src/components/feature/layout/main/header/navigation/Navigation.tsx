import { NavigationItem } from './NavigationItem'

export const Navigation = () => {
  return (
    <ul className="flex flex-row gap-10">
      {navigationLinks.map((route) => (
        <li key={route.linkTo}>
          <NavigationItem name={route.name} linkTo={route.linkTo} />
        </li>
      ))}
    </ul>
  )
}

export const navigationLinks = [
  {
    name: '활동',
    linkTo: '/activity',
  },
  {
    name: '공지',
    linkTo: '/notice',
  },
  {
    name: '멤버',
    linkTo: '/member',
  },
  {
    name: '모집',
    linkTo: '/recruit',
  },
] as const
