<!--
 * @Author       : 张天昊
 * @Date         : 2026-01-26 16:56:13
 * @LastEditTime : 2026-02-03 15:15:03
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/pages/index/_components/HelloWorld.vue
-->
<template>
  <div class="flex flex-col items-center">
    <span class="text-2xl font-bold">Hello World</span>
    <NuxtLink to="/about">
      About
    </NuxtLink>
    <UButton @click="onClick">
      Click me
    </UButton>
    <pre v-if="data">{{ data }}</pre>
    <pre v-if="error">{{ error.toJSON() }}</pre>
    <!-- <img v-if="data" class="w-100 h-100 object-contain" :src="data.image"> -->
  </div>
</template>

<script setup lang="ts">
import { yesorno } from '~/apis'

const { data, error, refresh } = await useAsyncData('yesorno', () => yesorno(), {
  // server: false,
})

function onClick() {
  refresh()
}
</script>
