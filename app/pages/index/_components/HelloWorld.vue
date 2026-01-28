<!--
 * @Author       : 张天昊
 * @Date         : 2026-01-26 16:56:13
 * @LastEditTime : 2026-01-28 17:13:34
 * @LastEditors  : 张天昊
 * @Description  :
 * @FilePath     : /frontend-nuxt-startkit/app/pages/index/_components/HelloWorld.vue
-->
<template>
  <div class="flex flex-col items-center">
    <span class="text-2xl font-bold">Hello World</span>
    <UButton>Click me</UButton>
    <img v-if="data" class="w-100 h-100 object-contain" :src="data.image">
  </div>
</template>

<script setup lang="ts">
const { data, error } = await useFetch('https://yesno.wtf/api')
// eslint-disable-next-line no-console
console.log(data.value, error.value)
</script>
