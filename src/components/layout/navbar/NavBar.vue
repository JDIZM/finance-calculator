<template>
  <header class="sticky top-0 z-40 border-b border-surface-rule bg-surface-off-white/95 font-body text-ink-900 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 md:px-6">
      <a href="/" class="flex items-center gap-2" aria-label="Finance Calculator home">
        <img alt="" src="@/assets/logo.svg" width="28" height="28" class="h-7 w-7" />
        <span class="font-display text-base font-black tracking-tight md:text-lg">Finance Tools</span>
      </a>
      <nav class="flex flex-wrap items-center gap-1 text-sm font-semibold">
        <a href="/compound-interest" class="rounded-pill px-3 py-1.5 transition hover:bg-surface-cream">Compound</a>
        <a href="/mortgage" class="rounded-pill px-3 py-1.5 transition hover:bg-surface-cream">Mortgage</a>
        <a href="/savings-goal" class="rounded-pill px-3 py-1.5 transition hover:bg-surface-cream">Savings goal</a>
        <a href="/early-payoff" class="rounded-pill px-3 py-1.5 transition hover:bg-surface-cream">Early payoff</a>
        <a href="/fire" class="rounded-pill px-3 py-1.5 transition hover:bg-surface-cream">FIRE</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
