<script setup lang="ts">
import FinanceOptions from '@/components/FinanceOptions.vue'
import { ref } from 'vue'

const financeOptions = ref([
  {
    text: 'Compound Interest',
    value: 'compound-interest'
  },
  {
    text: 'Mortgage',
    value: 'mortgage'
  }
])

</script>

<template>
  <main>
    <h2>Mortgage Calculator</h2>
    <p>a simple mortgage calculator</p>
    <FinanceOptions :options="financeOptions" />
  </main>
</template>
