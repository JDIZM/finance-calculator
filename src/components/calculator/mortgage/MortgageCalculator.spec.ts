import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MortgageCalculator from './MortgageCalculator.vue'

describe('MortgageCalculator', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(MortgageCalculator)
  })

  it('renders properly', () => {
    console.log('wrapper', wrapper.html())
    expect(wrapper.exists()).toBe(true)
  })
})
