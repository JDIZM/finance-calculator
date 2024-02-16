<template>
  <div class="results" v-if="store.results">
    <h2>Mortgage Results</h2>
    <p>
      Your monthly mortgage repayment for a <strong>{{ store.mortgagetype }}</strong> mortgage would
      be
      <span v-if="store.mortgagetype === 'repayment' && 'monthlyRepayment' in store.results">
        <strong>{{ formattedNumber(store.results.monthlyRepayment) }}</strong>
      </span>
      <span v-if="store.mortgagetype === 'interestOnly' && 'interestPayments' in store.results">
        <strong>{{ formattedNumber(store.results.interestPayments.monthly) }}</strong>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMortgageStore } from '@/stores/mortgage'
import { formattedNumber } from '@/helpers/numbers'

const store = useMortgageStore()
</script>

<style lang="scss" scoped>
.results {
  padding: 1rem;
}
</style>
