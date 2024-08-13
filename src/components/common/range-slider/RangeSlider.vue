<template>
  <div class="range-slider">
    <h4 class="title">How much your money could grow</h4>
    <div class="panel">
      <span>25 years</span>
      <div class="amount">
        <span>£513,000.79</span>
        <span class="subtitle">Projection</span>
      </div>
    </div>
    <div class="chart"></div>
    <div class="slider">
      <label>
        Monthly deposits: £1,000
        <input id="range" type="range" min="5" max="100" step="1" v-model="selected" />
      </label>
      <p>{{ selected }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { options } = defineProps({
  options: { type: Array<{ text: string; value: string }>, required: true }
})

type Model = 'interest-only' | 'repayment'
type Currency = 'GBP' | 'USD' | 'EUR'
const CURRENCY: Currency = 'GBP'

const currencies = {
  GBP: '£',
  USD: '$',
  EUR: '€'
}
type CurrencySymbol = (typeof currencies)[keyof typeof currencies]

const selected = defineModel({ required: true })
const depositAmount = 1000
</script>

<style lang="scss" scoped>
.range-slider {
  background-color: #112231;
  height: 100%;
  min-width: 300px;
  min-height: 400px;
  padding: 1rem;
}

.title {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.chart {
  height: 200px;
  background-color: #fff;
}

.panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}

.subtitle {
  color: #fff;
  font-size: 0.75rem;
}
</style>
