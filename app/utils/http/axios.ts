import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import type { IAxiosRetryConfig } from 'axios-retry'
import axios, { AxiosError } from 'axios'
import axiosRetry from 'axios-retry'
import { stringify } from 'qs'
import { BackendBizError } from '../error/BackendBizError'
import { generateUUID } from '../helper'
import { isHttpSuccess } from './shared'

declare module 'axios' {
  interface AxiosResponse {
    bizError?: BackendBizError
  }
}

export type ResponseTransform<Input = any, Output = any> = (input: Input) => Output | Promise<Output>
export interface RequestOption<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
> {
  /**
   * The default state
   */
  defaultState?: State
  cancelable?: boolean
  /**
   * transform the response data to the api data
   *
   * @param response Axios response
   */
  transform: ResponseTransform<AxiosResponse<ResponseData>, ApiData>
  /**
   * transform the response data to the api data
   *
   * @deprecated use `transform` instead, will be removed in the next major version v3
   * @param response Axios response
   */
  transformBackendResponse: ResponseTransform<AxiosResponse<ResponseData>, ApiData>
  /**
   * The hook before request
   *
   * For example: You can add header token in this hook
   *
   * @param config Axios config
   */
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  /**
   * The hook to check backend response is success or not
   *
   * @param response Axios response
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean
  /**
   * The hook after backend request fail
   *
   * For example: You can handle the expired token in this hook
   *
   * @param response Axios response
   * @param instance Axios instance
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => void | Promise<AxiosResponse | null> | Promise<void>
  /**
   * The hook to handle error
   *
   * For example: You can show error message in this hook
   *
   * @param error
   */
  onError: <T = ResponseData>(error: AxiosError<T>) => void | Promise<void>
}

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
  document: Document
}
export type ResponseType = keyof ResponseMap | 'json'

export type MappedType<R extends ResponseType, JsonType = any> = R extends keyof ResponseMap
  ? ResponseMap[R]
  : JsonType

export type CustomAxiosRequestConfig<R extends ResponseType = 'json'> = Omit<AxiosRequestConfig, 'responseType'> & {
  responseType?: R
}

export interface RequestInstanceCommon<State extends Record<string, unknown>> {
  /**
   * cancel all request
   *
   * if the request provide abort controller sign from config, it will not collect in the abort controller map
   */
  cancelAllRequest: () => void
  /** you can set custom state in the request instance */
  state: State
}

/** The request instance */
export interface RequestInstance<ApiData, State extends Record<string, unknown>> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<MappedType<R, T>>
}

export interface FlatResponseSuccessData<ResponseData, ApiData> {
  data: ApiData
  error: null
  response: AxiosResponse<ResponseData>
}

export interface FlatResponseFailData<ResponseData> {
  data: null
  error: AxiosError<ResponseData>
  response: AxiosResponse<ResponseData>
}

export type FlatResponseData<ResponseData, ApiData>
  = | FlatResponseSuccessData<ResponseData, ApiData>
    | FlatResponseFailData<ResponseData>

export interface FlatRequestInstance<
  ResponseData,
  ApiData,
  State extends Record<string, unknown>
> extends RequestInstanceCommon<State> {
  <T extends ApiData = ApiData, R extends ResponseType = 'json'>(
    config: CustomAxiosRequestConfig<R>
  ): Promise<FlatResponseData<ResponseData, MappedType<R, T>>>
}

const REQUEST_ID_KEY = 'X-Request-Id' as const
const API_TIMEOUT = 10 * 1000
const BACKEND_ERROR_TYPE = 'BACKEND_ERROR'

async function transformResponse(response: AxiosResponse) {
  const responseType: ResponseType = (response.config?.responseType as ResponseType) || 'json'
  if (responseType === 'json') {
    return
  }

  const isJson = response.headers['content-type']?.includes('application/json')
  if (!isJson) {
    return
  }

  if (responseType === 'blob') {
    await transformBlobToJson(response)
  }

  if (responseType === 'arrayBuffer') {
    await transformArrayBufferToJson(response)
  }
}

async function transformBlobToJson(response: AxiosResponse) {
  try {
    let { data } = response

    if (typeof data === 'string') {
      data = JSON.parse(data)
    }

    if (Object.prototype.toString.call(data) === '[object Blob]') {
      const json = await data.text()
      data = JSON.parse(json)
    }

    response.data = data
  } catch {}
}

async function transformArrayBufferToJson(response: AxiosResponse) {
  try {
    let { data } = response

    if (typeof data === 'string') {
      data = JSON.parse(data)
    }

    if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
      const json = new TextDecoder().decode(data)
      data = JSON.parse(json)
    }

    response.data = data
  } catch {}
}

function createDefaultOptions<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(options?: Partial<RequestOption<ResponseData, ApiData, State>>) {
  const opts: RequestOption<ResponseData, ApiData, State> = {
    defaultState: {} as State,
    cancelable: true,
    transform: async response => response.data as unknown as ApiData,
    transformBackendResponse: async response => response.data as unknown as ApiData,
    onRequest: async config => config,
    isBackendSuccess: _response => true,
    onBackendFail: async () => {},
    onError: async () => {},
  }

  if (options?.transform) {
    opts.transform = options.transform
  } else {
    opts.transform = options?.transformBackendResponse || opts.transform
  }

  Object.assign(opts, options)

  return opts
}

