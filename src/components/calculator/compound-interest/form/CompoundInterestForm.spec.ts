import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, type RenderResult, fireEvent } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from './CompoundInterestForm.stories'

const { Default } = composeStories(stories)

describe('CompoundInterestForm', () => {
  let wrapper: RenderResult
  const { args } = Default

  beforeEach(() => {
    wrapper = render(Default())

    return () => {
      wrapper.unmount()
    }
  })

  it('renders debtRepaymentOptions when checkbox is clicked.', async () => {
    const debtRepaymentCheckbox = screen.getByLabelText('Is the principal borrowed?')

    await fireEvent.click(debtRepaymentCheckbox)

    const emittedEvent = wrapper.emitted('change')

    const interestRateInput = screen.getByLabelText('Interest Rate of the loaned principal')
    const radioButtons = screen.getAllByRole('radio')

    expect(emittedEvent.length).toBe(1)
    expect(interestRateInput).not.toBeNull()
    expect(radioButtons.length).toBe(2)
    expect(radioButtons[0].outerHTML).toContain('value="interestOnly"')
    expect(radioButtons[1].outerHTML).toContain('value="repayment"')
  })
})
