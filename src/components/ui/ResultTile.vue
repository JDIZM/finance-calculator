<template>
  <div class="flex min-w-0 flex-col gap-1.5">
    <span v-if="label" class="font-display text-[0.7rem] font-bold uppercase tracking-widest opacity-70">
      {{ label }}
    </span>
    <span class="block truncate font-display text-2xl font-black leading-none tabular-nums sm:text-[1.75rem] lg:text-3xl xl:text-4xl">
      <span v-if="prefix" class="opacity-60">{{ prefix }}</span>{{ formatted }}
    </span>
    <span v-if="hint" class="text-xs font-medium opacity-70">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number | string
    label?: string
    prefix?: string
    hint?: string
    decimals?: number
    locale?: string
  }>(),
  {
    decimals: 0,
    locale: 'en-GB',
  }
)

const abbreviate = (n: number): string => {
  const abs = Math.abs(n)
  if (abs >= 100_000_000) return `${Math.round(n / 1_000_000)}M`
  if (abs >= 10_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (abs >= 100_000) return `${Math.round(n / 1_000)}K`
  if (abs >= 10_000) return `${(n / 1_000).toFixed(1)}K`
  return ''
}

const formatted = computed(() => {
  if (typeof props.value === 'string') return props.value
  if (props.decimals === 0) {
    const abbr = abbreviate(props.value)
    if (abbr) return abbr
  }
  return props.value.toLocaleString(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  })
})
</script>
