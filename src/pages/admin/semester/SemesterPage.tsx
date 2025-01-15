import { useQuery } from '@tanstack/react-query'

import { semesterQueries } from '@/service/api'

import { AdminSectionWithTitle } from '../components'
import { ActivityAccordion, SemesterList } from './components'

export default function AdminSemesterPage() {
  const { data: semesters, status, error } = useQuery(semesterQueries.list())

  if (status === 'pending') return <SkeletonAdminSemesterPage />

  if (error) return <div>{error.message}</div>

  return (
    <div className="flex w-full flex-col items-center">
      <AdminSectionWithTitle title="학기 관리">
        <SemesterList semesters={semesters} />
      </AdminSectionWithTitle>
      <AdminSectionWithTitle title="활동 관리">
        <ActivityAccordion semesters={semesters} />
      </AdminSectionWithTitle>
    </div>
  )
}

const SkeletonAdminSemesterPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <AdminSectionWithTitle title="학기 관리">
        <SemesterList semesters={[]} />
      </AdminSectionWithTitle>
      <AdminSectionWithTitle title="활동 관리">
        <div />
      </AdminSectionWithTitle>
    </div>
  )
}
