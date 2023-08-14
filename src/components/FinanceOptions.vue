<template>
  <h2>Finance Options</h2>
  <select v-model="selected">
    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>

  <div>Selected: {{ selected }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  options: { type: Array<{ text: string; value: string }>, required: true }
})

const selected = ref(props.options[0].value ?? '')
</script>

<style lang="scss">
//
</style>
