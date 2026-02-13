/*
 * @Author       : 张天昊
 * @Date         : 2026-01-26 09:20:50
 * @LastEditTime : 2026-02-05 16:01:31
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/content.config.ts
 */
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'

export default defineContentConfig({
  collections: {
    authors: defineCollection({
      type: 'data',
      source: 'authors/**.yml',
      schema: z.object({
        name: z.string(),
        avatar: z.string(),
        url: z.string(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
    datas: defineCollection({
      type: 'data',
      source: 'datas/datas.csv',
      schema: z.object({
        title: z.string(),
        desc: z.string(),
      }),
    }),
  },
})
