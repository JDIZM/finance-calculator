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
        <label>
          How much do you want to invest per year?
          <input
            type="number"
            name="amountPerAnnum"
            id="amountPerAnnum"
            v-model="amountPerAnnum"
            min="0"
          />
        </label>
        <span>{{ formattedNumber(amountPerAnnum) }}</span>
      </div>

      <div class="form-input">
        <DebtRepaymentOption
          :type="debtType"
          :rate="debtInterestRate"
          @rate="debtInterestRate = $event"
          @type="debtType = $event"
          v-model="isDebtRepayment"
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
  border: 1px solid var(--color-secondary);
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-input {
    input {
      display: block;
      margin: 0.5rem 0.5rem 0.5rem 0;
    }

    label {
      display: block;
    }

    span {
      color: var(--color-secondary);
      font-weight: bold;
    }
  }
}
</style>
