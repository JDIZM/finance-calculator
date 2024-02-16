<template>
  <main>
    <compound-interest-calc />
  </main>
</template>

<script setup lang="ts">
import { useCompoundInterestStore } from '@/stores/compound'
import CompoundInterestCalc from '@/components/calculator/compound-interest/calc/CompoundInterestCalc.vue'

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
</script>

<style lang="scss" scoped>
.results {
  padding: 1rem;

  &-breakdown {
    h4,
    p {
      margin-bottom: 1rem;
    }

    hr {
      margin-bottom: 1rem;
    }
  }
}
</style>
