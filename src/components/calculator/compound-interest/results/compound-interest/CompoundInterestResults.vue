<template>
  <div class="results">
    <div v-if="results" class="results-container">
      <!-- Chart Section -->
      <div v-if="chartData" class="chart-section">
        <h3>Investment Growth Projection</h3>
        <chart-cmp
          :labels="chartData.labels"
          :deposits="chartData.deposits"
          :interest="chartData.interest"
          :projection="chartData.projection"
          :height="400"
          currency="£"
        />
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <span class="summary-label">Total Investment</span>
          <span class="summary-value">{{ formattedNumber(results.totalInvestment) }}</span>
        </div>
        <div class="summary-card highlight">
          <span class="summary-label">Total Interest</span>
          <span class="summary-value interest">{{ formattedNumber(results.totalInterest) }}</span>
        </div>
        <div class="summary-card primary">
          <span class="summary-label">End Balance</span>
          <span class="summary-value projection">{{ formattedNumber(results.endBalance) }}</span>
        </div>
      </div>

      <!-- Detailed Results -->
      <div class="results-breakdown">
        <h3>Investment Details</h3>
        <div class="detail-item">
          <span class="detail-label">Investment Type:</span>
          <span class="detail-value">{{ results.investmentType }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Years:</span>
          <span class="detail-value">{{ results.years }} years</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Interest Rate:</span>
          <span class="detail-value">{{ (results.rate * 100).toFixed(2) }}% per annum</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Final Year Interest:</span>
          <span class="detail-value">
            {{ formattedNumber(results.endBalance * results.rate) }} per annum
          </span>
        </div>
      </div>

      <!-- Debt Repayment Section -->
      <div
        class="debt-results"
        v-if="'monthlyRepaymentAmount' in results || 'interestPayments' in results"
      >
        <h3>Debt Repayment Details</h3>
        <div
          v-if="results.monthlyRepaymentAmount && results.netInvestment && results.totalDebtPaid"
          class="debt-breakdown"
        >
          <div class="detail-item">
            <span class="detail-label">Monthly Repayment:</span>
            <span class="detail-value">{{ formattedNumber(results.monthlyRepaymentAmount) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Payments:</span>
            <span class="detail-value">{{ results.totalPayments }} months</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Interest Paid:</span>
            <span class="detail-value">{{ formattedNumber(results.totalDebtPaid) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Net Investment:</span>
            <span class="detail-value">{{ formattedNumber(results.netInvestment) }}</span>
          </div>
        </div>
        <div v-if="results.interestPayments" class="debt-breakdown">
          <div class="detail-item">
            <span class="detail-label">Monthly Payment:</span>
            <span class="detail-value">{{ formattedNumber(results.interestPayments?.monthly) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Payments:</span>
            <span class="detail-value">{{ results.totalPayments}} months</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Interest Paid:</span>
            <span class="detail-value">{{ formattedNumber(results.totalInvestment) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formattedNumber } from '@/helpers/numbers'
import { useCompoundInterestStore } from '@/stores/compound'
import ChartCmp from '@/components/common/chart/ChartCmp.vue'
import type { CompoundInterestResult } from '@jdizm/finance-calculator/types/calculator'

const store = useCompoundInterestStore()

const results = computed(() => {
  return store.results
})

const chartData = computed(() => {
  if (!results.value) return null

  const labels: string[] = []
  const deposits: number[] = []
  const interest: number[] = []
  const projection: number[] = []

  const res = results.value as CompoundInterestResult
  const years = res.years

  // Return null if interestMatrix is not available (e.g., in Storybook mocks)
  if (!res.interestMatrix) return null

  // Generate data points
  for (let year = 1; year <= years; year++) {
    // Show first year, every 5 years, and final year
    if (year === 1 || year % 5 === 0 || year === years) {
      const balanceAtYear = res.interestMatrix.get(String(year))
      const endBalanceAtYear = balanceAtYear ? balanceAtYear[11] : 0

      // Calculate total deposits up to this year
      let totalDeposits = res.principal
      if (res.investmentType === 'contribution' && store.options) {
        const monthlyContribution = (store.options.amountPerAnnum || 0) / 12
        totalDeposits = res.principal + (monthlyContribution * 12 * year)
      }

      // Calculate interest earned
      const interestEarned = endBalanceAtYear - totalDeposits

      labels.push(year === 1 ? '1Y' : `${year}Y`)
      deposits.push(Math.round(totalDeposits))
      interest.push(Math.round(interestEarned))
      projection.push(Math.round(endBalanceAtYear))
    }
  }

  return { labels, deposits, interest, projection }
})
</script>

<style scoped lang="scss">
.results {
  background: var(--color-background);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.chart-section {
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: 1rem;
  }
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--color-background-soft);
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.highlight {
    border-color: #42a5f5;
    background: rgba(66, 165, 245, 0.05);
  }

  &.primary {
    border-color: #66bb6a;
    background: rgba(102, 187, 106, 0.05);
  }

  .summary-label {
    font-size: 0.75rem;
    color: var(--color-text);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .summary-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-heading);

    &.interest {
      color: #42a5f5;
    }

    &.projection {
      color: #66bb6a;
    }

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }
}

.results-breakdown,
.debt-results {
  background: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 10px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-heading);
    margin-bottom: 1rem;
  }
}

.detail-item,
.debt-breakdown .detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  .detail-label {
    font-size: 0.9rem;
    color: var(--color-text);
    font-weight: 500;
  }

  .detail-value {
    font-size: 0.95rem;
    color: var(--color-heading);
    font-weight: 600;
    text-align: right;
  }
}
</style>
