<template>
  <div class="projection-chart">
    <div class="projection-header">
      <h3 class="projection-title">{{ title }}</h3>
      <p class="projection-subtitle">{{ subtitle }}</p>
    </div>

    <div class="projection-summary">
      <div class="summary-card">
        <span class="summary-label">Total deposits</span>
        <span class="summary-value">{{ currency }}{{ summary.totalDeposits.toLocaleString() }}</span>
      </div>
      <div class="summary-card highlight">
        <span class="summary-label">Interest earned</span>
        <span class="summary-value interest">{{ currency }}{{ summary.totalInterest.toLocaleString() }}</span>
      </div>
      <div class="summary-card primary">
        <span class="summary-label">Projected total</span>
        <span class="summary-value projection">{{ currency }}{{ summary.endBalance.toLocaleString() }}</span>
      </div>
    </div>

    <div class="chart-wrapper">
      <chart-cmp
        :labels="projectionData.labels"
        :deposits="projectionData.deposits"
        :interest="projectionData.interest"
        :projection="projectionData.projection"
        :currency="currency"
        :height="chartHeight"
      />
    </div>

    <div class="controls-wrapper">
      <range-slider
        v-model:initial-deposit="options.initialDeposit"
        v-model:monthly-contribution="options.monthlyContribution"
        v-model:years="options.years"
        v-model:interest-rate="options.interestRate"
        :currency="currency"
      />
    </div>

    <div class="projection-info">
      <p class="info-text">
        In the final year, you'll be earning approximately
        <strong>{{ currency }}{{ finalYearInterest.toLocaleString() }}</strong>
        per year in interest.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import ChartCmp from '@/components/common/chart/ChartCmp.vue'
import RangeSlider from '@/components/common/range-slider/RangeSlider.vue'
import { useCompoundProjection } from '@/composables/useCompoundProjection'

type Currency = 'GBP' | 'USD' | 'EUR'

const currencies = {
  GBP: '£',
  USD: '$',
  EUR: '€'
}

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  currency?: Currency
  chartHeight?: number
  defaultInitialDeposit?: number
  defaultMonthlyContribution?: number
  defaultYears?: number
  defaultInterestRate?: number
}>(), {
  title: 'How much your money could grow',
  subtitle: 'Adjust the sliders below to see your potential returns',
  currency: 'GBP',
  chartHeight: 350,
  defaultInitialDeposit: 5000,
  defaultMonthlyContribution: 500,
  defaultYears: 25,
  defaultInterestRate: 5.0
})

const options = reactive({
  initialDeposit: props.defaultInitialDeposit,
  monthlyContribution: props.defaultMonthlyContribution,
  years: props.defaultYears,
  interestRate: props.defaultInterestRate
})

const { projectionData, summary } = useCompoundProjection(options)

const finalYearInterest = computed(() => {
  return Math.round(summary.value.endBalance * (summary.value.interestRate / 100))
})
</script>

<style scoped lang="scss">
.projection-chart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: var(--color-background);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }
}

.projection-header {
  text-align: center;
  margin-bottom: 1rem;

  .projection-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .projection-subtitle {
    font-size: 1rem;
    color: var(--color-text);
    opacity: 0.8;
  }
}

.projection-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

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
  border-radius: 12px;
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
    font-size: 0.875rem;
    color: var(--color-text);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .summary-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-heading);

    &.interest {
      color: #42a5f5;
    }

    &.projection {
      color: #66bb6a;
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
}

.chart-wrapper {
  margin-bottom: 1rem;
}

.controls-wrapper {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 1rem;
}

.projection-info {
  text-align: center;
  padding: 1rem;
  background: var(--color-background-mute);
  border-radius: 8px;

  .info-text {
    color: var(--color-text);
    font-size: 0.95rem;
    line-height: 1.5;

    strong {
      color: var(--color-heading);
      font-weight: 600;
    }
  }
}
</style>
