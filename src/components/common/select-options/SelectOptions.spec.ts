import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SelectOptions from './SelectOptions.vue'

describe('SelectOptions', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(SelectOptions, {
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

  xit('renders with the default option selected', () => {})
  xit('changes the selected option when clicked', () => {})
})
