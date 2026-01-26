<script setup lang="ts">
import { appName } from '~/config/siteMeta'

useHead({
  title: appName,
})
</script>

<template>
  <NaiveConfig>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfig>
</template>

<style>

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
