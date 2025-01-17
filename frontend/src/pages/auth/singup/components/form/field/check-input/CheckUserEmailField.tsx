import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { API_ERROR_MESSAGES } from '@/constant'
import { cn } from '@/lib/utils'
import { checkUserEmailApi } from '@/service/api'
import { Signup } from '@/service/schema'

interface CheckUserEmailFieldProps {
  isValid: boolean
  setIsValid: (isValid: boolean) => void
  disabled: boolean
}

export const CheckUserEmailField = ({
  isValid,
  setIsValid,
  disabled,
}: CheckUserEmailFieldProps) => {
  const form = useFormContext<Signup>()
  const { errors } = form.formState

  const [message, setMessage] = useState('')

  const { mutate: checkUserEmail, isPending } = useMutation({
    mutationFn: checkUserEmailApi,
    onSuccess: (data) => {
      if (data.message) {
        onSuccess(data.message)
      } else {
        onError(new Error('Message is undefined'))
      }
    },
    onError: (error: Error) => onError(error),
  })

  const onSuccess = (message: string) => {
    setIsValid(true)
    setMessage(message)
  }

  const onError = (error: Error) => {
    setIsValid(false)
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        setMessage(error.response?.data.message)
        return
      }
    }

    setMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR)
  }

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  setIsValid(false)
                  setMessage('')
                }}
                placeholder="hobanu@knu.ac.kr"
              />
              <Button
                type="button"
                variant="outline"
                disabled={
                  disabled || !field.value || !!errors['email'] || isPending
                }
                onClick={() =>
                  checkUserEmail({ email: form.getValues('email') })
                }
              >
                인증번호 전송
              </Button>
            </div>
          </FormControl>
          <FormDescription className="pl-2">
            - 아이디 중복 검사를 먼저 진행한 후, 이메일 인증을 진행해 주세요.
          </FormDescription>
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
