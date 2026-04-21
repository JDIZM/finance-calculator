<template>
  <section class="mt-4">
    <SectionLabel tag="h2">Related calculators</SectionLabel>
    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="group flex flex-col gap-1 rounded-slab border border-surface-rule bg-white p-5 transition hover:border-emerald-500 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <span class="font-display text-[0.7rem] font-bold uppercase tracking-widest text-ink-900/70">{{ link.eyebrow }}</span>
        <span class="font-display text-lg font-black tracking-tight">{{ link.title }}</span>
        <span class="text-sm opacity-80">{{ link.body }}</span>
        <span class="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
          Open
          <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionLabel from '@/components/ui/SectionLabel.vue'

type CalculatorSlug = 'compound-interest' | 'mortgage' | 'savings-goal' | 'early-payoff' | 'fire'

const CATALOGUE: Record<CalculatorSlug, { href: string; eyebrow: string; title: string; body: string }> = {
  'compound-interest': {
    href: '/compound-interest',
    eyebrow: 'Grow',
    title: 'Compound interest',
    body: 'Project what regular monthly contributions turn into over decades.',
  },
  mortgage: {
    href: '/mortgage',
    eyebrow: 'Borrow',
    title: 'Mortgage',
    body: 'Monthly repayment and total interest for repayment or interest-only.',
  },
  'savings-goal': {
    href: '/savings-goal',
    eyebrow: 'Target',
    title: 'Savings goal',
    body: 'Solve for the monthly contribution to hit a target, or the years it takes.',
  },
  'early-payoff': {
    href: '/early-payoff',
    eyebrow: 'Payoff',
    title: 'Early mortgage payoff',
    body: 'Extra monthly or lump-sum payments: months and interest saved.',
  },
  fire: {
    href: '/fire',
    eyebrow: 'FIRE',
    title: 'FIRE number',
    body: 'The pot you need from annual spend and a safe withdrawal rate.',
  },
}

const props = defineProps<{ slugs: ReadonlyArray<CalculatorSlug> }>()

const links = props.slugs.map((slug) => CATALOGUE[slug])
</script>
