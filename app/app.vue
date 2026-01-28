<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { appName } from '~/config/siteMeta'

useHead({
  title: appName,
})
</script>

<style>
@import '~/assets/css/main.css';

html,
body,
/* stylelint-disable-next-line */
#__nuxt {
  height: 100%;
  padding: 0;
  margin: 0;
}

/* html.dark {
  color-scheme: dark;
} */
</style>
