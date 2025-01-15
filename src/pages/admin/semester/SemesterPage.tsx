import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useSuspenseQuery } from '@tanstack/react-query'

import { NotFound } from '@/components/common'
import { semesterQueries } from '@/service/api'

import { AdminErrorFallback, AdminSectionWithTitle } from '../components'
import {
  ActivityAccordion,
  AddSemesterDialog,
  SemesterList,
} from './components'

const AdminSemesterPage = () => {
  const { data: semesters, error } = useSuspenseQuery(semesterQueries.list())

  if (error) return <NotFound />

  return (
    <div className="flex w-full flex-col items-center">
      <AdminSectionWithTitle title="학기 관리">
        <div className="flex flex-row gap-2">
          <AddSemesterDialog />
          <SemesterList semesters={semesters} />
        </div>
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
        <div />
      </AdminSectionWithTitle>
      <AdminSectionWithTitle title="활동 관리">
        <div />
      </AdminSectionWithTitle>
    </div>
  )
}

export default function FetchAdminSemesterPage() {
  return (
    <ErrorBoundary FallbackComponent={AdminErrorFallback}>
      <Suspense fallback={<SkeletonAdminSemesterPage />}>
        <AdminSemesterPage />
      </Suspense>
    </ErrorBoundary>
  )
}
