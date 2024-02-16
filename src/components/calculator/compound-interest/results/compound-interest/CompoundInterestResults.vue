<template>
  <div class="results">
    <h2>Results</h2>
    <p v-if="!results">Submit the form to calculate the compound interest.</p>

    <div class="results-breakdown" v-if="results">
      <h4>Investment Type: {{ results.investmentType }}</h4>
      <p>Total Investment: {{ formattedNumber(results.totalInvestment) }}</p>

      <hr />
      <h4>Compound Interest</h4>
      <p>Total Interest: {{ formattedNumber(results.totalInterest) }}</p>
      <p>End Balance: {{ formattedNumber(results.endBalance) }}</p>
      <p>
        In the final year of the investment you will be earning
        {{ formattedNumber(results.interestPerAnnum[results.interestPerAnnum.length - 1]) }}
        interest per annum.
      </p>

      <div
        class="debt-results"
        v-if="'monthlyRepaymentAmount' in results || 'interestPayments' in results"
      >
        <h4>Debt Repayment</h4>
        <div
          v-if="results.monthlyRepaymentAmount && results.netInvestment && results.totalDebtPaid"
        >
          <p>
            Monthly repayment of <b>{{ formattedNumber(results.monthlyRepaymentAmount) }}</b> with a
            total of <b>{{ results.totalPayments }}</b> months to repay the debt.
          </p>
          <p>Total interest paid: {{ formattedNumber(results.totalDebtPaid) }}</p>
          <p>Net investment: {{ formattedNumber(results.netInvestment) }}</p>
        </div>
        <div v-if="results.interestPayments">
          <p>
            Monthly repayment of
            <b>{{ formattedNumber(results.interestPayments?.monthly) }}</b> with a total of
            <b>{{ results.totalPayments }}</b> months of interest payments.
          </p>
          <p>Total interest paid: {{ formattedNumber(results.totalInvestment) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formattedNumber } from '@/helpers/numbers'

import { useCompoundInterestStore } from '@/stores/compound'

const store = useCompoundInterestStore()

const results = computed(() => {
  return store.results
})
</script>

<style scoped lang="scss">
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
