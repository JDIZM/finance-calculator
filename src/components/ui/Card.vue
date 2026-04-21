<template>
  <article :class="['relative flex flex-col overflow-hidden rounded-slab shadow-soft-lg', surface, padding]">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px shadow-inner-glow" />
    <slot />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'emerald-950' | 'ink-950' | 'accent-indigo' | 'cream'

const props = withDefaults(
  defineProps<{
    tone?: Tone
    padding?: string
  }>(),
  {
    tone: 'emerald-950',
    padding: 'p-8 md:p-10',
  }
)

const surface = computed(() => {
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
