<template>
  <main class="font-body">
    <Section tone="ink-950" padding="py-16 md:py-20">
      <Pill tone="light" class="mb-6">Mortgage</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-6xl">
        What will the repayments be?
      </h1>
      <h2 class="mt-3 font-display text-lg font-bold opacity-80 md:text-xl">
        UK mortgage calculator for monthly repayments and total interest.
      </h2>
      <p class="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
        Repayment or interest-only. See the monthly cost and what it costs you in interest over the full term.
      </p>
    </Section>

    <Section tone="transparent" padding="py-12 md:py-16">
      <div class="grid gap-8 lg:grid-cols-[440px_1fr]">
        <Card tone="ink-950" padding="p-8">
          <h2 class="font-display text-xl font-black tracking-tight">Your inputs</h2>

          <div role="group" aria-label="Mortgage type" class="mt-6 flex gap-2 rounded-slab bg-white/5 p-1">
            <button
              type="button"
              :aria-pressed="type === 'repayment'"
              :class="[
                'flex-1 rounded-slab px-4 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                type === 'repayment' ? 'bg-emerald-500 text-emerald-950' : 'text-surface-off-white/80 hover:text-surface-off-white',
              ]"
              @click="type = 'repayment'"
            >
              Repayment
            </button>
            <button
              type="button"
              :aria-pressed="type === 'interestOnly'"
              :class="[
                'flex-1 rounded-slab px-4 py-2 font-display text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                type === 'interestOnly' ? 'bg-emerald-500 text-emerald-950' : 'text-surface-off-white/80 hover:text-surface-off-white',
              ]"
              @click="type = 'interestOnly'"
            >
              Interest-only
            </button>
          </div>

          <div class="mt-6 grid gap-5">
            <NumberInput v-model="form.homeValue" label="Home value" prefix="£" :min="0" :step="5000" />
            <NumberInput v-model="form.deposit" label="Deposit" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.interestRate" label="Interest rate" prefix="%" :min="0" :step="0.1" />
            <NumberInput v-model="form.years" label="Term (years)" :min="1" :max="40" :step="1" />
          </div>
        </Card>

        <div class="flex flex-col gap-6">
          <div v-if="result" class="grid gap-4 sm:grid-cols-3">
            <Card tone="cream" padding="p-6">
              <ResultTile label="Loan amount" :value="result.principal" prefix="£" />
            </Card>
            <Card tone="cream" padding="p-6">
              <ResultTile
                v-if="type === 'repayment'"
                label="Monthly payment"
                :value="(result as MortgageResult).monthlyRepayment"
                prefix="£"
                :decimals="2"
              />
              <ResultTile
                v-else
                label="Monthly interest"
                :value="(result as InterestOnlyMortgageResult).interestPayments.monthly"
                prefix="£"
                :decimals="2"
              />
            </Card>
            <Card tone="accent-indigo" padding="p-6">
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

          <Card tone="cream" padding="p-6 md:p-8">
            <h3 class="font-display text-lg font-black uppercase tracking-widest">What this means</h3>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">
              {{ error }}
            </p>
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
import { mortgageCalculator } from '@jdizm/finance-calculator'
import type {
  MortgageResult,
  InterestOnlyMortgageResult,
  MortgageType,
} from '@jdizm/finance-calculator/types/calculator'

const type = ref<MortgageType>('repayment')
const form = reactive({
  homeValue: 300_000,
  deposit: 30_000,
  interestRate: 5,
  years: 25,
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
