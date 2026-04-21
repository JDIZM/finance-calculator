import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pill from './Pill.vue'

describe('Pill', () => {
  it('defaults to light tone', () => {
    const w = mount(Pill, { slots: { default: 'Free' } })
    expect(w.classes().join(' ')).toContain('bg-white/20')
  })

  it.each([
    ['emerald', 'bg-emerald-500/15'],
    ['indigo', 'bg-accent-indigo/15'],
    ['cream', 'bg-surface-cream'],
    ['ink', 'bg-ink-950/10']
  ] as const)('applies the %s tone with class %s', (tone, expected) => {
    const w = mount(Pill, { props: { tone }, slots: { default: 'x' } })
    expect(w.classes().join(' ')).toContain(expected)
  })

  it('exposes the slot content', () => {
    const w = mount(Pill, { slots: { default: 'Free · No signup' } })
    expect(w.text()).toBe('Free · No signup')
  })
})
