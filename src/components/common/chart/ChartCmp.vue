<template>
  <div class="chart-container">
    <Line :key="chartKey" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
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
  LineElement,
  Filler
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
)

const props = withDefaults(defineProps<{
  labels?: string[]
  deposits: number[]
  interest?: number[]
  projection: number[]
  height?: number
  showLegend?: boolean
  currency?: string
}>(), {
  labels: () => ['1Y', '10Y', '20Y', '25Y'],
  height: 300,
  showLegend: true,
  currency: '£'
})

const chartKey = ref(0)

const chartData = computed<ChartData<'line'>>(() => {
  const datasets: ChartData<'line'>['datasets'] = [
    {
      label: 'Deposits',
      backgroundColor: 'rgba(239, 83, 80, 0.1)',
      borderColor: '#ef5350',
      borderWidth: 2,
      data: props.deposits,
      fill: 'origin',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
    },
    {
      label: 'Projection',
      backgroundColor: 'rgba(102, 187, 106, 0.2)',
      borderColor: '#66bb6a',
      borderWidth: 3,
      data: props.projection,
      fill: 'origin',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]

  if (props.interest && props.interest.length > 0) {
    datasets.splice(1, 0, {
      label: 'Interest Earned',
      backgroundColor: 'rgba(66, 165, 245, 0.15)',
      borderColor: '#42a5f5',
      borderWidth: 2,
      data: props.interest,
      fill: 'origin',
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
    })
  }

  return {
    labels: props.labels,
    datasets
  }
})

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: {
      display: props.showLegend,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 15,
        font: {
          size: 12,
          weight: '500'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        size: 13
      },
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || ''
          const value = context.parsed.y
          return `${label}: ${props.currency}${value.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grace: '10%',
      ticks: {
        callback: (value) => `${props.currency}${Number(value).toLocaleString()}`,
        font: {
          size: 11
        }
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    }
  },
  animation: {
    duration: 750,
    easing: 'easeInOutQuart'
  }
}))

// Force chart update when data changes
watch(() => [props.deposits, props.projection, props.interest], () => {
  chartKey.value++
}, { deep: true })
</script>

<style scoped lang="scss">
.chart-container {
  height: v-bind('`${height}px`');
  position: relative;
  padding: 1rem;
  background: var(--color-background);
  border-radius: 12px;
}
</style>
