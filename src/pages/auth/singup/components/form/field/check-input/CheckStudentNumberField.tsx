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
import { checkStudentNumberApi } from '@/service/api'
import { Signup } from '@/service/schema'

interface CheckStudentNumberFieldProps {
  isValid: boolean
  setIsValid: (isValid: boolean) => void
}

export const CheckStudentNumberField = ({
  isValid,
  setIsValid,
}: CheckStudentNumberFieldProps) => {
  const form = useFormContext<Signup>()
  const { errors } = form.formState

  const [message, setMessage] = useState('')

  const { mutate: checkStudentNumber, isPending } = useMutation({
    mutationFn: checkStudentNumberApi,
    onSuccess: (data) => onSuccess(data.message),
    onError: (error: Error) => onError(error),
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

      if (error.response?.status === 400) {
        setMessage('유효하지 않는 학번입니다. ')
        return
      }
    }

    setMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR)
  }

  return (
    <FormField
      control={form.control}
      name="studentNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel>학번</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  setIsValid(false)
                  setMessage('')
                }}
                placeholder="2000123456"
              />
              <Button
                type="button"
                variant="outline"
                disabled={
                  !field.value || !!errors['studentNumber'] || isPending
                }
                onClick={() =>
                  checkStudentNumber({
                    studentNumber: Number(form.getValues('studentNumber')),
                  })
                }
              >
                중복 확인
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
