import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('Card', () => {
  it('defaults to cream tone', () => {
    const w = mount(Card, { slots: { default: 'content' } })
    expect(w.classes().join(' ')).toContain('bg-white')
    expect(w.classes().join(' ')).toContain('border-surface-rule')
  })

  it('applies the emerald-950 tone', () => {
    const w = mount(Card, { props: { tone: 'emerald-950' }, slots: { default: 'x' } })
    expect(w.classes().join(' ')).toContain('bg-emerald-950')
    expect(w.classes().join(' ')).toContain('text-surface-off-white')
  })

  it('applies ink-950, accent-indigo, and subtle tones', () => {
    const ink = mount(Card, { props: { tone: 'ink-950' }, slots: { default: 'x' } })
    const indigo = mount(Card, { props: { tone: 'accent-indigo' }, slots: { default: 'x' } })
    const subtle = mount(Card, { props: { tone: 'subtle' }, slots: { default: 'x' } })
    expect(ink.classes().join(' ')).toContain('bg-ink-950')
    expect(indigo.classes().join(' ')).toContain('bg-accent-indigo')
    expect(subtle.classes().join(' ')).toContain('bg-surface-cream')
  })

  it('renders the inner-glow highlight on dark tones and skips it on cream/subtle', () => {
    const dark = mount(Card, { props: { tone: 'emerald-950' }, slots: { default: 'x' } })
    const light = mount(Card, { props: { tone: 'cream' }, slots: { default: 'x' } })
    expect(dark.find('[aria-hidden="true"]').exists()).toBe(true)
    expect(light.find('[aria-hidden="true"]').exists()).toBe(false)
  })

  it('applies the custom padding prop', () => {
    const w = mount(Card, { props: { padding: 'p-5' }, slots: { default: 'x' } })
    expect(w.classes()).toContain('p-5')
  })

  it('exposes the slot content', () => {
    const w = mount(Card, { slots: { default: '<p class="inner">hello</p>' } })
    expect(w.find('.inner').text()).toBe('hello')
  })
})
