<template>
  <div id="app" class="flex min-h-screen flex-col">
    <NavBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import '@/styles/tailwind.css'
import NavBar from '@/components/layout/navbar/NavBar.vue'
</script>
