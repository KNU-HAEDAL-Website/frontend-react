import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { activityQueries, semesterQueries } from '@/service/api'

import { ActivityHero, ActivityList, SemesterList } from '../components'
import { ActivityBoardList, CreateBoardButton } from './components'

export default function ActivityPage() {
  const params = useParams()

  const { data: semesters } = useSuspenseQuery(semesterQueries.list())
  const { data: semester } = useSuspenseQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )

  const { data: activities } = useSuspenseQuery(
    activityQueries.list({ semesterId: Number(params.semesterId) }),
  )

  useSuspenseQuery(
    activityQueries.detail({
      semesterId: Number(params.semesterId),
      activityId: Number(params.activityId),
    }),
  )

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ActivityHero />
      <SemesterList semester={semester} semesters={semesters} />
      <div className="flex w-full flex-col items-center gap-6">
        <ActivityList
          activities={activities}
          activityId={Number(params.activityId)}
        />
        <ActivityBoardList activityId={Number(params.activityId)} />
        <div className="mb-20 flex w-full justify-end">
          <CreateBoardButton />
        </div>
      </div>
    </div>
  )
}
