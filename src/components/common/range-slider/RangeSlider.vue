<template>
  <div class="range-slider">
    <div class="slider-group">
      <label class="slider-label">
        <span class="label-text">Initial deposit</span>
        <span class="label-value">{{ currency }}{{ initialDeposit.toLocaleString() }}</span>
      </label>
      <input
        type="range"
        :min="initialDepositMin"
        :max="initialDepositMax"
        :step="initialDepositStep"
        v-model.number="initialDeposit"
        class="slider"
      />
      <div class="slider-range">
        <span>{{ currency }}{{ initialDepositMin.toLocaleString() }}</span>
        <span>{{ currency }}{{ initialDepositMax.toLocaleString() }}</span>
      </div>
    </div>

    <div class="slider-group">
      <label class="slider-label">
        <span class="label-text">Monthly contribution</span>
        <span class="label-value">{{ currency }}{{ monthlyContribution.toLocaleString() }}</span>
      </label>
      <input
        type="range"
        :min="monthlyMin"
        :max="monthlyMax"
        :step="monthlyStep"
        v-model.number="monthlyContribution"
        class="slider"
      />
      <div class="slider-range">
        <span>{{ currency }}{{ monthlyMin.toLocaleString() }}</span>
        <span>{{ currency }}{{ monthlyMax.toLocaleString() }}</span>
      </div>
    </div>

    <div class="slider-group">
      <label class="slider-label">
        <span class="label-text">Time period</span>
        <span class="label-value">{{ years }} {{ years === 1 ? 'year' : 'years' }}</span>
      </label>
      <input
        type="range"
        :min="yearsMin"
        :max="yearsMax"
        :step="yearsStep"
        v-model.number="years"
        class="slider"
      />
      <div class="slider-range">
        <span>{{ yearsMin }} {{ yearsMin === 1 ? 'year' : 'years' }}</span>
        <span>{{ yearsMax }} years</span>
      </div>
    </div>

    <div class="slider-group">
      <label class="slider-label">
        <span class="label-text">Interest rate (annual)</span>
        <span class="label-value">{{ interestRate.toFixed(1) }}%</span>
      </label>
      <input
        type="range"
        :min="interestMin"
        :max="interestMax"
        :step="interestStep"
        v-model.number="interestRate"
        class="slider"
      />
      <div class="slider-range">
        <span>{{ interestMin }}%</span>
        <span>{{ interestMax }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Currency = 'GBP' | 'USD' | 'EUR'

withDefaults(
  defineProps<{
    currency?: Currency
    // Initial deposit range
    initialDepositMin?: number
    initialDepositMax?: number
    initialDepositStep?: number
    // Monthly contribution range
    monthlyMin?: number
    monthlyMax?: number
    monthlyStep?: number
    // Years range
    yearsMin?: number
    yearsMax?: number
    yearsStep?: number
    // Interest rate range
    interestMin?: number
    interestMax?: number
    interestStep?: number
  }>(),
  {
    currency: 'GBP',
    initialDepositMin: 0,
    initialDepositMax: 50000,
    initialDepositStep: 500,
    monthlyMin: 0,
    monthlyMax: 5000,
    monthlyStep: 50,
    yearsMin: 1,
    yearsMax: 40,
    yearsStep: 1,
    interestMin: 0,
    interestMax: 15,
    interestStep: 0.1
  }
)

const initialDeposit = defineModel<number>('initialDeposit', { required: true })
const monthlyContribution = defineModel<number>('monthlyContribution', { required: true })
const years = defineModel<number>('years', { required: true })
const interestRate = defineModel<number>('interestRate', { required: true })
</script>

<style lang="scss" scoped>
.range-slider {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;

  .label-text {
    color: var(--color-text);
    font-weight: 500;
  }

  .label-value {
    color: var(--color-heading);
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--color-border);
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-border-hover);
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary);
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.slider-range {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
}
</style>
