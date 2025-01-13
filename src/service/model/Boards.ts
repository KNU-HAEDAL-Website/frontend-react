/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import { ContentType, RequestParams } from '@/lib/http-client'

import { CustomHttpClient } from '../config'
import {
  GetPostWithBoardData,
  GetPostsWithBoardData,
  PostWithBoardRequestDto,
  RegisterPostWithBoardData,
  RemovePostWithBoardData,
} from './data-contracts'

export class Boards<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetPostWithBoard
   * @summary 활동 게시글 단일 조회
   * @request GET:/boards/{boardId}/posts/{postId}
   * @secure
   * @response `200` `GetPostWithBoardData` OK
   * @response `404` `void`
   */
  getPostWithBoard = (
    boardId: number,
    postId: number,
    params: RequestParams = {},
  ) =>
    this.request<GetPostWithBoardData, void>({
      path: `/boards/${boardId}/posts/${postId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetPostsWithBoard
   * @summary 활동 게시글 목록 조회
   * @request GET:/boards/{boardId}/posts
   * @secure
   * @response `200` `GetPostsWithBoardData` OK
   */
  getPostsWithBoard = (
    boardId: number,
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetPostsWithBoardData, any>({
      path: `/boards/${boardId}/posts`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name RegisterPostWithBoard
   * @summary 활동 게시글 생성
   * @request POST:/boards/{boardId}/posts
   * @secure
   * @response `200` `RegisterPostWithBoardData` OK
   * @response `201` `void`
   * @response `401` `void`
   * @response `404` `void`
   */
  registerPostWithBoard = (
    boardId: number,
    data: PostWithBoardRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<RegisterPostWithBoardData, void>({
      path: `/boards/${boardId}/posts`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })

  /**
   * No description
   *
   * @tags 게시글 API
   * @name DeletePost
   * @summary 활동 게시글 삭제
   * @request DELETE:/boards/{boardId}/posts/{postId}
   * @secure
   * @response `200` `DeletePostData`
   * @response `403` `void`
   * @response `404` `void`
   */
  deletePost = (boardId: number, postId: number, params: RequestParams = {}) =>
    this.request<RemovePostWithBoardData, void>({
      path: `/boards/${boardId}/posts/${postId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
}
