<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-20 md:py-28">
      <Pill tone="light" class="mb-5">{{ pill }}</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest sm:text-6xl md:text-7xl">
        {{ heading }}
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg">
        {{ body }}
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" to="/">Home</Button>
        <Button variant="ghost" size="lg" to="/compound-interest">Compound interest</Button>
      </div>
    </Section>

    <Section tone="transparent">
      <Pill tone="emerald" class="mb-4">Five calculators</Pill>
      <h2 class="font-display text-3xl font-black leading-heading tracking-tight md:text-4xl">
        Try one of these instead.
      </h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CalculatorCard
          href="/compound-interest"
          tone="emerald-950"
          eyebrow="Grow"
          title="Compound interest"
          body="See what regular contributions turn into over decades."
        />
        <CalculatorCard
          href="/mortgage"
          tone="ink-950"
          eyebrow="Borrow"
          title="Mortgage"
          body="Monthly repayment and total interest for repayment or interest-only mortgages."
        />
        <CalculatorCard
          href="/savings-goal"
          tone="accent-indigo"
          eyebrow="Target"
          title="Savings goal"
          body="How much a month to hit your number by a date. Or how long at £X a month."
        />
        <CalculatorCard
          href="/early-payoff"
          tone="emerald-950"
          eyebrow="Payoff"
          title="Early mortgage payoff"
          body="Overpay a bit each month and see the months and interest you save."
        />
        <CalculatorCard
          href="/fire"
          tone="ink-950"
          eyebrow="FIRE"
          title="FIRE number"
          body="The pot you need, based on your annual spend and a safe withdrawal rate."
        />
      </div>
    </Section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePageContext } from 'vike-vue/usePageContext'
import Section from '@/components/ui/Section.vue'
import Button from '@/components/ui/Button.vue'
import Pill from '@/components/ui/Pill.vue'
import CalculatorCard from '@/components/marketing/CalculatorCard.vue'

const pageContext = usePageContext()

const is404 = computed(() => pageContext.is404 === true)

const pill = computed(() => (is404.value ? '404 Not found' : 'Something broke'))
const heading = computed(() => (is404.value ? "That page doesn't exist." : 'Well, that went sideways.'))
const body = computed(() =>
  is404.value
    ? "The page you asked for isn't here. It might have moved, or the link that sent you here had a typo."
    : 'An unexpected error happened while loading this page. Try going back to the home page or pick a calculator below.'
)
</script>
