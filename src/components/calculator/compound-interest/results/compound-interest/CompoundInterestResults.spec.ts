import { describe, it, beforeEach } from 'vitest'
import { render, type RenderResult } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from './CompoundInterestResults.stories'

const { LumpSumpResults } = composeStories(stories)

describe('CompoundInterestResults', () => {
  let wrapper: RenderResult
  // const { args } = RepaymentResults

  beforeEach(() => {
    wrapper = render(LumpSumpResults())

    return () => {
      wrapper.unmount()
    }
  })
  it.todo('passes')
})
