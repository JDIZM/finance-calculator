import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import RangeSlider from './RangeSlider.vue'

describe('RangeSlider', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(RangeSlider, {
      props: {
        initialDeposit: 5000,
        monthlyContribution: 500,
        years: 25,
        interestRate: 5.0,
        currency: 'GBP'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays initial deposit value', () => {
    expect(wrapper.text()).toContain('5,000')
  })

  it('displays monthly contribution value', () => {
    expect(wrapper.text()).toContain('500')
  })

  it('displays years value', () => {
    expect(wrapper.text()).toContain('25 years')
  })

  it('displays interest rate value', () => {
    expect(wrapper.text()).toContain('5.0%')
  })

  it('has 4 range inputs', () => {
    const sliders = wrapper.findAll('input[type="range"]')
    expect(sliders.length).toBe(4)
  })

  it('emits update events when slider changes', async () => {
    const slider = wrapper.find('input[type="range"]')
    await slider.setValue(10000)
    expect(wrapper.emitted()).toHaveProperty('update:initialDeposit')
  })
})
