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
  BasePostRequestDto,
  GetNoticePostData,
  GetNoticePostsData,
  RegisterNoticePostData,
  RemoveNoticePostData,
  UpdateNoticePostData,
} from './data-contracts'

export class Notices<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetNoticePost
   * @summary 공지사항 게시글 단일 조회
   * @request GET:/notices/{postId}
   * @secure
   * @response `200` `GetNoticePostData` OK
   * @response `404` `void`
   */
  getNoticePost = (postId: number, params: RequestParams = {}) =>
    this.request<GetNoticePostData, void>({
      path: `/notices/${postId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name UpdateNoticePost
   * @summary 공지사항 게시글 수정
   * @request PUT:/notices/{postId}
   * @secure
   * @response `200` `UpdateNoticePostData`
   * @response `404` `void`
   */
  updateNoticePost = (
    postId: number,
    data: BasePostRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateNoticePostData, void>({
      path: `/notices/${postId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name RemoveNoticePost
   * @summary 공지사항 삭제
   * @request DELETE:/notices/{postId}
   * @secure
   * @response `200` `RemoveNoticePostData`
   * @response `404` `void`
   */
  removeNoticePost = (postId: number, params: RequestParams = {}) =>
    this.request<RemoveNoticePostData, void>({
      path: `/notices/${postId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetNoticePosts
   * @summary 공지사항 게시글 목록 조회
   * @request GET:/notices
   * @secure
   * @response `200` `GetNoticePostsData` OK
   */
  getNoticePosts = (
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
    this.request<GetNoticePostsData, any>({
      path: `/notices`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name RegisterNoticePost
   * @summary 공지사항 게시글 생성
   * @request POST:/notices
   * @secure
   * @response `200` `RegisterNoticePostData` OK
   * @response `201` `void`
   * @response `401` `void`
   * @response `404` `void`
   */
  registerNoticePost = (data: BasePostRequestDto, params: RequestParams = {}) =>
    this.request<RegisterNoticePostData, void>({
      path: `/notices`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
}
