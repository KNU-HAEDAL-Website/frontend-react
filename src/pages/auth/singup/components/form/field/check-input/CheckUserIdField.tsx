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
import { checkUserIdApi } from '@/service/api'
import { Signup } from '@/service/schema'

interface CheckUserIdFieldProps {
  isValid: boolean
  setIsValid: (isValid: boolean) => void
}

export const CheckUserIdField = ({
  isValid,
  setIsValid,
}: CheckUserIdFieldProps) => {
  const form = useFormContext<Signup>()
  const { errors } = form.formState

  const [message, setMessage] = useState('')

  const { mutate: checkUserId, isPending } = useMutation({
    mutationFn: () => checkUserIdApi({ userId: form.getValues('userId') }),
    onSuccess: (data) => onSuccess(data.message),
    onError: (error) => onError(error),
  })

  const onSuccess = (message: string) => {
    setIsValid(true)
    setMessage(message)
  }

  const onError = (error: Error) => {
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
      name="userId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  setIsValid(false)
                  setMessage('')
                }}
                placeholder="hobanu"
              />
              <Button
                type="button"
                variant="outline"
                disabled={!field.value || !!errors['userId'] || isPending}
                onClick={() => checkUserId()}
              >
                중복 확인
              </Button>
            </div>
          </FormControl>
          <FormDescription className="pl-2">
            - ID는 영어와 숫자를 포함해 6~12자리로 입력해주세요.
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
