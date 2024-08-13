import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import RangeSlider from './RangeSlider.vue'

describe('RangeSlider', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(RangeSlider, {
      props: {
        options: [
          {
            text: 'example label',
            value: 'example'
          }
        ],
        modelValue: 'example'
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
