import { Avatar, AvatarImage } from '@/components/ui'
import { BASE_URL } from '@/service/config'
import { useMyInfoStore } from '@/store'

export const UserAvatar = () => {
  const { profileImage } = useMyInfoStore((state) => state.myInfo)

  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={`${BASE_URL}${profileImage}`} className="bg-white" />
    </Avatar>
  )
}
