<template>
  <span
    :class="[
      'inline-flex w-fit items-center gap-2 rounded-pill px-3 py-1 font-display text-xs font-bold uppercase tracking-widest',
      toneClasses,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'light' | 'emerald' | 'indigo' | 'cream'

const props = withDefaults(defineProps<{ tone?: Tone }>(), { tone: 'light' })

const toneClasses = computed(() => {
  switch (props.tone) {
    case 'emerald':
      return 'bg-emerald-500/20 text-emerald-500'
    case 'indigo':
      return 'bg-accent-indigo/20 text-accent-indigo'
    case 'cream':
      return 'bg-surface-cream text-ink-900'
    case 'light':
    default:
      return 'bg-white/15 text-current'
  }
})
</script>
