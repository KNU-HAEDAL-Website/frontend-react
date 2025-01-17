import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import {
  DeleteProfileImageRequest,
  GetUserProfileRequest,
  UpdateProfileImageRequest,
  UpdateProfileRequest,
  Users,
} from '@/service/model'

const getUserProfile = async ({ userId }: GetUserProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getProfile(userId)

  return response.data
}

export const profileQuries = {
  all: () => ['profile'],
  profiles: ({ userId }: GetUserProfileRequest) => [
    ...profileQuries.all(),
    userId,
  ],
  profile: ({ userId }: GetUserProfileRequest) =>
    queryOptions({
      queryKey: [...profileQuries.profiles({ userId })],
      enabled: !!userId,
      queryFn: async () => getUserProfile({ userId }),
    }),
}

export const updateProfileInfoApi = async ({
  userId,
  data,
}: UpdateProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.updateProfile(userId, data)

  return response.data
}

export const updateProfileImageApi = async ({
  userId,
  data,
}: UpdateProfileImageRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.updateProfileImage(userId, data)

  return response.data
}

export const deleteProfileImageApi = async ({
  userId,
}: DeleteProfileImageRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.deleteProfileImage(userId)

  return response.data
}
