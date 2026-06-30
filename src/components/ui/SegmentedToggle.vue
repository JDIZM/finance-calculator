<template>
  <div class="flex flex-col gap-1.5">
    <span
      v-if="label"
      class="font-display text-[0.7rem] font-bold uppercase tracking-widest opacity-70"
    >
      {{ label }}
    </span>
    <div
      role="group"
      :aria-label="ariaLabel ?? label"
      class="flex gap-1 rounded-slab border border-surface-rule bg-surface-cream p-1"
    >
      <button
        v-for="option in options"
        :key="String(option.value)"
        type="button"
        :aria-pressed="modelValue === option.value"
        :class="[
          'flex-1 rounded-[10px] px-4 py-2.5 font-display text-sm font-bold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
          modelValue === option.value
            ? 'bg-emerald-950 text-surface-off-white shadow-soft'
            : 'text-ink-900/70 hover:text-ink-900'
        ]"
        @click="emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
const props = defineProps<{
  modelValue: T
  options: ReadonlyArray<{ value: T; label: string }>
  ariaLabel?: string
  label?: string
}>()

// Accessibility: the <div role="group"> needs a name. At least one of
// `label` (visible) or `ariaLabel` (screen-reader-only) must be supplied.
if (import.meta.env.DEV && !props.label && !props.ariaLabel) {
  console.warn('[SegmentedToggle] requires either a `label` or `ariaLabel` prop for a11y')
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>
