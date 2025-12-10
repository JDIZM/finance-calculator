<template>
  <Listbox v-model="selected">
    <div class="listbox-container">
      <ListboxButton class="listbox-button">
        <span class="listbox-button-text">{{ selectedText }}</span>
        <svg
          class="listbox-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </ListboxButton>

      <transition
        leave-active-class="transition-opacity"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="listbox-options">
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            v-slot="{ active, selected: isSelected }"
          >
            <li
              :class="[
                'listbox-option',
                { 'listbox-option-active': active },
                { 'listbox-option-selected': isSelected }
              ]"
            >
              <span :class="{ 'font-semibold': isSelected }">{{ option.text }}</span>
              <svg
                v-if="isSelected"
                class="listbox-option-check"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

interface SelectOption {
  text: string
  value: string
}

const props = defineProps<{
  options: SelectOption[]
}>()

const selected = defineModel<string>({ required: true })

const selectedText = computed(() => {
  const option = props.options.find((opt) => opt.value === selected.value)
  return option?.text || 'Select an option'
})
</script>

<style lang="scss" scoped>
.listbox-container {
  position: relative;
}

.listbox-button {
  position: relative;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 1rem;
  color: var(--color-heading);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(123, 79, 199, 0.1);
  }

  &:hover {
    border-color: var(--color-primary);
  }
}

.listbox-button-text {
  display: block;
  truncate: true;
}

.listbox-button-icon {
  height: 1.25rem;
  width: 1.25rem;
  color: var(--color-text);
  opacity: 0.6;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.listbox-options {
  position: absolute;
  margin-top: 0.5rem;
  max-height: 15rem;
  width: 100%;
  overflow-auto;
  border-radius: 8px;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &:focus {
    outline: none;
  }
}

.listbox-option {
  cursor: pointer;
  user-select: none;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.listbox-option-active {
    background: var(--color-background-soft);
    color: var(--color-heading);
  }

  &.listbox-option-selected {
    color: var(--color-primary);
    font-weight: 600;
  }
}

.listbox-option-check {
  height: 1.25rem;
  width: 1.25rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.transition-opacity {
  transition: opacity 150ms ease-in-out;
}

.opacity-100 {
  opacity: 1;
}

.opacity-0 {
  opacity: 0;
}
</style>
