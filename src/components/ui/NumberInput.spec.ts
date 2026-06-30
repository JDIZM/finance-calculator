import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'

describe('NumberInput', () => {
  it('emits a number when a valid value is typed', async () => {
    const w = mount(NumberInput, { props: { label: 'Balance', modelValue: null } })
    const input = w.find('input')
    await input.setValue('1234')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([1234])
  })

  it('emits null when the field is cleared', async () => {
    const w = mount(NumberInput, { props: { label: 'Balance', modelValue: 500 } })
    const input = w.find('input')
    await input.setValue('')
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([null])
  })

  it('renders the prefix when provided', () => {
    const w = mount(NumberInput, { props: { label: 'Balance', modelValue: 0, prefix: '£' } })
    expect(w.text()).toContain('£')
  })

  it('renders the label', () => {
    const w = mount(NumberInput, { props: { label: 'Starting balance', modelValue: 0 } })
    expect(w.text()).toContain('Starting balance')
  })

  it('renders the hint when provided', () => {
    const w = mount(NumberInput, {
      props: { label: 'Rate', modelValue: 7, hint: 'Annualised' }
    })
    expect(w.text()).toContain('Annualised')
  })

  it('displays an empty string when modelValue is null', () => {
    const w = mount(NumberInput, { props: { label: 'Balance', modelValue: null } })
    expect((w.find('input').element as HTMLInputElement).value).toBe('')
  })

  it('forwards min/max/step to the underlying input', () => {
    const w = mount(NumberInput, {
      props: { label: 'Balance', modelValue: 0, min: 0, max: 100, step: 5 }
    })
    const input = w.find('input').element as HTMLInputElement
    expect(input.min).toBe('0')
    expect(input.max).toBe('100')
    expect(input.step).toBe('5')
  })
})
