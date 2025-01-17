import { useSuspenseQuery } from '@tanstack/react-query'

import { semesterQueries } from '@/service/api'

import { ActivityHero } from '../components'
import { SemesterRedirectSection } from './components'

export default function SemesterRedirectPage() {
  const { data: semesters } = useSuspenseQuery(semesterQueries.list())

  if (!semesters.length) {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <ActivityHero />
        <div className="pt-3">학기가 없습니다.</div>
      </div>
    )
  }

  return <SemesterRedirectSection semesters={semesters} />
}
