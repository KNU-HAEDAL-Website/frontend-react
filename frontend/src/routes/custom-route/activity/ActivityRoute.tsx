import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import {
  ActivityErrorFallback,
  ActivityHero,
  SemesterListSkeleton,
} from '@/pages/activity/components'

export const ActivityRoute = () => {
  return (
    <ErrorBoundary FallbackComponent={ActivityErrorFallback}>
      <Suspense
        fallback={
          <div className="flex w-full flex-col items-center gap-2">
            <ActivityHero />
            <SemesterListSkeleton />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}
