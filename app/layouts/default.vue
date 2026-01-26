<template>
  <div class="flex flex-col min-h-screen">
    <AppNav />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
