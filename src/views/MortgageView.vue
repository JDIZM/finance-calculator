<template>
  <main>
    <h1>Mortgage Calculator</h1>
    <p>a simple mortgage calculator</p>
    <mortgage-calculator />
    <mortgage-results />
  </main>
</template>

<script setup lang="ts">
import MortgageCalculator from '@/components/calculator/mortgage/MortgageCalculator.vue'
import MortgageResults from '@/components/calculator/mortgage/results/MortgageResults.vue'
import { useMortgageStore } from '@/stores/mortgage'

const store = useMortgageStore()

// Subscription to store actions
store.$onAction((action) => {
  console.log('action', action)
  if (action.name === 'setOptions') {
    console.log('setOptions', action)
  }
  if (action.name === 'setResults') {
    console.log('setResults', action)
  }
})
</script>