function createRetryOptions(config?: Partial<CreateAxiosDefaults>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 0,
  }

  Object.assign(retryConfig, config)

  return retryConfig
}

function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const axiosConfig: CreateAxiosDefaults = {
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: isHttpSuccess,
    paramsSerializer: (params) => {
      return stringify(params)
    },
  }

  Object.assign(axiosConfig, config)

  return axiosConfig
}

function createAbortSignal(config: InternalAxiosRequestConfig, cacheMap: Map<string, AbortController>) {
  // set request id
  const requestId = generateUUID()
  config.headers.set(REQUEST_ID_KEY, requestId)

  // config abort controller
  if (!config.signal) {
    const abortController = new AbortController()
    config.signal = abortController.signal
    cacheMap.set(requestId, abortController)
  }
}

function createCommonRequest<
  ResponseData,
  ApiData = ResponseData,
  State extends Record<string, unknown> = Record<string, unknown>
>(axiosConfig?: CreateAxiosDefaults, options?: Partial<RequestOption<ResponseData, ApiData, State>>) {
  const opts = createDefaultOptions<ResponseData, ApiData, State>(options)

  const axiosConf = createAxiosConfig(axiosConfig)
  const instance = axios.create(axiosConf)

  const abortControllerMap = new Map<string, AbortController>()

  // config axios retry
  const retryOptions = createRetryOptions(axiosConf)
  axiosRetry(instance, retryOptions)

  instance.interceptors.request.use((conf) => {
    const config: InternalAxiosRequestConfig = { ...conf }

    opts.cancelable && createAbortSignal(config, abortControllerMap)

    // handle config by hook
    const handledConfig = opts.onRequest?.(config) || config

    return handledConfig
  })

  instance.interceptors.response.use(
    async (response) => {
      const responseType: ResponseType = (response.config?.responseType as ResponseType) || 'json'

      await transformResponse(response)

      if (responseType !== 'json' || opts.isBackendSuccess(response)) {
        return Promise.resolve(response)
      }

      const fail = await opts.onBackendFail(response, instance)
      if (fail) {
        return fail
      }

      const backendError = new AxiosError<ResponseData>(
        'the backend request error',
        BACKEND_ERROR_TYPE,
        response.config,
        response.request,
        response
      )

      await opts.onError(backendError)

      return Promise.reject(backendError)
    },
    async (error: AxiosError<ResponseData>) => {
      await opts.onError(error)

      return Promise.reject(error)
    }
  )

  function cancelAllRequest() {
    abortControllerMap.forEach((abortController) => {
      abortController.abort()
    })
    abortControllerMap.clear()
  }

  return {
    instance,
    opts,
    cancelAllRequest,
  }
}

/**
 * create a request instance
 *
 * @param axiosConfig axios config
 * @param options request options
 */
export function createRequest<ResponseData, ApiData, State extends Record<string, unknown>>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData, ApiData, State>>
) {
  const { instance, opts, cancelAllRequest } = createCommonRequest<ResponseData, ApiData, State>(axiosConfig, options)

  const request: RequestInstance<ApiData, State> = async function request<
    T extends ApiData = ApiData,
    R extends ResponseType = 'json'
  >(config: CustomAxiosRequestConfig) {
    const response: AxiosResponse<ResponseData> = await instance(config)

    const responseType = response.config?.responseType || 'json'

    if (responseType === 'json') {
      if (response.bizError instanceof BackendBizError) {
        throw response.bizError
      }
      return await opts.transform(response)
    }

    return response.data as MappedType<R, T>
  } as RequestInstance<ApiData, State>

  request.cancelAllRequest = cancelAllRequest
  request.state = {
    ...opts.defaultState,
  } as State

  return request
}

/**
 * create a flat request instance
 *
 * The response data is a flat object: { data: any, error: AxiosError }
 *
 * @param axiosConfig axios config
 * @param options request options
 */
// export function createFlatRequest<ResponseData, ApiData, State extends Record<string, unknown>>(
//   axiosConfig?: CreateAxiosDefaults,
//   options?: Partial<RequestOption<ResponseData, ApiData, State>>
// ) {
//   const { instance, opts, cancelAllRequest } = createCommonRequest<ResponseData, ApiData, State>(axiosConfig, options)

//   const flatRequest: FlatRequestInstance<ResponseData, ApiData, State> = async function flatRequest<
//     T extends ApiData = ApiData,
//     R extends ResponseType = 'json'
//   >(config: CustomAxiosRequestConfig) {
//     try {
//       const response: AxiosResponse<ResponseData> = await instance(config)

//       const responseType = response.config?.responseType || 'json'

//       if (responseType === 'json') {
//         if (response.bizError instanceof BackendBizError) {
//           return { data: null, error: response.bizError, response }
//         }
//         const data = await opts.transform(response)
//         return { data, error: null, response }
//       }

//       return { data: response.data as MappedType<R, T>, error: null, response }
//     } catch(error) {
//       return { data: null, error, response: (error as AxiosError<ResponseData>).response }
//     }
//   } as FlatRequestInstance<ResponseData, ApiData, State>

//   flatRequest.cancelAllRequest = cancelAllRequest
//   flatRequest.state = {
//     ...opts.defaultState,
//   } as State

//   return flatRequest
// }
