<template>
  <div>
    <h1>Error</h1>
    <code>{{ error?.toJSON() }}</code>
  </div>
</template>

<script setup lang="ts">
const error = useError()
</script>

<style scoped>
.error {
  color: red;
}
</style>
