'use client'

import { useCallback, useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'

import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { API_ERROR_MESSAGES } from '@/constant'

export const AdminErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const handleToast = useCallback(
    (message: string, status: number) => {
      if (status === 404 || status === 409) {
        toast.error(message, { position: 'bottom-center', closeButton: true })
        resetErrorBoundary()
      }
    },
    [resetErrorBoundary],
  )

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.data.message) {
      handleToast(error.response.data.message, error.response.status)
    }
  }, [error, handleToast])

  return (
    <div className="flex flex-col items-center gap-6 pt-40">
      <div>{API_ERROR_MESSAGES.UNKNOWN_ERROR} </div>
      <Button onClick={() => resetErrorBoundary()}>뒤로가기</Button>
    </div>
  )
}
