/*
 * @Author       : 张天昊
 * @Date         : 2026-01-29 14:39:23
 * @LastEditTime : 2026-01-30 09:27:25
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/apis/index.ts
 */

export * from './type'

export function yesorno() {
  const { $axios } = useNuxtApp()
  return $axios<{
    image: string
    answer: 'yes' | 'no'
    forced: boolean
  }>({
    url: 'https://yesno.wtf/api',
    method: 'get',
  })
}
