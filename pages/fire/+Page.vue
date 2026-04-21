<template>
  <main class="font-body">
    <Section tone="ink-950" padding="py-16 md:py-20">
      <Pill tone="light" class="mb-6">FIRE number</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-6xl">
        When can you stop working?
      </h1>
      <h2 class="mt-3 font-display text-lg font-bold opacity-80 md:text-xl">
        FIRE number calculator for financial independence.
      </h2>
      <p class="mt-4 max-w-2xl text-lg leading-relaxed opacity-80">
        Your FIRE number is the investment pot needed to live off its income forever.
        The classic rule: 25× your annual spend (a 4% safe withdrawal rate).
      </p>
    </Section>

    <Section tone="transparent" padding="py-12 md:py-16">
      <div class="grid gap-8 lg:grid-cols-[440px_1fr]">
        <Card tone="ink-950" padding="p-8">
          <h2 class="font-display text-xl font-black tracking-tight">Your inputs</h2>
          <div class="mt-6 grid gap-5">
            <NumberInput v-model="form.annualSpend" label="Annual spend" prefix="£" :min="1" :step="1000" />
            <NumberInput v-model="form.withdrawalRate" label="Withdrawal rate" prefix="%" :min="0.1" :max="10" :step="0.1" />
            <NumberInput v-model="form.currentSavings" label="Current savings" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.annualContribution" label="Annual contribution" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.annualReturn" label="Expected return" prefix="%" :min="0" :step="0.1" />
          </div>
        </Card>

        <div class="flex flex-col gap-6">
          <div v-if="fire" class="grid gap-4 sm:grid-cols-3">
            <Card tone="cream" padding="p-6">
              <ResultTile label="FIRE number" :value="fire.target" prefix="£" />
            </Card>
            <Card tone="cream" padding="p-6">
              <ResultTile label="Monthly income" :value="fire.monthlyIncome" prefix="£" :decimals="0" hint="At your chosen withdrawal rate" />
            </Card>
            <Card tone="accent-indigo" padding="p-6">
              <ResultTile
                label="Years to FIRE"
                :value="years ?? '—'"
                :decimals="1"
              />
            </Card>
          </div>

          <Card tone="cream" padding="p-6 md:p-8">
            <h3 class="font-display text-lg font-black uppercase tracking-widest">What this means</h3>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <p v-else-if="fire" class="mt-3 leading-relaxed">
              Live on £{{ (form.annualSpend ?? 0).toLocaleString('en-GB') }} a year and you need
              £{{ fire.target.toLocaleString('en-GB') }} invested to withdraw that amount indefinitely at
              {{ form.withdrawalRate }}%. Real-world returns aren't smooth, so sequence-of-returns risk matters.
            </p>
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
import { fireNumber, yearsToFire } from '@jdizm/finance-calculator'

const form = reactive({
  annualSpend: 40_000,
  withdrawalRate: 4,
  currentSavings: 50_000,
  annualContribution: 20_000,
  annualReturn: 7,
})

const fireOutcome = computed(() => {
  try {
    return {
      result: fireNumber({
        annualSpend: form.annualSpend ?? 1,
        withdrawalRate: form.withdrawalRate ?? 4,
      }),
      error: null as string | null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const yearsOutcome = computed(() => {
  const fireTarget = fireOutcome.value.result?.target
  if (fireTarget == null) return { result: null, error: null as string | null }
  try {
    return {
      result: yearsToFire({
        currentSavings: form.currentSavings ?? 0,
        annualContribution: form.annualContribution ?? 0,
        annualReturn: form.annualReturn ?? 0,
        target: fireTarget,
      }),
      error: null as string | null,
    }
  } catch (e) {
    return { result: null, error: e instanceof Error ? e.message : 'Invalid inputs' }
  }
})

const fire = computed(() => fireOutcome.value.result)
const years = computed(() => yearsOutcome.value.result)
const error = computed(() => fireOutcome.value.error ?? yearsOutcome.value.error)
</script>
