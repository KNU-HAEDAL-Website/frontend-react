'use client'

import { useEffect } from 'react'

import { activityQueries } from '@/servicetest/api/activity'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

import { ActivitySkeleton } from '@/components/feature'
import { Semester } from '@/types/activity'

type RedirectActivityProps = {
  semester: Semester
}

export const RedirectActivity = ({ semester }: RedirectActivityProps) => {
  const router = useRouter()
  const pathName = usePathname()

  const { data: activities } = useQuery(
    activityQueries.list(semester.semesterId),
  )

  useEffect(() => {
    if (activities && activities.length > 0) {
      const firstActivity = activities[0].activityId
      router.push(`${pathName}/${firstActivity}`)
    }
  }, [activities, pathName, router])

  if (activities && activities.length === 0) {
    return <div>활동이 없습니다.</div>
  }

  return <ActivitySkeleton />
}
