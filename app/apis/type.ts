/*
 * @Author       : 张天昊
 * @Date         : 2026-01-29 14:37:07
 * @LastEditTime : 2026-01-29 14:39:09
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/apis/type.ts
 */
export interface BizResponse<T = unknown> {
  code: number
  data: T
  msg: string
}
