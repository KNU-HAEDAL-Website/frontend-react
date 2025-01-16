import { ComponentType } from 'react'
import { Link } from 'react-router'

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons'
import { IconProps } from '@radix-ui/react-icons/dist/types'

type Channel = {
  id: number
  name: string
  linkTo: string
  icon: ComponentType<IconProps>
}

export const ChannelIcons = () => {
  return (
    <div className="bottom-8 right-12 flex gap-4 sm:absolute">
      {channels.map((channel) => (
        <Link to={channel.linkTo} key={channel.id}>
          <channel.icon className="h-6 w-6" />
        </Link>
      ))}
    </div>
  )
}

const channels: Channel[] = [
  {
    id: 0,
    name: 'HAEDAL Email',
    linkTo: 'mailto:knu.haedal@gmail.com',
    icon: EnvelopeClosedIcon,
  },
  {
    id: 1,
    name: 'HAEDAL GitHub',
    linkTo: 'https://github.com/KNU-HAEDAL',
    icon: GitHubLogoIcon,
  },
  {
    id: 2,
    name: 'HAEDAL Instagram',
    linkTo: 'https://www.instagram.com/knu.haedal/',
    icon: InstagramLogoIcon,
  },
]
