import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CompoundInterestResult, IOptions } from '@jdizm/finance-calculator/types/calculator'

export const useCompoundInterestStore = defineStore('compound', () => {
  // Setup stores
  // https://pinia.vuejs.org/core-concepts/#Setup-Stores

  // State
  const options = ref<IOptions | null>(null)
  const results = ref<CompoundInterestResult | null>(null)
  const error = ref<Error | null>(null)

  // Actions
  function setOptions(submission: IOptions) {
    options.value = submission
  }

  function setResults(submission: CompoundInterestResult) {
    results.value = submission
  }

  function setError(err: Error | null) {
    error.value = err
  }

  return { options, results, setOptions, setResults, error, setError }
})
