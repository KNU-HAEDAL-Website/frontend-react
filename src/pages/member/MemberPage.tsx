import { IntersectionObserverLoader } from '@/components/common'
import { useProfileSuspensePaging } from '@/service/api'
import { Role } from '@/types'

import { MemberCard } from './components'

export default function MemberPage() {
  const roles: Role[] = ['ROLE_ADMIN', 'ROLE_MEMBER', 'ROLE_TEAM_LEADER']

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useProfileSuspensePaging({ roles })

  const profiles = data?.pages.flatMap((page) => page.profiles)

  return (
    <main className="flex h-full w-full flex-col items-center pb-20">
      <div className="text-xl font-semibold">2024-2 멤버</div>
      <div className="text-md text-primary/60">
        해달과 {profiles?.length}명의 부원들이 함께 하고 있어요
      </div>
      <div className="grid w-full max-w-[320px] grid-cols-2 place-items-center gap-6 pt-10 sm:max-w-[520px] sm:grid-cols-3 md:max-w-[680px] lg:max-w-[920px] lg:grid-cols-4">
        {profiles?.map((user) => {
          return (
            <MemberCard
              key={user.userId}
              userName={user.userName}
              userImageUrl={user.profileImageUrl}
              userDetail={user.profileIntro}
              githubId={user.githubAccount}
              instagramId={user.instaAccount}
            />
          )
        })}
      </div>
      {hasNextPage && (
        <IntersectionObserverLoader
          callback={() => {
            if (!isFetchingNextPage) {
              fetchNextPage()
            }
          }}
        />
      )}
    </main>
  )
}
