import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import {
  GetUserInfoRequest,
  GetUserProfileRequest,
  UpdateProfileImagePayload,
  UpdateProfileRequest,
  Users,
} from '@/service/model'

const getUserInfo = async ({ userId }: GetUserInfoRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getUser(userId)
  return response.data
}

const getUserProfile = async ({ userId }: GetUserProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getProfile(userId)
  return response.data
}

export const userQueries = {
  all: () => ['users'],
  userInfos: ({ userId }: GetUserInfoRequest) => [
    ...userQueries.all(),
    'info',
    userId,
  ],
  userInfo: ({ userId }: GetUserInfoRequest) =>
    queryOptions({
      queryKey: [...userQueries.userInfos({ userId })],
      enabled: !!userId,
      queryFn: async () => getUserInfo({ userId }),
    }),

  profiles: ({ userId }: GetUserProfileRequest) => [
    ...userQueries.all(),
    'profile',
    userId,
  ],
  profile: ({ userId }: GetUserProfileRequest) =>
    queryOptions({
      queryKey: [...userQueries.profiles({ userId })],
      enabled: !!userId,
      queryFn: async () => getUserProfile({ userId }),
    }),
}

export const updateProfileApi = async ({
  userId,
  profileData,
}: UpdateProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.updateProfile(userId, profileData)
  return response.data
}

export const updateProfileImageApi = async ({
  userId,
  file,
}: {
  userId: string
  file: File
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
