/*
 * @Author       : 张天昊
 * @Date         : 2026-01-28 16:55:28
 * @LastEditTime : 2026-01-28 16:59:41
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/plugins/alova.ts
 */
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import NuxtHook from 'alova/nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  const alovaInstance = createAlova({
    timeout: 10 * 1000,
    requestAdapter: adapterFetch(),
    statesHook: NuxtHook({
      nuxtApp: useNuxtApp, // 必须指定useNuxtApp
    }),
  })

  return {
    provide: {
      alova: alovaInstance,
    },
  }
})
