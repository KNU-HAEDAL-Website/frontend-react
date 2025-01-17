import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { NotFound } from '@/components/common'
import { BoardNavigationButton, PostContent } from '@/components/feature'
import { activityPostQuries, boardQueries } from '@/service/api'

import { ActivityPostDetail, ActivityPostHero } from './_components'

export default function ActivityPostPage() {
  const params = useParams()

  const { data: board } = useSuspenseQuery(
    boardQueries.detail({
      activityId: Number(params.activityId),
      boardId: Number(params.boardId),
    }),
  )

  const { data: post } = useSuspenseQuery(
    activityPostQuries.detail({
      boardId: Number(params.boardId),
      postId: Number(params.postId),
    }),
  )

  if (!post) return <NotFound />

  return (
    <div className="flex w-full flex-col">
      <ActivityPostHero boardName={board.boardName} />
      <ActivityPostDetail boardId={Number(params.boardId)} post={post} />
      <PostContent content={post.postContent} />
      <BoardNavigationButton />
    </div>
  )
}
