import { useParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'

import { NotFound, Spinner } from '@/components/common'
import { Separator, Skeleton } from '@/components/ui'
import { activityQueries, semesterQueries } from '@/service/api'
import { useMyInfoStore } from '@/store'

import {
  CreateBoardDetail,
  CreateBoardForm,
  CreateBoardHero,
} from './_components'

export default function CreateBoardPage() {
  const params = useParams()
  const { userName } = useMyInfoStore((state) => state.myInfo)

  const {
    data: semester,
    status: semesterStatus,
    error: semesterError,
  } = useQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )

  const {
    data: activity,
    status: activityStatus,
    error: activityError,
  } = useQuery(
    activityQueries.detail({
      semesterId: Number(params.semesterId),
      activityId: Number(params.activityId),
    }),
  )

  if (semesterStatus === 'pending' || activityStatus === 'pending') {
    return <CreateBoardSkeleton />
  }

  if (semesterError || activityError)
    return (
      <div className="w-full pt-10">
        <CreateBoardHero />
        <NotFound />
      </div>
    )

  return (
    <div className="w-full pt-10">
      <CreateBoardHero />
      <CreateBoardDetail
        semesterName={semester.semesterName}
        activityName={activity.activityName}
        userName={userName}
      />
      <CreateBoardForm activityId={activity.activityId} />
    </div>
  )
}

const CreateBoardSkeleton = () => {
  return (
    <div className="w-full pt-10">
      <div>
        <Separator variant="dark" />
        <Skeleton className="my-4 h-5 w-full" />
        <Separator variant="dark" />
      </div>
      <Spinner />
    </div>
  )
}
