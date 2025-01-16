import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { activityQueries, semesterQueries } from '@/service/api'

import { ActivityHero, SemesterList } from '../components'
import { ActivityRedirectSection } from './components'

export default function ActivityRedirectPage() {
  const params = useParams()

  const { data: semesters } = useSuspenseQuery(semesterQueries.list())
  const { data: semester } = useSuspenseQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )

  const { data: activities } = useSuspenseQuery(
    activityQueries.list({ semesterId: Number(params.semesterId) }),
  )

  if (!activities.length) {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <ActivityHero />
        <SemesterList semester={semester} semesters={semesters} />
        <div>활동이 없습니다.</div>
      </div>
    )
  }

  return (
    <ActivityRedirectSection
      activities={activities}
      semester={semester}
      semesters={semesters}
    />
  )
}
