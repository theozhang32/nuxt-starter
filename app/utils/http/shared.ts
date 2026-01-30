interface WithHeaders {
  headers?: Record<string, string>
}
/**
 * check if http status is success
 *
 * @param status
 */
export function isHttpSuccess(status: number) {
  const isSuccessCode = status >= 200 && status < 300
  return isSuccessCode || status === 304
}

export function getContentType(config: WithHeaders) {
  const contentType: string = config.headers?.['Content-Type'] || 'application/json'
  return contentType
}
