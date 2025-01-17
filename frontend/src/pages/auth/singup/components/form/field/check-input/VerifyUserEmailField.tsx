import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { API_ERROR_MESSAGES } from '@/constant'
import { cn } from '@/lib/utils'
import { verifyUserEmailApi } from '@/service/api'
import { Signup } from '@/service/schema'

interface VerifyUserEmailFieldProps {
  isValid: boolean
  setIsValid: (isValid: boolean) => void
  disabled: boolean
}

export const VerifyUserEmailField = ({
  isValid,
  setIsValid,
  disabled,
}: VerifyUserEmailFieldProps) => {
  const form = useFormContext<Signup>()

  const [message, setMessage] = useState('')

  const { mutate: verifyUserEmail, isPending } = useMutation({
    mutationFn: verifyUserEmailApi,
    onSuccess: (data) => onSuccess(data.message),
    onError: (error: Error) => onError(error),
  })

  const onClick = () => {
    verifyUserEmail({
      email: form.getValues('email'),
      userId: form.getValues('userId'),
      code: form.getValues('code'),
    })
  }

  const onSuccess = (message: string) => {
    setIsValid(true)
    setMessage(message)
  }

  const onError = (error: Error) => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        if (error.response.data.code === 'EMAIL_001') {
          setMessage(error.response?.data.message)
          return
        }

        setMessage(error.response?.data.errors[0].message)
        return
      }

      setMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }

  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>인증번호</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  setIsValid(false)
                  setMessage('')
                }}
                placeholder="123abc"
              />
              <Button
                type="button"
                variant="outline"
                disabled={disabled || isPending}
                onClick={onClick}
              >
                인증번호 확인
              </Button>
            </div>
          </FormControl>
          <FormMessage className="pl-2" />
          {message && (
            <p
              className={cn(
                isValid ? 'text-blue-600' : 'text-red-600',
                'pl-2 text-sm',
              )}
            >
              {message}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
