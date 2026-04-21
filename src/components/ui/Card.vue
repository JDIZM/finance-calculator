<template>
  <article
    :class="[
      'relative flex min-w-0 flex-col overflow-hidden rounded-slab',
      surface,
      padding,
      props.border
    ]"
  >
    <div
      v-if="tone !== 'cream' && tone !== 'subtle'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-px shadow-inner-glow"
    />
    <slot />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'emerald-950' | 'ink-950' | 'accent-indigo' | 'cream' | 'subtle'

const props = withDefaults(
  defineProps<{
    tone?: Tone
    padding?: string
    border?: string
  }>(),
  {
    tone: 'cream',
    padding: 'p-6 md:p-8',
    border: ''
  }
)

const surface = computed(() => {
  switch (props.tone) {
    case 'ink-950':
      return 'bg-ink-950 text-surface-off-white shadow-soft-lg'
    case 'accent-indigo':
      return 'bg-accent-indigo text-surface-off-white shadow-soft-lg'
    case 'emerald-950':
      return 'bg-emerald-950 text-surface-off-white shadow-soft-lg'
    case 'subtle':
      return 'bg-surface-cream text-ink-900 border border-surface-rule'
    case 'cream':
    default:
      return 'bg-white text-ink-900 border border-surface-rule shadow-soft'
  }
})
</script>
