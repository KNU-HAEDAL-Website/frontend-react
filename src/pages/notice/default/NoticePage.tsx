import {
  CreateNoticePostButton,
  NoticeBoardHero,
  NoticePostListSection,
} from './components'

export default function NoticePage() {
  return (
    <div className="flex w-full flex-col gap-10">
      <NoticeBoardHero />
      <NoticePostListSection />
      <div className="flex w-full justify-end">
        <CreateNoticePostButton />
      </div>
    </div>
  )
}
