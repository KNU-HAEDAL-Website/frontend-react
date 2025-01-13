'use client'

import { AUTHORIZATION_API } from '@/service/config'
import { UploadPostImageRequest } from '@/service/model'
import { PostImages } from '@/service/model'

export const uploadPostImageApi = async ({ data }: UploadPostImageRequest) => {
  const postImageClient = new PostImages(AUTHORIZATION_API)
  const response = await postImageClient.registerPostImage(data)

  return response.data
}
