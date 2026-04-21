<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-16 md:py-20">
      <Pill tone="light" class="mb-6">Compound interest</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-6xl">
        How much will your money grow?
      </h1>
      <p class="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
        Starting balance, monthly contribution, interest rate, and time. That's it.
      </p>
    </Section>

    <Section tone="transparent" padding="py-12 md:py-16">
      <div class="grid gap-8 lg:grid-cols-[440px_1fr]">
        <Card tone="emerald-950" padding="p-8">
          <h2 class="font-display text-xl font-black tracking-tight">Your inputs</h2>
          <div class="mt-6 grid gap-5">
            <NumberInput
              v-model="form.principal"
              label="Starting balance"
              prefix="£"
              :min="0"
              :step="100"
            />
            <NumberInput
              v-model="form.monthlyContribution"
              label="Monthly contribution"
              prefix="£"
              :min="0"
              :step="50"
            />
            <NumberInput
              v-model="form.rate"
              label="Annual rate"
              prefix="%"
              :min="0"
              :step="0.1"
            />
            <NumberInput
              v-model="form.years"
              label="Years"
              :min="1"
              :max="60"
              :step="1"
            />
          </div>
        </Card>

        <div class="flex flex-col gap-6">
          <div class="grid gap-4 sm:grid-cols-3">
            <Card tone="cream" padding="p-6">
              <ResultTile
                label="Total contributions"
                :value="summary.totalContributions"
                prefix="£"
              />
            </Card>
            <Card tone="cream" padding="p-6">
              <ResultTile
                label="Interest earned"
                :value="summary.totalInterest"
                prefix="£"
              />
            </Card>
            <Card tone="accent-indigo" padding="p-6">
              <ResultTile
                label="Final balance"
                :value="summary.endBalance"
                prefix="£"
              />
            </Card>
          </div>

          <Card tone="cream" padding="p-6 md:p-8">
            <h3 class="font-display text-lg font-black uppercase tracking-widest">Projection</h3>
            <div v-if="isClient" class="mt-4 h-80">
              <ChartCmp
                :labels="chartData.labels"
                :deposits="chartData.deposits"
                :interest="chartData.interest"
                :projection="chartData.projection"
                currency="£"
                :height="320"
              />
            </div>
            <div v-else class="mt-4 h-80 animate-pulse rounded-slab bg-surface-rule" />
          </Card>
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from 'vue'
import Section from '@/components/ui/Section.vue'
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import NumberInput from '@/components/ui/NumberInput.vue'
import ResultTile from '@/components/ui/ResultTile.vue'
import ChartCmp from '@/components/common/chart/ChartCmp.vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'

const form = reactive({
  principal: 5_000,
  monthlyContribution: 500,
  rate: 7,
  years: 25,
})

const results = computed(() => {
  const principal = form.principal ?? 0
  const monthlyContribution = form.monthlyContribution ?? 0
  const rate = form.rate ?? 0
  const years = Math.max(1, form.years ?? 1)

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
  const totalContributions = (form.monthlyContribution ?? 0) * 12 * (form.years ?? 0)
  return {
    totalContributions: Math.round(totalContributions + (form.principal ?? 0)),
    totalInterest: Math.round(r.totalInterest),
    endBalance: Math.round(r.endBalance),
  }
})

const chartData = computed(() => {
  const r = results.value
  if (!r) return { labels: [], deposits: [], interest: [], projection: [] }
  const labels: string[] = []
  const deposits: number[] = []
  const interest: number[] = []
  const projection: number[] = []
  let runningInterest = 0

  for (let y = 1; y <= (form.years ?? 0); y += 1) {
    labels.push(`${y}y`)
    const contributed = (form.principal ?? 0) + (form.monthlyContribution ?? 0) * 12 * y
    deposits.push(Math.round(contributed))
    runningInterest += r.interestPerAnnum[y - 1] ?? 0
    interest.push(Math.round(runningInterest))
    const balances = r.interestMatrix.get(`${y}`)
    const endOfYear = balances ? balances[balances.length - 1] ?? contributed : contributed
    projection.push(Math.round(endOfYear))
  }
  return { labels, deposits, interest, projection }
})

const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
</script>
