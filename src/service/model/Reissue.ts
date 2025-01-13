/* eslint-disable */
import { RequestParams } from '@/lib/http-client'

import { CustomHttpClient } from '../config'
import { ReissueData } from './data-contracts'

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export class Reissue<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 토큰 재발급
   * @name Reissue
   * @summary JWT 재발급
   * @request POST:/reissue
   * @secure
   * @response `200` `ReissueData`
   */
  reissue = (params: RequestParams = {}) =>
    this.request<ReissueData, any>({
      path: `/reissue`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
}
