<template>
  <a
    :href="external ?? href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-disabled="comingSoon ? 'true' : undefined"
    :class="[
      'group relative flex flex-col overflow-hidden rounded-slab p-8 shadow-soft transition-transform duration-300 ease-out-expo',
      surfaceClasses,
      comingSoon ? 'pointer-events-none opacity-80' : 'hover:-translate-y-1 hover:shadow-soft-lg',
    ]"
  >
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px shadow-inner-glow" />
    <p class="font-display text-xs font-bold uppercase tracking-widest opacity-80">
      {{ eyebrow }}
      <span v-if="comingSoon" class="ml-2 rounded-pill bg-white/15 px-2 py-0.5 text-[0.65rem]">soon</span>
    </p>
    <h3 class="mt-6 font-display text-3xl font-black leading-heading tracking-tight md:text-4xl">
      {{ title }}
    </h3>
    <p class="mt-3 flex-1 leading-relaxed opacity-80">{{ body }}</p>
    <span v-if="!comingSoon" class="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold">
      Open calculator
      <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'emerald-950' | 'ink-950' | 'accent-indigo' | 'cream'

const props = withDefaults(
  defineProps<{
    href: string
    tone?: Tone
    eyebrow: string
    title: string
    body: string
    comingSoon?: boolean
    external?: string
  }>(),
  {
    tone: 'emerald-950',
    comingSoon: false,
  }
)

const surfaceClasses = computed(() => {
  switch (props.tone) {
    case 'cream':
      return 'bg-surface-cream text-ink-900'
    case 'ink-950':
      return 'bg-ink-950 text-surface-off-white'
    case 'accent-indigo':
      return 'bg-accent-indigo text-surface-off-white'
    case 'emerald-950':
    default:
      return 'bg-emerald-950 text-surface-off-white'
  }
})
</script>
