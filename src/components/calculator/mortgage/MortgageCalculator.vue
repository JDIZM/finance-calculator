<template>
  <div class="mortgage-calculator">
    <div class="options">
      <MortgageTypeSelect
        :options="mortgageTypes"
        v-model="store.mortgagetype"
        @change="store.setMortgageType($event.target.value)"
      />
      <p>type of mortgage: {{ store.mortgagetype }}</p>
    </div>
    <form @submit.prevent="calculateMortgage($event)">
      <label>
        Home Value
        <input type="number" name="homeValue" id="homeValue" v-model="homeValue" />
      </label>
      <label>
        Deposit
        <input type="number" name="deposit" id="deposit" v-model="deposit" />
      </label>
      <label>
        Interest Rate
        <input type="number" name="interestRate" id="interestRate" v-model="interestRate" />
      </label>
      <label>
        Years
        <input type="number" name="years" id="years" v-model="years" />
      </label>
      <button type="submit">Submit</button>
    </form>
    <p class="error" v-if="store.error">
      {{ store.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MortgageOptions } from '@jdizm/finance-calculator/types/calculator'
import { mortgageCalculator } from '@jdizm/finance-calculator'
import { useMortgageStore } from '@/stores/mortgage'
import MortgageTypeSelect from '@/components/common/select-options/SelectOptions.vue'

const store = useMortgageStore()

const homeValue = ref(150_000)
const deposit = ref(15_000)
const interestRate = ref(4)
const years = ref(25)

const mortgageTypes = ref([
  {
    text: 'Interest Only',
    value: 'interestOnly'
  },
  {
    text: 'Repayment',
    value: 'repayment'
  }
])

function calculateMortgage(event: Event) {
  console.log('event', event)

  const payload: MortgageOptions = {
    homeValue: homeValue.value,
    interestRate: interestRate.value,
    deposit: deposit.value,
    years: years.value
  }

  try {
    const result = mortgageCalculator(payload, store.mortgagetype)
    store.setError(null)
    store.setOptions(payload)
    store.setResults(result)
  } catch (error) {
    if (error instanceof Error) {
      store.setError(error)
    }
  }
}
</script>

<style scoped lang="scss">
.mortgage-calculator {
  h2,
  p {
    padding: 1rem;
  }

  .error {
    color: var(--color-error);
    padding: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
