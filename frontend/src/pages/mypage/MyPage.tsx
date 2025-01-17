import { useSuspenseQuery } from '@tanstack/react-query'

import { profileQuries } from '@/service/api'
import { useMyInfoStore } from '@/store'

import { UserInfoSection, UserSocialInfoSection } from './_components'

export default function MyPage() {
  const { userId } = useMyInfoStore((state) => state.myInfo)

  const { data: profile } = useSuspenseQuery(
    profileQuries.profile({ userId: userId }),
  )

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <UserInfoSection profile={profile} userId={userId} />
      <UserSocialInfoSection profile={profile} userId={userId} />
    </div>
  )
}
