<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
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
    <h2>Compound interest Calculator</h2>
    <p>a simple interest calculator that calclates compound interest on your investments over time</p>
    <FinanceOptions :options="financeOptions" />
  </main>
</template>
