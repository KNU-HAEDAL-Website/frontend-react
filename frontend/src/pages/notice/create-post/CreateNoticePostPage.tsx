import { CreateNoticePostForm, CreateNoticePostHero } from './_components'

export default function CreateNoticePostPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <CreateNoticePostHero />
      <CreateNoticePostForm />
    </div>
  )
}
