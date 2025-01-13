'use client'

import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import {
  GetUserRequest,
  ProfileRequestDto,
  RequestParams,
  UpdateProfileImagePayload,
  Users,
} from '@/service/models'

const getUserInfo = async ({ userId }: GetUserRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getUser(userId)
  return response.data
}

const getUserProfile = async ({ userId }: GetUserRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getProfile(userId)
  return response.data
}

export const userQueries = {
  all: () => ['users'],
  userInfos: ({ userId }: GetUserRequest) => [
    ...userQueries.all(),
    'info',
    userId,
  ],
  userInfo: ({ userId }: GetUserRequest) =>
    queryOptions({
      queryKey: [...userQueries.userInfos({ userId })],
      enabled: !!userId,
      queryFn: async () => getUserInfo({ userId }),
    }),

  profiles: ({ userId }: GetUserRequest) => [
    ...userQueries.all(),
    'profile',
    userId,
  ],
  profile: ({ userId }: GetUserRequest) =>
    queryOptions({
      queryKey: [...userQueries.profiles({ userId })],
      enabled: !!userId,
      queryFn: async () => getUserProfile({ userId }),
    }),
}

type UpdateProfileRequest = {
  userId: string
  profileData: ProfileRequestDto
  params?: RequestParams
}

export const putUpdateProfileApi = async ({
  userId,
  profileData,
}: UpdateProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.updateProfile(userId, profileData)
  return response.data
}

export const putUpdateProfileImageApi = async ({
  userId,
  file,
}: {
  userId: string
  file: File
  params?: RequestParams
}) => {
  const userClient = new Users(AUTHORIZATION_API)
  const formData = new FormData()
  formData.append('file', file)
  const response = await userClient.updateProfileImage(
    userId,
    formData as unknown as UpdateProfileImagePayload,
  )
  return response.data
}
