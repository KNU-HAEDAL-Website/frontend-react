import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { ActivityHero, SemesterListSkeleton } from '@/pages/activity/components'
import { Semester } from '@/types'

interface SemesterRedirectSectionProps {
  semesters: Semester[]
}

export const SemesterRedirectSection = ({
  semesters,
}: SemesterRedirectSectionProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const lastSemester = semesters[semesters.length - 1]
    navigate(`/activity/${lastSemester.semesterId}`)
  }, [navigate, semesters])

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ActivityHero />
      <SemesterListSkeleton />
    </div>
  )
}
