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

const handleFinanceOptionClick = (option: string) => {
  console.log(option)
}
</script>

<template>
  <main>
    <h2>Finance tools and calculators</h2>

    <RouterLink to="/mortgage-calculator"><h4>Mortgage calculator</h4></RouterLink>
    <p>A helping hand on the property ladder</p>

    <RouterLink to="/compound-interest-calculator"><h4>Compound interest calculator</h4></RouterLink>
    <p>A helping hand on the property ladder</p>

    <FinanceOptions :options="financeOptions" />
  </main>
</template>
