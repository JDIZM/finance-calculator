import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SegmentedToggle from './SegmentedToggle.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' }
] as const

describe('SegmentedToggle', () => {
  it('renders one button per option with the supplied labels', () => {
    const w = mount(SegmentedToggle, { props: { modelValue: 'a', options, ariaLabel: 'Mode' } })
    const buttons = w.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]!.text()).toBe('Alpha')
    expect(buttons[1]!.text()).toBe('Beta')
  })

  it('marks the active option with aria-pressed=true', () => {
    const w = mount(SegmentedToggle, { props: { modelValue: 'a', options, ariaLabel: 'Mode' } })
    expect(w.findAll('button')[0]!.attributes('aria-pressed')).toBe('true')
    expect(w.findAll('button')[1]!.attributes('aria-pressed')).toBe('false')
  })

  it('emits update:modelValue when a non-active option is clicked', async () => {
    const w = mount(SegmentedToggle, { props: { modelValue: 'a', options, ariaLabel: 'Mode' } })
    await w.findAll('button')[1]!.trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  })

  it('emits on click even if the option is already active (Vue wraps idempotent updates)', async () => {
    const w = mount(SegmentedToggle, { props: { modelValue: 'a', options, ariaLabel: 'Mode' } })
    await w.findAll('button')[0]!.trigger('click')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  })

  it('renders a visible label above the group when `label` is supplied', () => {
    const w = mount(SegmentedToggle, {
      props: { modelValue: 'a', options, label: 'Mortgage type' }
    })
    expect(w.text()).toContain('Mortgage type')
  })

  it('falls back to `label` as the aria-label when `ariaLabel` is absent', () => {
    const w = mount(SegmentedToggle, {
      props: { modelValue: 'a', options, label: 'Mortgage type' }
    })
    expect(w.find('[role="group"]').attributes('aria-label')).toBe('Mortgage type')
  })
})
