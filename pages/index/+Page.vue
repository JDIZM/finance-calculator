<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-16 md:py-24">
      <Pill tone="light" class="mb-5">Free · No signup · UK-friendly</Pill>
      <h1 class="font-display text-4xl font-black leading-heading tracking-tightest sm:text-5xl md:text-6xl lg:text-7xl">
        Bold, chunky finance tools for the rest of us.
      </h1>
      <h2 class="mt-3 font-display text-lg font-bold opacity-80 md:text-xl">
        Free finance calculators, UK-friendly, no signup.
      </h2>
      <p class="mt-5 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg">
        Compound interest, mortgage, savings goals, FIRE number, early mortgage payoff.
        Every calculator runs in your browser. Nothing saved, nothing tracked.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" to="/compound-interest">Compound interest</Button>
        <Button variant="ghost" size="lg" to="/mortgage">Mortgage</Button>
      </div>
    </Section>

    <Section tone="transparent">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Pill tone="emerald" class="mb-4">Five calculators</Pill>
          <h2 class="font-display text-3xl font-black leading-heading tracking-tight md:text-4xl">
            Pick a tool. Get an answer.
          </h2>
        </div>
      </div>
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
        <CalculatorCard
          href="https://github.com/JDIZM/compound-interest"
          tone="cream"
          eyebrow="Suggest"
          title="Something missing?"
          body="These calculators are open source. File an issue or PR."
          external="https://github.com/JDIZM/compound-interest"
        />
      </div>
    </Section>

    <Section tone="cream">
      <div class="grid gap-5 md:grid-cols-2">
        <Card tone="subtle">
          <h3 class="font-display text-2xl font-black tracking-tight">Why compound interest wins</h3>
          <p class="mt-3 leading-relaxed">
            Your interest earns interest. Over decades the curve steepens so sharply that
            time in the market beats nearly every other input you can control. Start early,
            keep going, don't touch it.
          </p>
        </Card>
        <Card tone="subtle">
          <h3 class="font-display text-2xl font-black tracking-tight">Built on an open source library</h3>
          <p class="mt-3 leading-relaxed">
            Every calculation runs through
            <a
              href="https://www.npmjs.com/package/@jdizm/finance-calculator"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-emerald-700 underline decoration-2 underline-offset-4 hover:text-emerald-500"
            >
              @jdizm/finance-calculator
            </a>
            on npm. Check the maths, fork it, or use it in your own project.
          </p>
        </Card>
      </div>
    </Section>
  </main>
</template>

<script setup lang="ts">
import Section from '@/components/ui/Section.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Pill from '@/components/ui/Pill.vue'
import CalculatorCard from '@/components/marketing/CalculatorCard.vue'
</script>
