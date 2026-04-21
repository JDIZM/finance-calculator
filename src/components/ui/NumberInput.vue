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
          'w-full rounded-slab border border-surface-rule bg-white py-3 pr-4 font-display text-xl font-bold tabular-nums text-ink-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500',
          prefix ? 'pl-9' : 'pl-4',
        ]"
        @input="onInput"
      />
    </div>
    <span v-if="hint" class="text-xs opacity-70">{{ hint }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: number | null
  prefix?: string
  hint?: string
  min?: number
  max?: number
  step?: number | string
}>()

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
