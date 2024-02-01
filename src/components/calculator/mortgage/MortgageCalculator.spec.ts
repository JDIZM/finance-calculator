import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MortgageCalculator from './MortgageCalculator.vue'

// pinia
import { createTestingPinia } from '@pinia/testing'
import { useMortgageStore } from '@/stores/mortgage'

describe('MortgageCalculator', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(MortgageCalculator, {
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
    const store = useMortgageStore()
    expect(wrapper.exists()).toBe(true)
  })
})
