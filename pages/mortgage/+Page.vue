<template>
  <main class="font-body">
    <Section tone="ink-950" padding="py-12 md:py-16">
      <Pill tone="light" class="mb-4">Mortgage</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl">
        What will the repayments be?
      </h1>
      <h2 class="mt-3 font-display text-base font-bold opacity-80 md:text-lg">
        UK mortgage calculator for monthly repayments and total interest.
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed opacity-80">
        Repayment or interest-only. See the monthly cost and what it costs you in interest over the full term.
      </p>
    </Section>

    <Section tone="transparent">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card tone="cream">
          <SectionLabel tag="h2">Your inputs</SectionLabel>

          <SegmentedToggle
            v-model="type"
            class="mt-5"
            label="Mortgage type"
            :options="mortgageTypeOptions"
          />

          <div class="mt-5 grid gap-4">
            <NumberInput v-model="form.homeValue" label="Home value" prefix="£" :min="0" :step="5000" />
            <NumberInput v-model="form.deposit" label="Deposit" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.interestRate" label="Interest rate" prefix="%" :min="0" :step="0.1" />
            <NumberInput v-model="form.years" label="Term (years)" :min="1" :max="40" :step="1" />
          </div>
        </Card>

        <div class="flex flex-col gap-5">
          <div v-if="result" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card tone="subtle" padding="p-5">
              <ResultTile label="Loan amount" :value="result.principal" prefix="£" />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile
                v-if="type === 'repayment'"
                label="Monthly payment"
                :value="Math.round((result as MortgageResult).monthlyRepayment)"
                prefix="£"
              />
              <ResultTile
                v-else
                label="Monthly interest"
                :value="Math.round((result as InterestOnlyMortgageResult).interestPayments.monthly)"
                prefix="£"
              />
            </Card>
            <Card tone="emerald-950" padding="p-5">
              <ResultTile
                v-if="type === 'repayment'"
                label="Total interest"
                :value="totalInterest"
                prefix="£"
              />
              <ResultTile
                v-else
                label="Yearly interest"
                :value="(result as InterestOnlyMortgageResult).interestPayments.yearly"
                prefix="£"
              />
            </Card>
          </div>

          <Card tone="cream">
            <SectionLabel>What this means</SectionLabel>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <p v-else-if="type === 'repayment'" class="mt-3 leading-relaxed">
              Over {{ form.years }} years at {{ form.interestRate }}% you'd pay back the full
              £{{ (result?.principal ?? 0).toLocaleString('en-GB') }}
              plus £{{ totalInterest.toLocaleString('en-GB') }} of interest.
            </p>
            <p v-else class="mt-3 leading-relaxed">
              Interest-only means you never reduce the principal. You'd owe
              £{{ (result?.principal ?? 0).toLocaleString('en-GB') }} at the end of the term.
            </p>
          </Card>
        </div>
      </div>

      <RelatedCalculators class="mt-12" :slugs="['early-payoff', 'compound-interest', 'fire']" />
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
import { mortgageCalculator } from '@jdizm/finance-calculator'
import type {
  MortgageResult,
  InterestOnlyMortgageResult,
  MortgageType,
} from '@jdizm/finance-calculator/types/calculator'

const type = ref<MortgageType>('repayment')
const mortgageTypeOptions: ReadonlyArray<{ value: MortgageType; label: string }> = [
  { value: 'repayment', label: 'Repayment' },
  { value: 'interestOnly', label: 'Interest-only' },
]
const form = reactive({
  homeValue: 300_000 as number | null,
  deposit: 30_000 as number | null,
  interestRate: 5 as number | null,
  years: 25 as number | null,
})

type Outcome = {
  result: MortgageResult | InterestOnlyMortgageResult | null
  error: string | null
}

const outcome = computed<Outcome>(() => {
  try {
    return {
      result: mortgageCalculator(
        {
          homeValue: form.homeValue ?? 0,
          deposit: form.deposit ?? 0,
          interestRate: form.interestRate ?? 0,
          years: form.years ?? 1,
        },
        type.value
      ),
      error: null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const result = computed(() => outcome.value.result)
const error = computed(() => outcome.value.error)

const totalInterest = computed(() => {
  if (!result.value || type.value !== 'repayment') return 0
  const r = result.value as MortgageResult
  return Math.round(r.monthlyRepayment * r.years * 12 - r.principal)
})
</script>
