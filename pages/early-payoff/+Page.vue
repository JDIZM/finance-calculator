<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-12 md:py-16">
      <Pill tone="light" class="mb-4">Early mortgage payoff</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl">
        Pay it off faster.
      </h1>
      <h2 class="mt-3 font-display text-base font-bold opacity-80 md:text-lg">
        Early mortgage payoff calculator with overpayment savings.
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed opacity-80">
        A little extra each month adds up. See how many months and pounds of interest you save.
      </p>
    </Section>

    <Section tone="transparent">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card tone="cream">
          <h2 class="font-display text-sm font-black uppercase tracking-widest text-ink-900/70">Your mortgage</h2>
          <div class="mt-5 grid gap-4">
            <NumberInput v-model="form.homeValue" label="Home value" prefix="£" :min="0" :step="5000" />
            <NumberInput v-model="form.deposit" label="Deposit" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.interestRate" label="Interest rate" prefix="%" :min="0" :step="0.1" />
            <NumberInput v-model="form.years" label="Term (years)" :min="1" :max="40" :step="1" />
            <NumberInput v-model="form.extraMonthly" label="Extra each month" prefix="£" :min="0" :step="50" hint="Added on top of the normal repayment" />
          </div>
        </Card>

        <div class="flex flex-col gap-5">
          <div v-if="result" class="grid gap-4 sm:grid-cols-3">
            <Card tone="emerald-950" padding="p-5">
              <ResultTile
                label="Months saved"
                :value="result.monthsSaved"
                :hint="yearsSavedLabel"
              />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                label="Interest saved"
                :value="Math.max(0, Math.round(result.interestSaved))"
                prefix="£"
              />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                label="New monthly total"
                :value="Math.round(result.baseMonthlyPayment + (form.extraMonthly ?? 0))"
                prefix="£"
              />
            </Card>
          </div>

          <Card tone="cream">
            <h3 class="font-display text-sm font-black uppercase tracking-widest text-ink-900/70">Baseline vs new</h3>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <div v-else-if="result" class="mt-4 grid gap-4 sm:grid-cols-2">
              <div class="rounded-slab border border-surface-rule bg-surface-cream p-5">
                <p class="font-display text-xs font-bold uppercase tracking-widest opacity-70">Baseline</p>
                <p class="mt-2 font-display text-2xl font-black tabular-nums">{{ result.baselineMonths }} mo</p>
                <p class="mt-1 text-sm opacity-80">£{{ result.baselineTotalInterest.toLocaleString('en-GB') }} interest</p>
              </div>
              <div class="rounded-slab bg-emerald-950 p-5 text-surface-off-white">
                <p class="font-display text-xs font-bold uppercase tracking-widest opacity-80">With extras</p>
                <p class="mt-2 font-display text-2xl font-black tabular-nums">{{ result.newMonths }} mo</p>
                <p class="mt-1 text-sm opacity-90">£{{ result.newTotalInterest.toLocaleString('en-GB') }} interest</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import Section from '@/components/ui/Section.vue'
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import NumberInput from '@/components/ui/NumberInput.vue'
import ResultTile from '@/components/ui/ResultTile.vue'
import { earlyMortgagePayoff } from '@jdizm/finance-calculator'

const form = reactive({
  homeValue: 300_000 as number | null,
  deposit: 30_000 as number | null,
  interestRate: 5 as number | null,
  years: 25 as number | null,
  extraMonthly: 200 as number | null,
})

const outcome = computed(() => {
  try {
    return {
      result: earlyMortgagePayoff({
        homeValue: form.homeValue ?? 0,
        deposit: form.deposit ?? 0,
        interestRate: form.interestRate ?? 0,
        years: form.years ?? 1,
        extraMonthly: form.extraMonthly ?? 0,
      }),
      error: null as string | null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const result = computed(() => outcome.value.result)
const error = computed(() => outcome.value.error)

const yearsSavedLabel = computed(() => {
  if (!result.value) return ''
  const months = result.value.monthsSaved
  if (months === 0) return 'No change at these inputs'
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (years === 0) return `${rem} months off the term`
  if (rem === 0) return `${years} years off the term`
  return `${years}y ${rem}m off the term`
})
</script>
