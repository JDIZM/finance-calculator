import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CompoundInterestCalc from './CompoundInterestCalc.vue'

// pinia
import { createTestingPinia } from '@pinia/testing'
import { useCompoundInterestStore } from '@/stores/compound'

describe('CompoundInterestCalc', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(CompoundInterestCalc, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it('renders properly', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const store = useCompoundInterestStore()
    expect(wrapper.exists()).toBe(true)
  })
})
