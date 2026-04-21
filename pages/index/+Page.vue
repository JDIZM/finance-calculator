<template>
  <main class="font-body">
    <Section tone="emerald-950" padding="py-20 md:py-28">
      <Pill tone="light" class="mb-6">Free · No signup · UK-friendly</Pill>
      <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-7xl">
        Bold, chunky finance tools for the rest of us.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
        Compound interest, mortgage, savings goals, FIRE number, early mortgage payoff.
        Every calculator runs in your browser. Nothing saved, nothing tracked.
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" to="/compound-interest">Compound interest</Button>
        <Button variant="secondary" size="lg" to="/mortgage">Mortgage</Button>
      </div>
    </Section>

    <Section tone="cream">
      <div class="flex items-end justify-between gap-8">
        <div>
          <Pill tone="cream" class="mb-4">Five calculators</Pill>
          <h2 class="font-display text-4xl font-black leading-heading tracking-tight md:text-5xl">
            Pick a tool. Get an answer.
          </h2>
        </div>
      </div>
      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CalculatorCard
          href="/compound-interest"
          tone="emerald-950"
          eyebrow="Grow"
          title="Compound interest"
          body="Project what regular contributions become over decades."
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
          body="How much a month to hit a number by a date. Or how long if you save £X."
        />
        <CalculatorCard
          href="/early-payoff"
          tone="emerald-950"
          eyebrow="Payoff"
          title="Early mortgage payoff"
          body="Extra monthly or lump-sum payments and the months + interest saved."
        />
        <CalculatorCard
          href="/fire"
          tone="ink-950"
          eyebrow="FIRE"
          title="FIRE number"
          body="Savings target from your annual spend and a safe withdrawal rate."
        />
        <CalculatorCard
          href="#more"
          tone="cream"
          eyebrow="Suggest"
          title="Something missing?"
          body="These calculators are open source. File an issue or PR."
          external="https://github.com/JDIZM/compound-interest"
        />
      </div>
    </Section>

    <Section tone="transparent" padding="py-16 md:py-24">
      <div class="grid gap-6 md:grid-cols-2">
        <Card tone="cream" padding="p-8 md:p-10">
          <h3 class="font-display text-2xl font-black tracking-tight">Why compound interest wins</h3>
          <p class="mt-3 leading-relaxed">
            Your interest earns interest. Over decades the curve steepens so sharply that
            time in the market beats nearly every other input you can control. Start early,
            keep going, don't touch it.
          </p>
        </Card>
        <Card tone="cream" padding="p-8 md:p-10">
          <h3 class="font-display text-2xl font-black tracking-tight">Built on an open source library</h3>
          <p class="mt-3 leading-relaxed">
            Every calculation runs through
            <a href="https://www.npmjs.com/package/@jdizm/finance-calculator" class="underline decoration-2 underline-offset-4">
              @jdizm/finance-calculator
            </a>
            &nbsp;on npm. Audit the maths, fork it, or use it in your own project.
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
