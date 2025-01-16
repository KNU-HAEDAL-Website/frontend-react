import { Separator } from '@/components/ui'
import { ActivityBreadcrumb } from '@/pages/activity/components'

export const CreateBoardHero = () => {
  return (
    <div>
      <Separator variant="dark" />
      <ActivityBreadcrumb navLinks={[]} pageName="게시판 생성하기" />
      <Separator variant="dark" />
    </div>
  )
}
