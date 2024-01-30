import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CompoundInterestCalc from './CompoundInterestCalc.vue'

// pinia
// import { setActivePinia, createPinia } from 'pinia'
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
    console.log('wrapper', wrapper.html())
    // setup store
    const store = useCompoundInterestStore()
    expect(wrapper.exists()).toBe(true)
  })
})
