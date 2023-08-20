<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['inFocus', 'submit'])

export interface FormSubmission {
  principal: number
  rate: number
  years: number
  paymentsPerAnnum: number
  isInterestAccruedOnPayments: boolean
  amountPerAnnum: number
  // debtRepayment: number
}

const principal = ref(10_000)
const rate = ref(4)
const years = ref(5)
const paymentsPerAnnum = ref(12)
const amountPerAnnum = ref(0)
const isInterestAccruedOnPayments = ref(false)
// const debtRepayment = ref(0)

const formattedNumber = (num: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(num)
}
// const formattedPercentage = (num: number) => {
//   return new Intl.NumberFormat('en-GB', {
//     style: 'percent'
//   }).format(num)
// }

const handleFormSubmit = (event: Event, submission: FormSubmission) => {
  emit('submit', {
    event,
    submission: {
      ...submission,
      accrualOfPaymentsPerAnnum: submission.amountPerAnnum > 0 ? true : false
    }
  })
}
</script>

<template>
  <div class="compound-interest-form">
    <h2>Compound Interest Form</h2>

    <form
      @submit.prevent="
        handleFormSubmit($event, {
          principal,
          rate,
          years,
          paymentsPerAnnum,
          amountPerAnnum,
          isInterestAccruedOnPayments
        })
      "
    >
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
          <input type="number" name="rate" id="rate" v-model="rate" />
        </label>
        <!-- <span>{{ formattedPercentage(rate) }}</span> -->
        <span>{{ rate }}%</span>
      </div>

      <div class="form-input">
        <label>
          # of years to compound
          <input type="number" name="years" id="years" v-model="years" />
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
          />
        </label>
        <span>{{ paymentsPerAnnum }}</span>
      </div>

      <div class="form-input">
        <label>
          Amount to invest per year
          <input type="number" name="amountPerAnnum" id="amountPerAnnum" v-model="amountPerAnnum" />
        </label>
        <span>{{ formattedNumber(amountPerAnnum) }}</span>
      </div>

      <button type="submit">submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.compound-interest-form {
  border: 1px solid var(--secondary);
  padding: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-input {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    span {
      color: var(--secondary);
      font-weight: bold;
    }
  }

  input {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--secondary);
    background-color: var(--secondary);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    width: 150px;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--secondary);
    background-color: var(--secondary);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    width: 200px;
  }
}
</style>
