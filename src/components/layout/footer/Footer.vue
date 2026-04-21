<template>
  <footer class="mt-auto border-t border-surface-rule bg-surface-cream py-10 font-body text-ink-900">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p class="font-display text-sm font-black uppercase tracking-widest">Finance Tools</p>
        <p class="mt-2 max-w-md text-sm opacity-80">
          Free, private calculators for compound interest, mortgages, savings goals, FIRE, and early payoff. Runs entirely in your browser.
        </p>
      </div>
      <nav class="flex flex-wrap items-center gap-4 text-sm font-semibold" aria-label="Footer">
        <a href="/compound-interest" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Compound</a>
        <a href="/mortgage" class="rounded-pill px-3 py-1.5 transition hover:bg-white">Mortgage</a>
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
  </footer>
</template>

<script setup lang="ts"></script>
