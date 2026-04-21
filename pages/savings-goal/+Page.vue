<template>
  <main class="font-body">
    <Section tone="accent-indigo" padding="py-12 md:py-16">
      <Pill tone="light" class="mb-4">Savings goal</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl">
        Hit your number.
      </h1>
      <h2 class="mt-3 font-display text-base font-bold opacity-80 md:text-lg">
        Savings goal calculator with compound growth.
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed opacity-80">
        Pick a target. We'll tell you what to save each month, or how long it'll take at your current rate.
      </p>
    </Section>

    <Section tone="transparent">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card tone="cream">
          <SectionLabel tag="h2">Your inputs</SectionLabel>

          <SegmentedToggle
            v-model="mode"
            class="mt-5"
            label="Solve for"
            :options="modeOptions"
          />

          <div class="mt-5 grid gap-4">
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

        <div class="flex flex-col gap-5">
          <div v-if="contributionResult" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card tone="emerald-950" padding="p-5">
              <ResultTile
                label="Per month"
                :value="contributionResult.contributionPerMonth"
                prefix="£"
                :decimals="2"
              />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                label="Total contributions"
                :value="contributionResult.totalContributions"
                prefix="£"
              />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                label="Interest earned"
                :value="contributionResult.interestEarned"
                prefix="£"
              />
            </Card>
          </div>

          <div v-if="yearsResult !== null" class="grid gap-4 sm:grid-cols-2">
            <Card tone="emerald-950" padding="p-5">
              <ResultTile label="Years needed" :value="yearsResult" :decimals="1" hint="To reach your target" />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                label="Total contributed"
                :value="Math.round((form.contributionPerMonth ?? 0) * 12 * yearsResult)"
                prefix="£"
              />
            </Card>
          </div>

          <Card tone="cream">
            <SectionLabel>The maths</SectionLabel>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <p v-else class="mt-3 leading-relaxed">
              Assumes compounding {{ form.compoundingPerYear }} times per year.
              Real-world returns vary, so treat this as a planning estimate, not a promise.
            </p>
          </Card>
        </div>
      </div>

      <RelatedCalculators class="mt-12" :slugs="['compound-interest', 'fire', 'mortgage']" />
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
import SectionLabel from '@/components/ui/SectionLabel.vue'
import RelatedCalculators from '@/components/marketing/RelatedCalculators.vue'
import SegmentedToggle from '@/components/ui/SegmentedToggle.vue'
import { solveContributionForGoal, solveYearsToGoal } from '@jdizm/finance-calculator'

type Mode = 'contribution' | 'years'
const mode = ref<Mode>('contribution')
const modeOptions: ReadonlyArray<{ value: Mode; label: string }> = [
  { value: 'contribution', label: 'Monthly amount' },
  { value: 'years', label: 'Years' },
]

const form = reactive({
  target: 100_000 as number | null,
  startingBalance: 5_000 as number | null,
  annualRate: 7 as number | null,
  years: 10 as number | null,
  contributionPerMonth: 500 as number | null,
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
