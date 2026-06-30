<template>
  <a
    :href="comingSoon ? undefined : (external ?? href)"
    :target="!comingSoon && external ? '_blank' : undefined"
    :rel="!comingSoon && external ? 'noopener noreferrer' : undefined"
    :aria-disabled="comingSoon ? 'true' : undefined"
    :tabindex="comingSoon ? -1 : undefined"
    @click="comingSoon && $event.preventDefault()"
    @keydown.enter="comingSoon && $event.preventDefault()"
    :class="[
      'group relative flex min-w-0 flex-col overflow-hidden rounded-slab p-6 transition-transform duration-300 ease-out-expo md:p-8',
      surfaceClasses,
      comingSoon ? 'pointer-events-none opacity-70' : 'hover:-translate-y-1'
    ]"
  >
    <div
      v-if="tone !== 'cream'"
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-px shadow-inner-glow"
    />
    <p
      class="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-widest opacity-80"
    >
      <span>{{ eyebrow }}</span>
      <span v-if="comingSoon" class="rounded-pill bg-white/15 px-2 py-0.5">soon</span>
    </p>
    <h3 class="mt-5 font-display text-2xl font-black leading-heading tracking-tight md:text-3xl">
      {{ title }}
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed opacity-85 md:text-base">{{ body }}</p>
    <span
      v-if="!comingSoon"
      class="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold"
    >
      Open calculator
      <span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1"
        >&rarr;</span
      >
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
    comingSoon: false
  }
)

const surfaceClasses = computed(() => {
  switch (props.tone) {
    case 'cream':
      return 'bg-white text-ink-900 border border-surface-rule shadow-soft hover:shadow-soft-lg'
    case 'ink-950':
      return 'bg-ink-950 text-surface-off-white shadow-soft-lg hover:shadow-soft-lg'
    case 'accent-indigo':
      return 'bg-accent-indigo text-surface-off-white shadow-soft-lg'
    case 'emerald-950':
    default:
      return 'bg-emerald-950 text-surface-off-white shadow-soft-lg'
  }
})
</script>
