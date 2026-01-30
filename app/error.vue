<template>
  <div>
    <h1>Error</h1>
    <code>
      {{
        error
          ? (error.toJSON
            ? error.toJSON()
            : JSON.stringify(error, null, 2)
          )
          : 'Unknown error'
      }}
    </code>
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
