import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  InterestOnlyMortgageResult,
  MortgageOptions,
  MortgageResult,
  MortgageType
} from '@jdizm/finance-calculator/types/calculator'

export const useMortgageStore = defineStore('mortgage', () => {
  // Setup stores
  // https://pinia.vuejs.org/core-concepts/#Setup-Stores

  // State
  const options = ref<MortgageOptions | null>(null)
  const mortgagetype = ref<MortgageType>('repayment')
  const results = ref<MortgageResult | InterestOnlyMortgageResult | null>(null)
  const error = ref<Error | null>(null)

  // Actions
  function setOptions(payload: MortgageOptions) {
    options.value = payload
  }

  function setMortgageType(payload: MortgageType) {
    mortgagetype.value = payload
  }

  function setResults(payload: MortgageResult | InterestOnlyMortgageResult) {
    results.value = payload
  }

  function setError(err: Error | null) {
    error.value = err
    results.value = null
  }

  function $reset() {
    options.value = null
    mortgagetype.value = 'repayment'
    results.value = null
    error.value = null
  }

  return {
    options,
    mortgagetype,
    results,
    setOptions,
    setMortgageType,
    setResults,
    error,
    setError,
    $reset
  }
})
