import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from './NavBar.vue'

// No vi.mock here on purpose: usePageContext() runs for real, which throws outside a Vike
// app (as in Storybook/Chromatic). NavBar must still render, just with no active route.
describe('NavBar without a Vike page context', () => {
  it('renders without throwing and marks no route active', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.findAll('a[aria-current="page"]')).toHaveLength(0)
  })
})
