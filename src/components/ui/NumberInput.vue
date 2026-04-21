<template>
  <label class="flex flex-col gap-2">
    <span class="font-display text-xs font-bold uppercase tracking-widest text-current/80">
      {{ label }}
    </span>
    <div class="relative">
      <span
        v-if="prefix"
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-display font-bold text-current/60"
      >
        {{ prefix }}
      </span>
      <input
        type="number"
        inputmode="decimal"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :class="[
          'w-full rounded-slab border border-current/10 bg-white/5 font-display text-2xl font-black tabular-nums text-current outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500',
          prefix ? 'pl-9' : 'pl-4',
          'pr-4 py-3',
        ]"
        @input="onInput"
      />
    </div>
    <span v-if="hint" class="text-xs text-current/60">{{ hint }}</span>
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
  (e: 'update:modelValue', value: number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const num = Number(target.value)
  if (!Number.isNaN(num)) emit('update:modelValue', num)
}
</script>
