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
        <input type="number" name="homeValue" id="homeValue" v-model="homeValue" min="0" />
      </label>
      <label>
        Deposit
        <input type="number" name="deposit" id="deposit" v-model="deposit" min="0" />
      </label>
      <label>
        Interest Rate
        <input
          type="number"
          name="interestRate"
          id="interestRate"
          v-model="interestRate"
          min="0"
          max="99"
          step="any"
        />
      </label>
      <label>
        Years
        <input type="number" name="years" id="years" v-model="years" min="0" />
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
  background: var(--color-background);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  h2,
  p {
    padding: 0;
    margin: 0 0 0.5rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-heading);
  }

  .options {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--color-background-soft);
    border-radius: 8px;

    p {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: var(--color-text);
      font-weight: 500;
    }
  }

  .error {
    color: var(--color-error);
    padding: 0.75rem 1rem;
    background: rgba(231, 101, 81, 0.1);
    border-radius: 6px;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;

    label {
      display: block;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-text);
      margin-bottom: 0.5rem;

      input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid var(--color-border);
        border-radius: 8px;
        font-size: 1rem;
        color: var(--color-heading);
        background: var(--color-background);
        transition: all 0.2s ease;
        margin-top: 0.25rem;

        &:focus {
          border-color: var(--color-primary);
          outline: none;
          box-shadow: 0 0 0 3px rgba(123, 79, 199, 0.1);
        }
      }
    }

    button[type='submit'] {
      width: 100%;
      padding: 1rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(123, 79, 199, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
