<template>
  <section :class="['w-full', surface]">
    <div :class="['mx-auto max-w-6xl px-4 md:px-6', padding]">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Tone = 'transparent' | 'cream' | 'emerald-950' | 'ink-950' | 'accent-indigo'

const props = withDefaults(
  defineProps<{
    tone?: Tone
    padding?: string
  }>(),
  {
    tone: 'transparent',
    padding: 'py-12 md:py-16',
  }
)

const surface = computed(() => {
  switch (props.tone) {
    case 'cream':
      return 'bg-surface-cream text-ink-900'
    case 'emerald-950':
      return 'bg-emerald-950 text-surface-off-white'
    case 'ink-950':
      return 'bg-ink-950 text-surface-off-white'
    case 'accent-indigo':
      return 'bg-accent-indigo text-surface-off-white'
    case 'transparent':
    default:
      return ''
  }
})
</script>
