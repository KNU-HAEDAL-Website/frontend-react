import { default as logo } from '@/assets/logo-dark.svg'

import { ChannelIcons } from './channel-icons'
import { FooterDetail } from './detail'

export const Footer = () => {
  return (
    <div className="relative flex w-full flex-col gap-8 px-8 py-6 md:px-12 md:py-8">
      <div className="flex w-full flex-col items-start gap-2">
        <img src={logo} alt="logo-dark" sizes="100vw" className="w-32" />
        <p className="text-sm font-semibold">
          경북대학교 IT대학 학술동아리 해달
        </p>
      </div>
      <FooterDetail />
      <p className="text-xs text-slate-500">
        © 2025 해달. All rights reserved.
      </p>
      <ChannelIcons />
    </div>
  )
}
