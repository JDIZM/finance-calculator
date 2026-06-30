<template>
  <component
    :is="tag"
    :class="[
      'font-display font-black uppercase tracking-widest text-ink-900/70',
      size === 'lg' ? 'text-lg' : 'text-sm'
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Tag = 'h2' | 'h3' | 'h4' | 'p'
type Size = 'sm' | 'lg'

withDefaults(
  defineProps<{
    tag?: Tag
    size?: Size
  }>(),
  {
    tag: 'h3',
    size: 'sm'
  }
)
</script>
