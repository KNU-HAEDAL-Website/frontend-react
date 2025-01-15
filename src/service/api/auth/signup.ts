'use client'

import { BACKEND_API } from '@/service/config'
import {
  CheckStudentNumberRequest,
  CheckUserIdRequest,
  EmailRequestDto,
  EmailVerificationCodeRequestDto,
  Join,
  SignupRequest,
} from '@/service/model'

export const signupApi = async ({ data }: SignupRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.resisterUser(data)

  return response.data
}

export const checkUserIdApi = async ({ userId }: CheckUserIdRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.checkUserIdDuplicate({ userId })

  return response.data
}

export const checkStudentNumberApi = async ({
  studentNumber,
}: CheckStudentNumberRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.checkStudentNumberDuplicate({
    studentNumber,
  })

  return response.data
}

export const checkUserEmailApi = async ({ email }: EmailRequestDto) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.sendVerificationCode({ email })

  return response.data
}

export const verifyUserEmailApi = async ({
  email,
  userId,
  code,
}: EmailVerificationCodeRequestDto) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.verifyCode({ email, userId, code })

  return response.data
}
