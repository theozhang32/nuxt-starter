import tailwindcss from '@tailwindcss/vite'
import { APP_DESCRIPTION } from './app/config/runtime'

export default defineNuxtConfig({
  modules: [
    /** Nuxt4 + Vue3 生态 */
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/hints',
    /** 通用模块 */
    // dayjs
    'dayjs-nuxt',
    // es-toolkit
    '@bubblesortt/nuxt-es-toolkit',
  ],

  imports: {
    dirs: ['~/stores'],
  },

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: APP_DESCRIPTION },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
  },

  ui: {
    fonts: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2026-01-23',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    // prerender: {
    //   crawlLinks: false,
    //   routes: ['/'],
    //   ignore: ['/hi'],
    // },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  // pwa,
})
