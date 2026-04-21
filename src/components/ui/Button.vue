<template>
  <component
    :is="as"
    :href="to"
    :type="!to ? 'button' : undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-slab font-display font-bold tracking-tight transition-colors ease-out-expo',
      sizeClasses,
      variantClasses,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    to?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
  }
)

const as = computed(() => (props.to ? 'a' : 'button'))

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2 text-xs'
    case 'lg':
      return 'px-8 py-4 text-base'
    case 'md':
    default:
      return 'px-6 py-3 text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-surface-off-white text-emerald-950 hover:bg-surface-cream'
    case 'ghost':
      return 'bg-transparent text-current ring-1 ring-inset ring-white/30 hover:bg-white/5'
    case 'primary':
    default:
      return 'bg-emerald-500 text-emerald-950 hover:bg-surface-off-white'
  }
})
</script>
