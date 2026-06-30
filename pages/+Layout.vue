<template>
  <div id="app" class="flex min-h-screen flex-col">
    <NavBar />
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import '@/styles/tailwind.css'
import NavBar from '@/components/layout/navbar/NavBar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
</script>
