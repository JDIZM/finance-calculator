<template>
  <div class="compound-interest-calc">
    <h2>Compound Interest Calculator</h2>
    <p>a simple compound interest calculator</p>
    <compound-interest-form @submit="calculateInterest" />
    <p class="error" v-if="store.error">
      {{ store.error }}
    </p>
    <compound-interest-results />
  </div>
</template>

<script setup lang="ts">
import CompoundInterestResults from '../results/compound-interest/CompoundInterestResults.vue'
import CompoundInterestForm from '@/components/calculator/compound-interest/form/CompoundInterestForm.vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'
import type { IOptions } from '@jdizm/finance-calculator/types/calculator'

import { useCompoundInterestStore } from '@/stores/compound'

const store = useCompoundInterestStore()

const calculateInterest = (e: { event: Event; submission: IOptions }) => {
  try {
    const result = compoundInterestPerPeriod(e.submission)
    store.setError(null)
    store.setOptions(e.submission)
    store.setResults(result)
  } catch (error) {
    if (error instanceof Error) {
      store.setError(error)
    }
  }
}
</script>

<style scoped lang="scss">
.compound-interest-calc {
  h2,
  p {
    padding: 1rem;
  }

  .error {
    color: var(--color-error);
  }
}
</style>
