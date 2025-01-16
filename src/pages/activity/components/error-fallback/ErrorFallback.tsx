import { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router'

import { AxiosError } from 'axios'

import { Button } from '@/components/ui'

export const ActivityErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 404) {
      resetErrorBoundary()
      navigate('/activity')
    }
  }, [navigate, error, resetErrorBoundary])

  return (
    <div className="flex flex-col items-center gap-6 pt-40">
      <div>{error?.message} </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
        <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
      </div>
    </div>
  )
}
