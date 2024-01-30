import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import DebtRepaymentOption from './DebtRepaymentOption.vue'

describe('DebtRepaymentOption', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(DebtRepaymentOption)
  })

  it('renders properly', () => {
    console.log('wrapper', wrapper.html())
    expect(wrapper.exists()).toBe(true)
  })
})
