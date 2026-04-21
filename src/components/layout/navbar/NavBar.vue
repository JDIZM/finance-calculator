<template>
  <header class="sticky top-0 z-40 border-b border-surface-rule bg-surface-off-white/90 font-body text-ink-900 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
      <a
        href="/"
        class="flex shrink-0 items-center gap-2 rounded-slab transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Finance Calculator home"
      >
        <img alt="" src="@/assets/logo.svg" width="28" height="28" class="h-7 w-7" />
        <span class="font-display text-base font-black tracking-tight md:text-lg">Finance Tools</span>
      </a>
      <nav
        class="-mx-2 flex flex-1 items-center gap-0.5 overflow-x-auto px-2 text-sm font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-1 md:overflow-visible"
        aria-label="Calculators"
      >
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          :aria-current="isActive(item.href) ? 'page' : undefined"
          :class="[
            'shrink-0 rounded-pill px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
            isActive(item.href)
              ? 'bg-emerald-950 text-surface-off-white'
              : 'text-ink-900/80 hover:bg-surface-cream hover:text-ink-900',
          ]"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const nav = [
  { href: '/compound-interest', label: 'Compound' },
  { href: '/mortgage', label: 'Mortgage' },
  { href: '/savings-goal', label: 'Savings goal' },
  { href: '/early-payoff', label: 'Early payoff' },
  { href: '/fire', label: 'FIRE' },
]

const pathname = ref<string>('')
onMounted(() => {
  pathname.value = window.location.pathname
})

const isActive = (href: string) => pathname.value === href
</script>
