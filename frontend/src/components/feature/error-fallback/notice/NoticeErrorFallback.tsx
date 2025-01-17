import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui'

export const NoticeErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const navigate = useNavigate()

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
