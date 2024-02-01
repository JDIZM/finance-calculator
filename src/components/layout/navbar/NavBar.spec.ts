import { describe, it, expect, beforeEach } from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import NavBar from './NavBar.vue'

describe('NavBar', () => {
  let wrapper: VueWrapper<any>

  const nav = () => wrapper.find('nav')
  const logo = () => wrapper.find('svg')

  beforeEach(() => {
    wrapper = mount(NavBar, {
      global: {
        stubs: ['router-link']
      }
    })
  })
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(logo().exists()).toBe(true)
    expect(nav().exists()).toBe(true)
  })
})
