'use client'

import formatDateDistanceFromToday from '@/utils/date-distance'
import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import {
  ActivityPostPagingRequest,
  AddActivityPostRequest,
  Boards,
  DeleteActivityPostRequest,
  GetActivityPostDetailRequest,
  PostWithBoardSummaryResponseDto,
} from '@/service/models'
import { Paging } from '@/types/paging'

type PostPagingResponse = {
  posts: PostWithBoardSummaryResponseDto[]
} & Paging

const activityPostPaging = async ({
  boardId,
  page,
  size = 10,
}: ActivityPostPagingRequest): Promise<PostPagingResponse> => {
  const postClient = new Boards(BACKEND_API)
  const response = await postClient.getPostsWithBoard(boardId, { page, size })

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

const getActivityPostDetail = async ({
  boardId,
  postId,
}: GetActivityPostDetailRequest) => {
  const boardClient = new Boards(BACKEND_API)
  const response = await boardClient.getPostWithBoard(boardId, postId)

  return response.data
}

export const activityPostQuries = {
  all: () => ['post', 'activity'],
  board: (boardId: number) => [...activityPostQuries.all(), boardId],
  lists: (boardId: number) => [...activityPostQuries.board(boardId), 'list'],
  list: ({ boardId, page, size }: ActivityPostPagingRequest) =>
    queryOptions({
      queryKey: [...activityPostQuries.lists(boardId), page],
      queryFn: async () => activityPostPaging({ boardId, page, size }),
    }),
  details: ({ boardId, postId }: GetActivityPostDetailRequest) => [
    ...activityPostQuries.board(boardId),
    'detail',
    postId,
  ],
  detail: ({ boardId, postId }: GetActivityPostDetailRequest) =>
    queryOptions({
      queryKey: [...activityPostQuries.details({ boardId, postId })],
      queryFn: async () => getActivityPostDetail({ boardId, postId }),
    }),
}

export const deleteActivityPostApi = async ({
  boardId,
  postId,
}: DeleteActivityPostRequest) => {
  const postClient = new Boards(AUTHORIZATION_API)
  const response = await postClient.deletePost(boardId, postId)

  return response.data
}

export const addActivityPostApi = async ({
  boardId,
  data,
}: AddActivityPostRequest) => {
  const postClient = new Boards(AUTHORIZATION_API)
  const response = await postClient.registerPostWithBoard(boardId, data)

  return response.data
}
