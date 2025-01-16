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
          <div className="flex w-full max-w-screen-xl flex-col items-center gap-2 px-5 sm:px-20">
            <ActivityHero />
            <SemesterListSkeleton />
          </div>
        }
      >
        <div className="flex w-full max-w-screen-xl px-5 sm:px-20">
          <Outlet />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
