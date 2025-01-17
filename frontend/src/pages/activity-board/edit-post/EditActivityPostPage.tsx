import { useEffect } from 'react'
import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { NotFound } from '@/components/common'
import { ACCESS_ERROR_MESSAGE } from '@/constant'
import { activityPostQuries, boardQueries } from '@/service/api'
import { useMyInfoStore } from '@/store'

import { EditActivityPostForm, EditActivityPostHero } from './components'

export default function EditActivityPostPage() {
  const params = useParams()

  const { data: board } = useSuspenseQuery(
    boardQueries.detail({
      activityId: Number(params.activityId),
      boardId: Number(params.boardId),
    }),
  )

  const postIdParams = useParams()

  const { data: postInfo } = useSuspenseQuery(
    activityPostQuries.detail({
      boardId: Number(params.boardId),
      postId: Number(postIdParams.postId),
    }),
  )

  const { userId } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (postInfo?.userId !== userId) {
      throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)
    }
  }, [userId, postInfo])

  if (!board || !postInfo) return <NotFound />

  return (
    <div className="flex w-full flex-col gap-6 pb-10">
      <EditActivityPostHero boardName={board.boardName} />
      <EditActivityPostForm
        postInfo={postInfo}
        boardId={Number(params.boardId)}
      />
    </div>
  )
}
