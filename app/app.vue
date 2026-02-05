<template>
  <!-- <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { appTitle } = useAppConfig()

useHead({
  title: appTitle,
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
