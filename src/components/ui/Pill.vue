<template>
  <span
    :class="[
      'inline-flex w-fit items-center gap-2 rounded-pill px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-widest',
      toneClasses,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'light' | 'emerald' | 'indigo' | 'cream' | 'ink'

const props = withDefaults(defineProps<{ tone?: Tone }>(), { tone: 'light' })

const toneClasses = computed(() => {
  switch (props.tone) {
    case 'emerald':
      return 'bg-emerald-500/15 text-emerald-700'
    case 'indigo':
      return 'bg-accent-indigo/15 text-accent-indigo'
    case 'cream':
      return 'bg-surface-cream text-ink-900'
    case 'ink':
      return 'bg-ink-950/10 text-ink-900'
    case 'light':
    default:
      return 'bg-white/20 text-current'
  }
})
</script>
