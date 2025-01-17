import { Content, Logo } from '@/components/common'

import { MobileNavigation, Navigation } from './navigation'
import { ProfileButton } from './profile-button'

export const Header = () => {
  return (
    <Content className="fixed z-40 h-16 w-full bg-primary text-white">
      <header className="flex w-full items-center justify-between gap-10 px-12">
        <Logo className="h-7" />
        {/* mobile mode */}
        <div className="flex items-center gap-4 md:hidden">
          <ProfileButton />
          <MobileNavigation />
        </div>
        {/* desktop mode */}
        <div className="hidden items-center gap-6 md:flex">
          <Navigation />
          <ProfileButton />
        </div>
      </header>
    </Content>
  )
}
