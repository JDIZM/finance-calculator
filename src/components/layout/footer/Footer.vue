<template>
  <footer class="mt-auto border-t border-surface-rule bg-surface-cream font-body text-ink-900">
    <div class="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="font-display text-sm font-black uppercase tracking-widest">Finance Tools</p>
          <p class="mt-2 max-w-md text-sm opacity-80">
            Free, private calculators for compound interest, mortgages, savings goals, FIRE, and early payoff. Runs entirely in your browser.
          </p>
        </div>
        <nav class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold" aria-label="Footer">
          <a href="/compound-interest" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Compound</a>
          <a href="/mortgage" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Mortgage</a>
          <a href="/savings-goal" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Savings goal</a>
          <a href="/early-payoff" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Early payoff</a>
          <a href="/fire" class="rounded-pill px-3 py-1.5 transition hover:bg-white">FIRE</a>
          <a
            href="https://github.com/JDIZM/compound-interest"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-pill bg-ink-950 px-3 py-1.5 text-surface-off-white transition hover:bg-emerald-950"
          >
            GitHub
          </a>
        </nav>
      </div>
    </div>

    <div class="border-t border-surface-rule bg-surface-rule/30">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-4 text-xs opacity-80 md:flex-row md:items-center md:justify-between md:px-6">
        <p>
          Built by James Donnelly,
          <a
            href="https://jamesdonnelly.dev/?utm_source=financecalculator.dev&utm_medium=referral&utm_campaign=built-by"
            target="_blank"
            rel="noopener"
            class="font-bold text-emerald-700 underline decoration-2 underline-offset-4 hover:text-emerald-950"
          >
            freelance web developer in Manchester
          </a>.
        </p>
        <a
          href="/sitemap.xml"
          class="font-semibold underline decoration-dotted underline-offset-4 hover:text-ink-900"
        >
          Sitemap
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
