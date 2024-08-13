<template>
  <main>
    <h2>Finance tools and calculators</h2>

    <RouterLink to="/mortgage-calculator">
      <h4>Mortgage calculator</h4>
    </RouterLink>
    <p>A helping hand on the property ladder</p>

    <RouterLink to="/compound-interest-calculator">
      <h4>Compound interest calculator</h4>
    </RouterLink>

    <p>A helping hand on the property ladder</p>
    <range-slider v-model="rangeModel" :options="rangeSliderProps.options" />

    <chart-cmp :deposits="deposits" :projection="projection" />
  </main>
</template>

<script setup lang="ts">
import RangeSlider from '@/components/common/range-slider/RangeSlider.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ChartCmp from '@/components/common/chart/ChartCmp.vue'

const rangeModel = ref('interest-only')

const rangeSliderProps = {
  options: []
}

const deposits = [1000, 2000, 3000, 4000]
const projection = [2000, 3000, 4000, 5000]
</script>
