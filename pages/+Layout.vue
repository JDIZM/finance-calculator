<template>
  <div id="app">
    <NavBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/navbar/NavBar.vue'
</script>

<style lang="scss">
@use '@/sass/main.scss';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
