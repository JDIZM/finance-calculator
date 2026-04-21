<template>
  <main class="font-body">
    <Section tone="accent-indigo" padding="py-16 md:py-20">
      <Pill tone="light" class="mb-6">Savings goal</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-6xl">
        Hit your number.
      </h1>
      <p class="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
        Pick a target and we'll tell you what to save each month — or how long it'll take at your current rate.
      </p>
    </Section>

    <Section tone="transparent" padding="py-12 md:py-16">
      <div class="grid gap-8 lg:grid-cols-[440px_1fr]">
        <Card tone="accent-indigo" padding="p-8">
          <h2 class="font-display text-xl font-black tracking-tight">Your inputs</h2>

          <div class="mt-6 flex gap-2 rounded-slab bg-white/5 p-1">
            <button
              type="button"
              :class="[
                'flex-1 rounded-slab px-4 py-2 font-display text-sm font-bold transition',
                mode === 'contribution' ? 'bg-emerald-500 text-emerald-950' : 'text-surface-off-white/80 hover:text-surface-off-white',
              ]"
              @click="mode = 'contribution'"
            >
              Monthly amount
            </button>
            <button
              type="button"
              :class="[
                'flex-1 rounded-slab px-4 py-2 font-display text-sm font-bold transition',
                mode === 'years' ? 'bg-emerald-500 text-emerald-950' : 'text-surface-off-white/80 hover:text-surface-off-white',
              ]"
              @click="mode = 'years'"
            >
              Years
            </button>
          </div>

          <div class="mt-6 grid gap-5">
            <NumberInput v-model="form.target" label="Target" prefix="£" :min="1" :step="1000" />
            <NumberInput v-model="form.startingBalance" label="Starting balance" prefix="£" :min="0" :step="500" />
            <NumberInput v-model="form.annualRate" label="Annual rate" prefix="%" :min="0" :step="0.1" />
            <NumberInput
              v-if="mode === 'contribution'"
              v-model="form.years"
              label="Years"
              :min="1"
              :max="60"
              :step="1"
            />
            <NumberInput
              v-else
              v-model="form.contributionPerMonth"
              label="Monthly contribution"
              prefix="£"
              :min="0"
              :step="50"
            />
          </div>
        </Card>

        <div class="flex flex-col gap-6">
          <div v-if="contributionResult" class="grid gap-4 sm:grid-cols-3">
            <Card tone="cream" padding="p-6">
              <ResultTile
                label="Per month"
                :value="contributionResult.contributionPerMonth"
                prefix="£"
                :decimals="2"
              />
            </Card>
            <Card tone="cream" padding="p-6">
              <ResultTile
                label="Total contributions"
                :value="contributionResult.totalContributions"
                prefix="£"
              />
            </Card>
            <Card tone="emerald-950" padding="p-6">
              <ResultTile
                label="Interest earned"
                :value="contributionResult.interestEarned"
                prefix="£"
              />
            </Card>
          </div>

          <div v-if="yearsResult !== null" class="grid gap-4 sm:grid-cols-2">
            <Card tone="cream" padding="p-6">
              <ResultTile label="Years needed" :value="yearsResult" :decimals="1" hint="To reach your target" />
            </Card>
            <Card tone="emerald-950" padding="p-6">
              <ResultTile
                label="Total contributed"
                :value="Math.round((form.contributionPerMonth ?? 0) * 12 * yearsResult)"
                prefix="£"
              />
            </Card>
          </div>

          <Card tone="cream" padding="p-6 md:p-8">
            <h3 class="font-display text-lg font-black uppercase tracking-widest">The maths</h3>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <p v-else class="mt-3 leading-relaxed">
              Assumes compounding {{ form.compoundingPerYear }} times per year.
              Real-world returns vary — treat this as a planning estimate, not a promise.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

import Section from '@/components/ui/Section.vue'
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import NumberInput from '@/components/ui/NumberInput.vue'
import ResultTile from '@/components/ui/ResultTile.vue'
import { solveContributionForGoal, solveYearsToGoal } from '@jdizm/finance-calculator'

type Mode = 'contribution' | 'years'
const mode = ref<Mode>('contribution')

const form = reactive({
  target: 100_000,
  startingBalance: 5_000,
  annualRate: 7,
  years: 10,
  contributionPerMonth: 500,
  compoundingPerYear: 12,
})

const contributionOutcome = computed(() => {
  if (mode.value !== 'contribution') return { result: null, error: null }
  try {
    return {
      result: solveContributionForGoal({
        target: form.target ?? 0,
        years: form.years ?? 1,
        annualRate: form.annualRate ?? 0,
        startingBalance: form.startingBalance ?? 0,
        compoundingPerYear: form.compoundingPerYear,
      }),
      error: null as string | null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const yearsOutcome = computed(() => {
  if (mode.value !== 'years') return { result: null, error: null }
  try {
    return {
      result: solveYearsToGoal({
        target: form.target ?? 0,
        contributionPerMonth: form.contributionPerMonth ?? 0,
        annualRate: form.annualRate ?? 0,
        startingBalance: form.startingBalance ?? 0,
        compoundingPerYear: form.compoundingPerYear,
      }),
      error: null as string | null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const contributionResult = computed(() => contributionOutcome.value.result)
const yearsResult = computed(() => yearsOutcome.value.result)
const error = computed(() => contributionOutcome.value.error ?? yearsOutcome.value.error)
</script>
