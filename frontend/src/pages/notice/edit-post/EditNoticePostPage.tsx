import { Suspense } from 'react'
import { useParams } from 'react-router'

import { Spinner } from '@/components/common'

import { EditNoticePostForm, EditNoticePostHero } from './components'

export default function EditNoticePostPage() {
  const params = useParams()

  return (
    <div className="flex w-full flex-col gap-6 pb-10">
      <EditNoticePostHero />
      <Suspense fallback={<Spinner />}>
        <EditNoticePostForm postId={Number(params.postId)} />
      </Suspense>
    </div>
  )
}
