export class BackendBizError extends Error {
  constructor(message: string, public code?: number | string) {
    super(message)
  }
}
