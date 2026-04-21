<template>
  <header class="sticky top-0 z-40 border-b border-white/5 bg-emerald-950 font-body text-surface-off-white">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 md:gap-10">
      <a href="/" class="flex items-center gap-3" aria-label="Finance Calculator home">
        <img alt="" src="@/assets/logo.svg" width="32" height="32" class="h-8 w-8" />
        <span class="font-display text-lg font-black tracking-tight">Finance Tools</span>
      </a>
      <nav class="flex flex-wrap items-center gap-1 text-sm font-semibold md:gap-2">
        <a href="/compound-interest" class="rounded-slab px-3 py-2 transition hover:bg-white/5">Compound</a>
        <a href="/mortgage" class="rounded-slab px-3 py-2 transition hover:bg-white/5">Mortgage</a>
        <a href="/savings-goal" class="rounded-slab px-3 py-2 transition hover:bg-white/5">Savings goal</a>
        <a href="/early-payoff" class="rounded-slab px-3 py-2 transition hover:bg-white/5">Early payoff</a>
        <a href="/fire" class="rounded-slab px-3 py-2 transition hover:bg-white/5">FIRE</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
