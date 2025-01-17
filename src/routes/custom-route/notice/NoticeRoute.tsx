import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

import { Spinner } from '@/components/common'
import { NoticeErrorFallback } from '@/components/feature/error-fallback/notice/NoticeErrorFallback'

export const NoticeRoute = () => {
  return (
    <ErrorBoundary FallbackComponent={NoticeErrorFallback}>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  )
}
