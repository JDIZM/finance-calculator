<template>
  <select v-model="selected">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
const { options } = defineProps({
  options: { type: Array<{ text: string; value: string }>, required: true }
})

const selected = defineModel({ required: true })
</script>

<style lang="scss" scoped>
//
</style>
