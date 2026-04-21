import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'

vi.mock('vike-vue/usePageContext', () => ({
  usePageContext: () => ({ urlPathname: '/mortgage' })
}))

import NavBar from './NavBar.vue'

describe('NavBar', () => {
  let wrapper: VueWrapper<any>

  const nav = () => wrapper.find('nav')
  const logo = () => wrapper.find('img')

  beforeEach(() => {
    wrapper = mount(NavBar)
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(logo().exists()).toBe(true)
    expect(nav().exists()).toBe(true)
  })

  it('marks the active route with aria-current', () => {
    const active = wrapper.find('a[aria-current="page"]')
    expect(active.exists()).toBe(true)
    expect(active.attributes('href')).toBe('/mortgage')
  })
})
