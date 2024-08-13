<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const props = defineProps<{
  deposits: number[]
  projection: number[]
}>()

const chartData = ref<ChartData<'line'>>({
  labels: ['1Y', '10Y', '20Y', '25Y'],
  datasets: [
    {
      label: 'Deposits',
      backgroundColor: '#ef5350',
      borderColor: '#ef5350',
      data: props.deposits
    },
    {
      label: 'Projection',
      backgroundColor: '#66bb6a',
      borderColor: '#66bb6a',
      data: props.projection
    },
    {
      label: 'Likely range',
      backgroundColor: '#42a5f5',
      data: props.deposits
    }
  ]
})

const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  }
})
</script>

<style scoped>
.chart-container {
  height: 300px;
  position: relative;
}
</style>
