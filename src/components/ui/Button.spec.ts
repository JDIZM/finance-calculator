import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders a <button> element by default', () => {
    const w = mount(Button, { slots: { default: 'Click me' } })
    expect(w.element.tagName).toBe('BUTTON')
    expect(w.attributes('type')).toBe('button')
    expect(w.text()).toBe('Click me')
  })

  it('renders an <a> when `to` prop is set and carries the href', () => {
    const w = mount(Button, {
      props: { to: '/compound-interest' },
      slots: { default: 'Open' }
    })
    expect(w.element.tagName).toBe('A')
    expect(w.attributes('href')).toBe('/compound-interest')
    expect(w.attributes('type')).toBeUndefined()
  })

  it('applies the primary variant classes by default', () => {
    const w = mount(Button, { slots: { default: 'x' } })
    expect(w.classes().join(' ')).toContain('bg-emerald-500')
  })

  it('applies secondary variant classes', () => {
    const w = mount(Button, { props: { variant: 'secondary' }, slots: { default: 'x' } })
    expect(w.classes().join(' ')).toContain('bg-white')
  })

  it('applies ghost variant with a ring', () => {
    const w = mount(Button, { props: { variant: 'ghost' }, slots: { default: 'x' } })
    expect(w.classes().join(' ')).toContain('ring-1')
  })

  it('picks different padding per size', () => {
    const sm = mount(Button, { props: { size: 'sm' }, slots: { default: 'x' } })
    const md = mount(Button, { props: { size: 'md' }, slots: { default: 'x' } })
    const lg = mount(Button, { props: { size: 'lg' }, slots: { default: 'x' } })
    expect(sm.classes().join(' ')).toContain('px-4')
    expect(md.classes().join(' ')).toContain('px-5')
    expect(lg.classes().join(' ')).toContain('px-7')
  })
})
