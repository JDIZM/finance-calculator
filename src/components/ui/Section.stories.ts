import Section from './Section.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['transparent', 'cream', 'emerald-950', 'ink-950', 'accent-indigo']
    }
  }
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

const hero = `
  <Section v-bind="args">
    <h1 class="font-display text-5xl font-black leading-heading tracking-tightest md:text-7xl">
      Bold, chunky finance tools
    </h1>
    <p class="mt-4 max-w-xl text-lg opacity-80">
      Compound interest, mortgage, savings goals, FIRE — all free, all in one place.
    </p>
  </Section>
`

export const Transparent: Story = {
  args: { tone: 'transparent' },
  render: (args) => ({ components: { Section }, setup: () => ({ args }), template: hero })
}

export const Cream: Story = { ...Transparent, args: { tone: 'cream' } }
export const Emerald: Story = { ...Transparent, args: { tone: 'emerald-950' } }
export const Ink: Story = { ...Transparent, args: { tone: 'ink-950' } }
export const Indigo: Story = { ...Transparent, args: { tone: 'accent-indigo' } }
