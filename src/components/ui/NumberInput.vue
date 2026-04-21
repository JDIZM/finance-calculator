<template>
  <label class="flex flex-col gap-1.5">
    <span class="font-display text-[0.7rem] font-bold uppercase tracking-widest opacity-70">
      {{ label }}
    </span>
    <div class="relative">
      <span
        v-if="prefix"
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-display text-lg font-bold opacity-60"
      >
        {{ prefix }}
      </span>
      <input
        type="number"
        inputmode="decimal"
        :value="modelValue ?? ''"
        :min="min"
        :max="max"
        :step="step"
        :class="[
          'w-full rounded-slab border font-display text-xl font-bold tabular-nums outline-none transition focus:ring-2 focus:ring-emerald-500',
          surfaceClasses,
          prefix ? 'pl-9' : 'pl-4',
          'pr-4 py-3',
        ]"
        @input="onInput"
      />
    </div>
    <span v-if="hint" class="text-xs opacity-70">{{ hint }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: number | null
    prefix?: string
    hint?: string
    min?: number
    max?: number
    step?: number | string
    dark?: boolean
  }>(),
  {
    dark: false,
  }
)

const surfaceClasses = computed(() =>
  props.dark
    ? 'border-white/20 bg-white/5 text-current focus:border-emerald-500'
    : 'border-surface-rule bg-white text-ink-900 focus:border-emerald-500'
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    emit('update:modelValue', null)
    return
  }
  const num = Number(target.value)
  if (!Number.isNaN(num)) emit('update:modelValue', num)
}
</script>
