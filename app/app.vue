<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { APP_TITLE } from '~/config/runtime'

useHead({
  title: APP_TITLE,
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
