import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultTile from './ResultTile.vue'

// Whole-component text() is sufficient since value is always unique vs label/hint in these cases.
const text = (w: ReturnType<typeof mount>) => w.text()

describe('ResultTile formatting', () => {
  it('formats a small number with locale commas, no decimals by default', () => {
    const w = mount(ResultTile, { props: { value: 1234, prefix: '£' } })
    expect(text(w)).toContain('£1,234')
  })

  it('honours decimals prop for small numbers', () => {
    const w = mount(ResultTile, { props: { value: 1234.56, prefix: '£', decimals: 2 } })
    expect(text(w)).toContain('£1,234.56')
  })

  it('passes through string values untouched', () => {
    const w = mount(ResultTile, { props: { value: '—' } })
    expect(text(w)).toContain('—')
  })

  describe('K/M abbreviation (decimals=0)', () => {
    it('returns full formatted number under 10K', () => {
      const w = mount(ResultTile, { props: { value: 9999, prefix: '£' } })
      expect(text(w)).toContain('£9,999')
    })

    it('abbreviates 12,345 to 12.3K', () => {
      const w = mount(ResultTile, { props: { value: 12_345, prefix: '£' } })
      expect(text(w)).toContain('£12.3K')
    })

    it('abbreviates 234,567 to 235K with integer K', () => {
      const w = mount(ResultTile, { props: { value: 234_567, prefix: '£' } })
      expect(text(w)).toContain('£235K')
    })

    it('abbreviates 1,234,567 to 1.23M', () => {
      const w = mount(ResultTile, { props: { value: 1_234_567, prefix: '£' } })
      expect(text(w)).toContain('£1.23M')
    })

    it('abbreviates 12.3M with one decimal in the 10M-99M range', () => {
      const w = mount(ResultTile, { props: { value: 12_345_678, prefix: '£' } })
      expect(text(w)).toContain('£12.3M')
    })

    it('rounds to integer M above 100M', () => {
      const w = mount(ResultTile, { props: { value: 123_456_789, prefix: '£' } })
      expect(text(w)).toContain('£123M')
    })
  })

  describe('K/M abbreviation (decimals>0)', () => {
    it('keeps pence precision under 1M', () => {
      const w = mount(ResultTile, { props: { value: 123_456.78, prefix: '£', decimals: 2 } })
      expect(text(w)).toContain('£123,456.78')
    })

    it('still abbreviates to M above 1M even with decimals', () => {
      const w = mount(ResultTile, { props: { value: 1_050_000, prefix: '£', decimals: 2 } })
      expect(text(w)).toContain('£1.05M')
    })
  })

  it('renders label and hint when provided', () => {
    const w = mount(ResultTile, {
      props: { value: 1000, label: 'Balance', hint: 'Projected at 7%' }
    })
    expect(w.text()).toContain('Balance')
    expect(w.text()).toContain('Projected at 7%')
  })
})
