import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, type RenderResult, fireEvent } from '@testing-library/vue'
import { composeStories } from '@storybook/testing-vue3'
import * as stories from './DebtRepaymentOption.stories'

const { Default, Checked } = composeStories(stories)

describe('DebtRepaymentOption', () => {
  describe('Default', () => {
    let wrapper: RenderResult
    const { args } = Default

    beforeEach(() => {
      wrapper = render(Default())

      return () => {
        wrapper.unmount()
      }
    })

    it('renders the correct elements when unchecked by default', () => {
      const title = screen.getByText('Debt Repayment')
      const checkbox = screen.getByLabelText('Is the principal borrowed?')

      expect(title.outerHTML).toContain('h3')
      expect(title.innerHTML).toContain('Debt Repayment')

      expect(checkbox.outerHTML).toContain('input')
      expect(checkbox.outerHTML).toContain('type="checkbox"')
    })

    it("doesn't display debt repayment options by default", () => {
      expect(() => screen.getByLabelText('Interest Rate of the loaned principal')).toThrowError()
    })

    it('displays the debt repayment options when checkbox is clicked', async () => {
      const principalCheckbox = screen.getByLabelText('Is the principal borrowed?')

      await fireEvent.click(principalCheckbox)

      const eventEmitted = wrapper.emitted('change')

      const interestRateInput = screen.getByLabelText('Interest Rate of the loaned principal')
      const radioButtons = screen.getAllByRole('radio')

      expect(eventEmitted.length).toBe(1)
      expect(interestRateInput).not.toBeNull()
      expect(radioButtons.length).toBe(2)
      expect(radioButtons[0].outerHTML).toContain('value="interestOnly"')
      expect(radioButtons[1].outerHTML).toContain('value="repayment"')
    })
  })

  describe('Checked', () => {
    let wrapper: RenderResult
    const { args } = Checked

    beforeEach(() => {
      wrapper = render(Checked())

      return () => {
        wrapper.unmount()
      }
    })

    it('renders the debt repayment options', () => {
      const radioButtons = screen.getAllByRole('radio')
      const interestRateInput = screen.getByLabelText('Interest Rate of the loaned principal')

      expect(interestRateInput).not.toBeNull()

      expect(radioButtons.length).toBe(2)
      expect(radioButtons[0].outerHTML).toContain('value="interestOnly"')
      expect(radioButtons[1].outerHTML).toContain('value="repayment"')
    })

    it('hides the debt repayment options when unchecked', async () => {
      const principalCheckbox = screen.getByLabelText('Is the principal borrowed?')

      await fireEvent.click(principalCheckbox)

      expect(() => screen.getByLabelText('Interest Rate of the loaned principal')).toThrowError()
    })
  })
})
