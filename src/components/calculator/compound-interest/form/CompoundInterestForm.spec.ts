import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CompoundInterestForm from './CompoundInterestForm.vue'

describe('CompoundInterestForm', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(CompoundInterestForm)
  })

  it('renders properly', () => {
    console.log('wrapper', wrapper.html())
    expect(wrapper.exists()).toBe(true)
  })
})
