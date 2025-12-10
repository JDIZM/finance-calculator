<template>
  <main class="calculator-view">
    <div class="page-header">
      <h1>Compound Interest Calculator</h1>
      <p>Calculate your investment growth over time with compound interest</p>
    </div>

    <div class="calculator-layout">
      <div class="calculator-form">
        <compound-interest-form @submit="calculateInterest" />
      </div>

      <div class="calculator-results">
        <div v-if="store.results" class="results-content">
          <compound-interest-results />
        </div>
        <div v-else class="empty-state">
          <div class="empty-state-content">
            <h3>Ready to calculate</h3>
            <p>Fill in the form and click submit to see your compound interest projection</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCompoundInterestStore } from '@/stores/compound'
import CompoundInterestForm from '@/components/calculator/compound-interest/form/CompoundInterestForm.vue'
import CompoundInterestResults from '@/components/calculator/compound-interest/results/compound-interest/CompoundInterestResults.vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'
import type { IOptions } from '@jdizm/finance-calculator/types/calculator'

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
.calculator-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-heading);
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.calculator-layout {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 40% 60%;
    gap: 2.5rem;
  }

  @media (min-width: 1024px) {
    gap: 3rem;
  }
}

.calculator-form {
  @media (min-width: 768px) {
    position: sticky;
    top: calc(60px + 2rem);
    align-self: start;
    max-height: calc(100vh - 60px - 4rem);
    overflow-y: auto;
  }
}

.calculator-results {
  min-height: 400px;

  .results-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 2rem;

  .empty-state-content {
    text-align: center;
    max-width: 400px;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-heading);
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1rem;
      color: var(--color-text);
      line-height: 1.6;
    }
  }
}
</style>
