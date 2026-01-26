<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url(~/assets/css/layout.css);
html,
body,
#__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* html.dark {
  color-scheme: dark;
} */
</style>
