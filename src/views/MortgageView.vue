<template>
  <main>
    <h1>Mortgage Calculator</h1>
    <p>a simple mortgage calculator</p>
    <MortgageCalculator />
    <div class="results" v-if="store.results">
      <h2>Mortgage Results</h2>
      <p>
        Your monthly mortgage repayment for a <strong>{{ store.mortgagetype }}</strong> mortgage
        would be
        <span v-if="store.mortgagetype === 'repayment' && 'monthlyRepayment' in store.results">
          <strong>{{ formattedNumber(store.results.monthlyRepayment) }}</strong>
        </span>
        <span v-if="store.mortgagetype === 'interestOnly' && 'interestPayments' in store.results">
          <strong>{{ formattedNumber(store.results.interestPayments.monthly) }}</strong>
        </span>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import MortgageCalculator from '@/components/calculator/mortgage/MortgageCalculator.vue'
import { formattedNumber } from '@/helpers/numbers'
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
