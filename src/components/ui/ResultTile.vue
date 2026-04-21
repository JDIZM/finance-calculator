<template>
  <div class="flex flex-col gap-2">
    <span v-if="label" class="font-display text-xs font-bold uppercase tracking-widest opacity-70">
      {{ label }}
    </span>
    <span class="font-display text-5xl font-black leading-none tracking-tightest tabular-nums md:text-6xl">
      <span v-if="prefix" class="mr-1 opacity-70">{{ prefix }}</span>{{ formatted }}
    </span>
    <span v-if="hint" class="text-sm font-medium opacity-70">{{ hint }}</span>
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

const formatted = computed(() => {
  if (typeof props.value === 'string') return props.value
  return props.value.toLocaleString(props.locale, {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  })
})
</script>
