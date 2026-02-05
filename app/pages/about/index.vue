<template>
  <div>
    <pre v-if="data">{{ data }}</pre>
    <pre v-if="error">{{ error.toJSON() }}</pre>
  </div>
</template>

<script setup lang="ts">
import { yesorno } from '~/apis'

const { data, error } = await useAsyncData('yesorno', () => yesorno())
</script>
