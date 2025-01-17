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
  RegisterPostImageData,
  RegisterPostImagePayload,
} from './data-contracts'

export class PostImages<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 게시글 API
   * @name RegisterPostImage
   * @summary 게시글 이미지 등록
   * @request POST:/post-images
   * @secure
   * @response `200` `RegisterPostImageData` OK
   * @response `400` `void`
   * @response `401` `void`
   */
  registerPostImage = (
    data: RegisterPostImagePayload,
    params: RequestParams = {},
  ) =>
    this.request<RegisterPostImageData, void>({
      path: `/post-images`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
}
