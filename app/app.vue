<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#1b1718' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'zh-cmn-Hans',
  },
})
const { appTitle, appDescription } = useAppConfig()

useSeoMeta({
  title: appTitle,
  description: appDescription,
  ogTitle: appTitle,
  ogDescription: appDescription,
  // ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  // twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png',
  // twitterCard: 'summary_large_image'
})
</script>
