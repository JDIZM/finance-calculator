import { describe, it, beforeEach } from 'vitest'
import { render, type RenderResult } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from './MortgageResults.stories'

const { RepaymentResults } = composeStories(stories)

describe('MortgageResults', () => {
  let wrapper: RenderResult
  // const { args } = RepaymentResults

  beforeEach(() => {
    wrapper = render(RepaymentResults())

    return () => {
      wrapper.unmount()
    }
  })
  it.todo('passes')
})
