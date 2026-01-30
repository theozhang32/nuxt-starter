/*
 * @Author       : 张天昊
 * @Date         : 2026-01-30 09:20:26
 * @LastEditTime : 2026-01-30 09:20:28
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/utils/helper/uuid.ts
 */
/**
 * 生成uuid
 */
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 16)
export function generateUUID() {
  return nanoid()
}
