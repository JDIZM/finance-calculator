<template>
  <div
    role="group"
    :aria-label="ariaLabel"
    class="flex gap-1 rounded-slab border border-surface-rule bg-surface-cream p-1"
  >
    <button
      v-for="option in options"
      :key="String(option.value)"
      type="button"
      :aria-pressed="modelValue === option.value"
      :class="[
        'flex-1 rounded-slab px-3 py-2 font-display text-xs font-bold uppercase tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
        modelValue === option.value
          ? 'bg-emerald-950 text-surface-off-white shadow-soft'
          : 'text-ink-900/70 hover:text-ink-900',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  modelValue: T
  options: ReadonlyArray<{ value: T; label: string }>
  ariaLabel: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>
