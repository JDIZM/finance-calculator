<template>
  <div class="compound-interest-calc">
    <h2>Compound Interest Calculator</h2>
    <p>a simple compound interest calculator</p>
    <CompoundInterestForm @submit="calculateInterest" />
    <p class="error" v-if="store.error">
      {{ store.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import CompoundInterestForm, {
  type FormSubmission
} from '@/components/calculator/compound-interest/CompoundInterestForm.vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'

import { useCompoundInterestStore } from '@/stores/compound'

const store = useCompoundInterestStore()

const calculateInterest = (e: { event: Event; submission: FormSubmission }) => {
  try {
    const result = compoundInterestPerPeriod(e.submission)
    console.log('result', result)
    store.setError(null)
    store.setOptions(e.submission)
    store.setResults(result)
  } catch (error) {
    console.error(error)
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
