<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-12 md:py-16">
      <Pill tone="light" class="mb-4">Compound interest</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl">
        How much will your money grow?
      </h1>
      <h2 class="mt-3 font-display text-base font-bold opacity-80 md:text-lg">
        Compound interest calculator with monthly contributions.
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed opacity-80">
        Four inputs: starting balance, monthly contribution, interest rate, and time.
      </p>
    </Section>

    <Section tone="transparent">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card tone="cream">
          <SectionLabel tag="h2" size="lg">Your inputs</SectionLabel>
          <div class="mt-5 grid gap-4">
            <NumberInput v-model="form.principal" label="Starting balance" prefix="£" :min="0" :step="100" />
            <NumberInput v-model="form.monthlyContribution" label="Monthly contribution" prefix="£" :min="0" :step="50" />
            <NumberInput v-model="form.rate" label="Annual rate" prefix="%" :min="0" :step="0.1" />
            <NumberInput v-model="form.years" label="Years" :min="1" :max="60" :step="1" />
          </div>
        </Card>

        <div class="flex flex-col gap-5">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card tone="subtle" padding="p-5">
              <ResultTile label="Total contributions" :value="summary.totalContributions" prefix="£" />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile label="Interest earned" :value="summary.totalInterest" prefix="£" />
            </Card>
            <Card tone="emerald-950" padding="p-5">
              <ResultTile label="Final balance" :value="summary.endBalance" prefix="£" />
            </Card>
          </div>

          <Card tone="cream">
            <SectionLabel>Projection</SectionLabel>
            <div v-if="ChartCmp" class="mt-4 h-72 md:h-80">
              <component
                :is="ChartCmp"
                :labels="chartData.labels"
                :deposits="chartData.deposits"
                :interest="chartData.interest"
                :projection="chartData.projection"
                currency="£"
                :height="320"
              />
            </div>
            <div v-else class="mt-4 h-72 animate-pulse rounded-slab bg-surface-rule md:h-80" aria-label="Loading chart" />
          </Card>
        </div>
      </div>

      <RelatedCalculators class="mt-12" :slugs="['savings-goal', 'fire', 'mortgage']" />
    </Section>
  </main>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, shallowRef } from 'vue'
import type { Component } from 'vue'
import Section from '@/components/ui/Section.vue'
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import NumberInput from '@/components/ui/NumberInput.vue'
import ResultTile from '@/components/ui/ResultTile.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import RelatedCalculators from '@/components/marketing/RelatedCalculators.vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'

const form = reactive({
  principal: 5_000 as number | null,
  monthlyContribution: 500 as number | null,
  rate: 7 as number | null,
  years: 25 as number | null,
})

// Single source of truth for the "effective" form values so the result tiles,
// total-contributions tile, and chart all agree when inputs are cleared/null.
const normalised = computed(() => ({
  principal: form.principal ?? 0,
  monthlyContribution: form.monthlyContribution ?? 0,
  rate: form.rate ?? 0,
  // Floor to a whole year: compoundInterestPerPeriod indexes its yearly interest matrix by
  // integer keys, so a decimal like 25.5 throws and would blank the whole result.
  years: Math.max(1, Math.floor(form.years ?? 1)),
}))

const results = computed(() => {
  const { principal, monthlyContribution, rate, years } = normalised.value
  try {
    return compoundInterestPerPeriod({
      type: 'contribution',
      principal,
      rate,
      years,
      paymentsPerAnnum: 12,
      amountPerAnnum: monthlyContribution * 12,
      accrualOfPaymentsPerAnnum: true,
    })
  } catch {
    return null
  }
})

const summary = computed(() => {
  const r = results.value
  if (!r) return { totalContributions: 0, totalInterest: 0, endBalance: 0 }
  const { principal, monthlyContribution, years } = normalised.value
  const totalContributions = monthlyContribution * 12 * years
  return {
    totalContributions: Math.round(totalContributions + principal),
    totalInterest: Math.round(r.totalInterest),
    endBalance: Math.round(r.endBalance),
  }
})

const chartData = computed(() => {
  const r = results.value
  if (!r) return { labels: [], deposits: [], interest: [], projection: [] }
  const { principal, monthlyContribution, years } = normalised.value
  const labels: string[] = []
  const deposits: number[] = []
  const interest: number[] = []
  const projection: number[] = []
  let runningInterest = 0

  for (let y = 1; y <= years; y += 1) {
    labels.push(`${y}y`)
    const contributed = principal + monthlyContribution * 12 * y
    deposits.push(Math.round(contributed))
    runningInterest += r.interestPerAnnum[y - 1] ?? 0
    interest.push(Math.round(runningInterest))
    const balances = r.interestMatrix.get(`${y}`)
    const endOfYear = balances ? balances[balances.length - 1] ?? contributed : contributed
    projection.push(Math.round(endOfYear))
  }
  return { labels, deposits, interest, projection }
})

const ChartCmp = shallowRef<Component | null>(null)
onMounted(async () => {
  const mod = await import('@/components/common/chart/ChartCmp.vue')
  ChartCmp.value = mod.default
})
</script>
