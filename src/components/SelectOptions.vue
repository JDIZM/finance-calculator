<template>
  <select v-model="selected">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { options, modelValue } = defineProps({
  options: { type: Array<{ text: string; value: string }>, required: true },
  modelValue: { type: String, required: true }
})

const selected = ref(modelValue ?? options[0].value ?? '')
</script>

<style lang="scss" scoped>
//
</style>
