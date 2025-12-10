import type { Meta, StoryObj } from '@storybook/vue3'
import ChartCmp from './ChartCmp.vue'

const meta: Meta<typeof ChartCmp> = {
  title: 'Components/ChartCmp',
  component: ChartCmp,
  tags: ['autodocs'],
  argTypes: {
    currency: {
      control: 'select',
      options: ['£', '$', '€'],
      description: 'Currency symbol to display in tooltips and axes'
    },
    height: {
      control: { type: 'number', min: 200, max: 600, step: 50 },
      description: 'Height of the chart in pixels'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show or hide the chart legend'
    }
  }
}

export default meta
type Story = StoryObj<typeof ChartCmp>

export const Default: Story = {
  args: {
    labels: ['1Y', '5Y', '10Y', '15Y', '20Y', '25Y'],
    deposits: [6000, 36000, 66000, 96000, 126000, 156000],
    interest: [150, 4800, 17200, 38500, 70000, 113000],
    projection: [6150, 40800, 83200, 134500, 196000, 269000],
    currency: '£',
    height: 350,
    showLegend: true
  }
}

export const ShortTerm: Story = {
  args: {
    labels: ['1Y', '2Y', '3Y', '4Y', '5Y'],
    deposits: [12000, 24000, 36000, 48000, 60000],
    interest: [300, 1200, 2700, 4800, 7500],
    projection: [12300, 25200, 38700, 52800, 67500],
    currency: '£',
    height: 300,
    showLegend: true
  }
}

export const LongTerm: Story = {
  args: {
    labels: ['5Y', '10Y', '15Y', '20Y', '25Y', '30Y', '35Y', '40Y'],
    deposits: [18600, 39600, 62400, 87000, 113400, 141600, 171600, 203400],
    interest: [2400, 15800, 45200, 95600, 172800, 284400, 440800, 654400],
    projection: [21000, 55400, 107600, 182600, 286200, 426000, 612400, 857800],
    currency: '$',
    height: 400,
    showLegend: true
  }
}

export const WithoutInterest: Story = {
  args: {
    labels: ['1Y', '5Y', '10Y', '15Y', '20Y', '25Y'],
    deposits: [6000, 30000, 60000, 90000, 120000, 150000],
    projection: [6150, 31500, 63000, 94500, 126000, 157500],
    currency: '€',
    height: 350,
    showLegend: true
  }
}

export const NoLegend: Story = {
  args: {
    labels: ['1Y', '5Y', '10Y', '15Y', '20Y', '25Y'],
    deposits: [6000, 36000, 66000, 96000, 126000, 156000],
    interest: [150, 4800, 17200, 38500, 70000, 113000],
    projection: [6150, 40800, 83200, 134500, 196000, 269000],
    currency: '£',
    height: 350,
    showLegend: false
  }
}

export const CompactChart: Story = {
  args: {
    labels: ['1Y', '5Y', '10Y', '15Y', '20Y', '25Y'],
    deposits: [6000, 36000, 66000, 96000, 126000, 156000],
    interest: [150, 4800, 17200, 38500, 70000, 113000],
    projection: [6150, 40800, 83200, 134500, 196000, 269000],
    currency: '£',
    height: 250,
    showLegend: false
  }
}
