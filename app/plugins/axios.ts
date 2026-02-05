/*
 * @Author       : 张天昊
 * @Date         : 2026-01-29 17:01:16
 * @LastEditTime : 2026-02-03 14:35:58
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/plugins/axios.ts
 */
import type { BizResponse } from '~/apis'
import { BackendBizError } from '~/utils/error/BackendBizError'
import { createRequest } from '~/utils/http/axios'

interface RequestState extends Record<string, unknown> {
  requestType: 'common' | 'flat'
}

const requestState: RequestState = {
  requestType: 'flat',
}

export default defineNuxtPlugin(() => {
  const { apiSuccessCode } = useAppConfig()
  const axiosInstance = createRequest<BizResponse, unknown, RequestState>({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
  }, {
    defaultState: requestState,
    cancelable: false,
    onRequest: (config) => {
      // 请求前处理config
      // headers改造在这里
      return config
    },
    isBackendSuccess: (response) => {
      return true
    },
    onBackendFail: async (res) => {
      // 业务错误处理
      return { ...res, bizError: new BackendBizError(res.data?.msg || '业务错误', res.data?.code) }
    },
    onError: (error) => {
      // 全局错误处理(未被onBackendFail捕获到的错误)
      console.error(error)
    },
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})
