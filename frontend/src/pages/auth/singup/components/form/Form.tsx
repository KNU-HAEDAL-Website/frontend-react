import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Button, Form } from '@/components/ui'
import { signupApi } from '@/service/api'
import { Signup, SignupSchema } from '@/service/schema'

import {
  CheckStudentNumberField,
  CheckUserEmailField,
  CheckUserIdField,
  SignupCheckboxField,
  SignupInputField,
  VerifyUserEmailField,
} from './field'
import { SignupSuccessDialog } from './success-dialog'

export const SignupForm = () => {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => setOpen(true),
  })

  const [isValid, setIsValid] = useState({
    userId: false,
    studentNumber: false,
    email: false,
    code: false,
  })

  const form = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      userId: '',
      password: '',
      email: '',
      code: '',
      confirmPassword: '',
      studentNumber: '',
      userName: '',
      checked: false,
    },
  })

  const onSubmit = () => {
    try {
      if (!isValid.userId) {
        throw new Error('아이디 중복 확인을 진행해주세요.')
      }

      if (!isValid.studentNumber) {
        throw new Error('학번 중복 확인을 진행해주세요.')
      }

      if (!isValid.code) {
        throw new Error('이메일 인증을 진행해주세요.')
      }

      const { userId, password, email, studentNumber, userName } =
        form.getValues()

      signup({
        data: {
          userId,
          password,
          email,
          studentNumber: Number(studentNumber),
          userName,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        if (!isValid.userId || !isValid.studentNumber || !isValid.code)
          toast.error(error.message)
      }
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
        <CheckUserIdField
          isValid={isValid.userId}
          setIsValid={(valid: boolean) =>
            setIsValid((prev) => ({ ...prev, userId: valid }))
          }
        />
        <div className="space-y-1">
          <SignupInputField
            type="password"
            name="password"
            formLabel="비밀번호"
            placeholder="********"
          />
          <SignupInputField
            type="password"
            name="confirmPassword"
            formLabel="비밀번호 확인"
            placeholder="********"
            formDescription="- 비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자로 입력해주세요."
          />
        </div>
        <div className="space-y-2">
          <CheckStudentNumberField
            isValid={isValid.studentNumber}
            setIsValid={(valid: boolean) =>
              setIsValid((prev) => ({ ...prev, studentNumber: valid }))
            }
          />
          <SignupInputField
            name="userName"
            formLabel="이름"
            placeholder="호반우"
          />
        </div>
        <div className="space-y-2">
          <CheckUserEmailField
            disabled={!isValid.userId}
            isValid={isValid.email}
            setIsValid={(valid: boolean) =>
              setIsValid((prev) => ({ ...prev, email: valid }))
            }
          />
          <VerifyUserEmailField
            disabled={!isValid.email}
            isValid={isValid.code}
            setIsValid={(valid: boolean) =>
              setIsValid((prev) => ({ ...prev, code: valid }))
            }
          />
        </div>
        <SignupCheckboxField
          name="checked"
          formLabel="관리자의 승인 후 회원가입이 완료됩니다."
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !form.formState.isValid}
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </form>
      <SignupSuccessDialog open={open} setOpen={setOpen} />
    </Form>
  )
}
