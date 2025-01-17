import { PageBreadcrumb } from '@/components/common'
import { Separator } from '@/components/ui/separator'

export const ActivityHero = () => {
  return (
    <div className="flex w-full flex-col">
      <Separator variant="dark" />
      <PageBreadcrumb navLinks={[]} pageName="활동" />
      <Separator variant="dark" />
    </div>
  )
}
