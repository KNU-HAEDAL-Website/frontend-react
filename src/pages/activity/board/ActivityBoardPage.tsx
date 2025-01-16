import { useParams } from 'react-router'

import { ActivityPostListSection, BoardHero } from './components'
import { CreatePostButton } from './components/create-post-button'

export default function ActivityBoardPage() {
  const params = useParams()

  return (
    <div className="flex w-full flex-col gap-10">
      <BoardHero
        activityId={Number(params.activityId)}
        boardId={Number(params.boardId)}
      />
      <ActivityPostListSection boardId={Number(params.boardId)} />
      <CreatePostButton />
    </div>
  )
}
