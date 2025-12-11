<template>
  <div class="compound-interest-form">
    <h2>Compound Interest Form</h2>

    <form @submit.prevent="handleFormSubmit($event)">
      <div class="form-input">
        <label>
          Principal
          <input type="number" name="principal" id="principal" v-model="principal" />
        </label>
        <span>{{ formattedNumber(principal) }}</span>
      </div>

      <div class="form-input">
        <label>
          Interest Rate (per annum)
          <input type="number" name="rate" id="rate" v-model="rate" min="0" max="99" step="any" />
        </label>
        <span>{{ rate }}%</span>
      </div>

      <div class="form-input">
        <label>
          # of years to compound
          <input type="number" name="years" id="years" v-model="years" min="0" />
        </label>
        <span>{{ years }}</span>
      </div>

      <div class="form-input">
        <label>
          payments per year (12 for monthly)
          <input
            type="number"
            name="paymentsPerAnnum"
            id="paymentsPerAnnum"
            v-model="paymentsPerAnnum"
            min="0"
            max="12"
          />
        </label>
        <span>{{ paymentsPerAnnum }}</span>
      </div>

      <div class="form-input">
        <h3>Contributions</h3>
        <p v-if="isDebtRepayment" class="warning">Contributions are disabled for debtRepayment</p>
        <label>
          How much do you want to invest per year?
          <input
            type="number"
            name="amountPerAnnum"
            id="amountPerAnnum"
            v-model="amountPerAnnum"
            min="0"
            :disabled="isDebtRepayment"
          />
        </label>
        <span>{{ formattedNumber(amountPerAnnum) }}</span>
      </div>

      <div class="form-input">
        <DebtRepaymentOption
          v-model="isDebtRepayment"
          v-model:rate="rate"
          v-model:type="debtType"
        />
      </div>

      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formattedNumber } from '@/helpers/numbers'
import DebtRepaymentOption from '@/components/calculator/compound-interest/debt-repayment/DebtRepaymentOption.vue'
import type { IOptions } from '@jdizm/finance-calculator/types/calculator'

const emit = defineEmits<{
  (event: 'submit', payload: { event: Event; submission: IOptions }): void
}>()

const principal = ref(10_000)
const rate = ref(4)
const years = ref(5)
const paymentsPerAnnum = ref(12)
const amountPerAnnum = ref(0)
const isDebtRepayment = ref(false)
const debtType = ref<'interestOnly' | 'repayment'>('interestOnly')
const debtInterestRate = ref(6)

const handleFormSubmit = (event: Event) => {
  let submissionPayload: IOptions = {
    type: 'lumpSum',
    principal: principal.value,
    rate: rate.value,
    years: years.value,
    paymentsPerAnnum: paymentsPerAnnum.value
  }

  if (isDebtRepayment.value) {
    submissionPayload = {
      ...submissionPayload,
      type: 'debtRepayment',
      debtRepayment: {
        type: debtType.value,
        interestRate: debtInterestRate.value
      }
    }
  }

  if (amountPerAnnum.value > 0 && !isDebtRepayment.value) {
    submissionPayload = {
      ...submissionPayload,
      type: 'contribution',
      amountPerAnnum: amountPerAnnum.value,
      accrualOfPaymentsPerAnnum: true
    }
  }

  emit('submit', {
    event,
    submission: submissionPayload
  })
}
</script>

<style lang="scss" scoped>
.compound-interest-form {
  background: var(--color-background);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 0.5rem;
    padding: 0;
  }

  .warning {
    color: var(--color-warning);
    font-size: 0.875rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(231, 101, 81, 0.1);
    border-radius: 6px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .form-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-heading);
      margin: 1rem 0 0.5rem 0;
      padding: 0;
    }

    label {
      display: block;
      font-weight: 500;
      font-size: 0.9rem;
      color: var(--color-text);
      margin-bottom: 0.25rem;
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid var(--color-border);
      border-radius: 8px;
      font-size: 1rem;
      color: var(--color-heading);
      background: var(--color-background);
      transition: all 0.2s ease;
      margin: 0;

      &:focus {
        border-color: var(--color-primary);
        outline: none;
        box-shadow: 0 0 0 3px rgba(123, 79, 199, 0.1);
      }

      &:disabled {
        background-color: var(--color-background-soft);
        color: var(--color-text);
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    span {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.875rem;
      padding: 0.25rem 0;
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
</style>
