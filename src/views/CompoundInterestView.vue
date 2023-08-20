<script setup lang="ts">
import { computed } from 'vue'
import { useCompoundInterestStore } from '@/stores/compound'
import CompoundInterestCalc from '@/components/calculator/compound-interest/CompoundInterestCalc.vue'

const store = useCompoundInterestStore()

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options = computed(() => {
  return store.options
})

const results = computed(() => {
  return store.results
})
</script>

<template>
  <main>
    <CompoundInterestCalc />

    <div class="results">
      <!-- results from store-->
      <h2>Results</h2>
      <p v-if="!results">Submit the form to calculate the compound interest.</p>

      <div class="results-breakdown" v-if="results">
        <h4>Investment Type: {{ results.investmentType }}</h4>
        <p>Total Investment: {{ results.totalInvestment }}</p>
        <p>Total Payments: {{ results.totalPayments }}</p>
        <p>Total Payments: {{ results.totalInterest }}</p>
        <p>End Balance: {{ results.endBalance }}</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.results {
  padding: 1rem;

  &-breakdown {
    h4,
    p {
      margin-bottom: 1rem;
    }
  }
}
</style>
