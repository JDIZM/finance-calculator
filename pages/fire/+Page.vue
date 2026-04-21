<template>
  <main class="font-body">
    <Section tone="ink-950" padding="py-12 md:py-16">
      <Pill tone="light" class="mb-4">FIRE number</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl">
        When can you stop working?
      </h1>
      <h2 class="mt-3 font-display text-base font-bold opacity-80 md:text-lg">
        FIRE number calculator for financial independence.
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed opacity-80">
        Your FIRE number is the investment pot needed to live off its income forever.
        The classic rule: 25× your annual spend (a 4% safe withdrawal rate).
      </p>
    </Section>

    <Section tone="transparent">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card tone="cream">
          <SectionLabel tag="h2">Your inputs</SectionLabel>
          <div class="mt-5 grid gap-4">
            <NumberInput v-model="form.annualSpend" label="Annual spend" prefix="£" :min="1" :step="1000" />
            <NumberInput
              v-model="form.withdrawalRate"
              label="Withdrawal rate"
              prefix="%"
              :min="0.1"
              :max="10"
              :step="0.1"
              hint="Lower is safer but needs a bigger pot. 3–4% is standard (the 4% rule)."
            />
            <NumberInput v-model="form.currentSavings" label="Current savings" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.annualContribution" label="Annual contribution" prefix="£" :min="0" :step="1000" />
            <NumberInput v-model="form.annualReturn" label="Expected return" prefix="%" :min="0" :step="0.1" />
          </div>
        </Card>

        <div class="flex flex-col gap-5">
          <div v-if="fire" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card tone="emerald-950" padding="p-5">
              <ResultTile label="FIRE number" :value="fire.target" prefix="£" />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile label="Monthly income" :value="fire.monthlyIncome" prefix="£" hint="At your chosen withdrawal rate" />
            </Card>
            <Card tone="subtle" padding="p-5">
              <ResultTile label="Years to FIRE" :value="years ?? '—'" :decimals="1" />
            </Card>
          </div>

          <Card tone="cream">
            <SectionLabel>What this means</SectionLabel>
            <p v-if="error" class="mt-3 leading-relaxed text-red-700">{{ error }}</p>
            <div v-else-if="fire" class="mt-3 space-y-3 leading-relaxed">
              <p>
                Live on £{{ (form.annualSpend ?? 0).toLocaleString('en-GB') }} a year and you need
                £{{ fire.target.toLocaleString('en-GB') }} invested to withdraw that amount indefinitely at
                {{ form.withdrawalRate }}%.
              </p>
              <p class="text-ink-900/80">
                A lower withdrawal rate is more conservative, so the pot must be <em>bigger</em> to throw off the same
                £{{ (form.annualSpend ?? 0).toLocaleString('en-GB') }} a year. The 4% rule (25× your spend) is the
                common benchmark; going lower buys extra safety against sequence-of-returns risk but takes longer to
                accumulate.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <RelatedCalculators class="mt-12" :slugs="['compound-interest', 'savings-goal', 'early-payoff']" />
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
import SectionLabel from '@/components/ui/SectionLabel.vue'
import RelatedCalculators from '@/components/marketing/RelatedCalculators.vue'
import { fireNumber, yearsToFire } from '@jdizm/finance-calculator'

const form = reactive({
  annualSpend: 40_000 as number | null,
  withdrawalRate: 4 as number | null,
  currentSavings: 50_000 as number | null,
  annualContribution: 20_000 as number | null,
  annualReturn: 7 as number | null,
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
