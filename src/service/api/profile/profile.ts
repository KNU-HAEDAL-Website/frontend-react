import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import {
  GetUserProfileRequest,
  // UpdateProfileImagePayload,
  // UpdateProfileRequest,
  Users,
} from '@/service/model'

const getUserProfile = async ({ userId }: GetUserProfileRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getProfile(userId)

  return response.data
}

export const profileQuries = {
  all: () => ['profile'],
  profile: ({ userId }: GetUserProfileRequest) =>
    queryOptions({
      queryKey: [...profileQuries.all(), userId],
      enabled: !!userId,
      queryFn: async () => getUserProfile({ userId }),
    }),
}

// export const updateProfileApi = async ({
//   userId,
//   profileData,
// }: UpdateProfileRequest) => {
//   const userClient = new Users(AUTHORIZATION_API)
//   const response = await userClient.updateProfile(userId, profileData)
//   return response.data
// }

// export const updateProfileImageApi = async ({
//   userId,
//   file,
// }: {
//   userId: string
//   file: File
// }) => {
//   const userClient = new Users(AUTHORIZATION_API)
//   const formData = new FormData()
//   formData.append('file', file)
//   const response = await userClient.updateProfileImage(
//     userId,
//     formData as unknown as UpdateProfileImagePayload,
//   )
//   return response.data
// }
