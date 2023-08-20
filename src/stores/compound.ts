import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FormSubmission } from '@/components/calculator/compound-interest/CompoundInterestForm.vue'
import type { CompoundInterestResult } from 'compound-interest/types/calculator'

export const useCompoundInterestStore = defineStore('compound', () => {
  // Setup stores
  // https://pinia.vuejs.org/core-concepts/#Setup-Stores

  // State
  const options = ref<FormSubmission | null>(null)
  const results = ref<CompoundInterestResult | null>(null)

  // Actions
  function setOptions(submission: FormSubmission) {
    options.value = submission
  }

  function setResults(submission: any) {
    results.value = submission
  }

  return { options, results, setOptions, setResults }
})
