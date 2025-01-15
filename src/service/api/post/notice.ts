'use client'

import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import {
  AddNoticePostRequest,
  DeleteNoticePostRequest,
  GetNoticePostDetailRequest,
  NoticePostPagingRequest,
  NoticePostPagingResponse,
} from '@/service/model'
import { Notices } from '@/service/model/Notices'
import { formatDateDistanceFromToday } from '@/utils'

const noticePostPaging = async ({
  page,
  size = 10,
}: NoticePostPagingRequest): Promise<NoticePostPagingResponse> => {
  const noticeClient = new Notices(BACKEND_API)
  const response = await noticeClient.getNoticePosts({
    page,
    size,
  })

  const { data } = response

  const posts = data.content.map((post) => {
    const formatCreateDate = formatDateDistanceFromToday(
      new Date(post.postRegDate),
    )

    if (!formatCreateDate) return post

    return {
      ...post,
      postCreateDate: formatCreateDate,
    }
  })

  return {
    posts,
    nextPageToken:
      data.pageable.pageNumber !== data.totalPages
        ? (data.pageable.pageNumber + 1).toString()
        : undefined,
    pageInfo: {
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      pageSize: data.pageable.pageSize,
    },
  }
}

const getNoticePostDetail = async ({ postId }: GetNoticePostDetailRequest) => {
  const noticeClient = new Notices(BACKEND_API)
  const response = await noticeClient.getNoticePost(postId)

  return response.data
}

export const NoticePostQuries = {
  all: () => ['post', 'notice'],
  list: ({ page, size }: NoticePostPagingRequest) =>
    queryOptions({
      queryKey: [...NoticePostQuries.all(), page],
      queryFn: async () => noticePostPaging({ page, size }),
    }),
  detail: ({ postId }: GetNoticePostDetailRequest) =>
    queryOptions({
      queryKey: [...NoticePostQuries.all(), postId],
      queryFn: () => getNoticePostDetail({ postId }),
    }),
}

export const deleteNoticePostApi = async ({
  postId,
}: DeleteNoticePostRequest) => {
  const noticeClient = new Notices(AUTHORIZATION_API)
  const response = await noticeClient.removeNoticePost(postId)

  return response.data
}

export const addNoticePostApi = async ({ data }: AddNoticePostRequest) => {
  const noticeClient = new Notices(AUTHORIZATION_API)
  const response = await noticeClient.registerNoticePost(data)

  return response.data
}
