'use client'

import { AUTHORIZATION_API } from '@/service/config'
import { UploadPostImageRequest } from '@/service/models'
import { PostImages } from '@/service/models/PostImages'

export const uploadPostImageApi = async ({ data }: UploadPostImageRequest) => {
  const postImageClient = new PostImages(AUTHORIZATION_API)
  const response = await postImageClient.registerPostImage(data)

  return response.data
}
