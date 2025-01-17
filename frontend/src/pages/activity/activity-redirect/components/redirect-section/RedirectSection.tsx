import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import {
  ActivityHero,
  ActivityListSkeleton,
  SemesterList,
} from '@/pages/activity/components'
import { ActivityResponseDto } from '@/service/model'
import { Semester } from '@/types'

interface ActivityRedirectProps {
  activities: ActivityResponseDto[]
  semesters: Semester[]
  semester: Semester
}

export const ActivityRedirectSection = ({
  activities,
  semester,
  semesters,
}: ActivityRedirectProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const lastActivity = activities[activities.length - 1]
    navigate(`/activity/${lastActivity.semesterId}/${lastActivity.activityId}`)
  }, [navigate, activities])

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ActivityHero />
      <SemesterList semester={semester} semesters={semesters} />
      <ActivityListSkeleton />
    </div>
  )
}
