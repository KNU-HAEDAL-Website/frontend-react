import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { BoardNavigationButton, PostContent } from '@/components/feature'
import { NoticePostQuries } from '@/service/api'

import { NoticePostDetail, NoticePostHero } from './_components'

export default function NoticePostPage() {
  const params = useParams()

  const { data: post } = useSuspenseQuery(
    NoticePostQuries.detail({ postId: Number(params.postId) }),
  )

  return (
    <div className="w-full">
      <NoticePostHero />
      <NoticePostDetail post={post} />
      <PostContent content={post.postContent} />
      <BoardNavigationButton />
    </div>
  )
}
