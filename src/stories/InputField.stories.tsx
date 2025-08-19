import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { InputField } from '../components/InputField'
import '../index.css'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: { layout: 'centered' }
}
export default meta
type Story = StoryObj<typeof InputField>

export const Playground: Story = {
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div className="w-96">
        <InputField label="Email" placeholder="you@example.com" value={val} onChange={e => setVal(e.target.value)} helperText="We’ll never share your email." />
      </div>
    )
  }
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <InputField label="Filled" variant="filled" placeholder="Text" />
      <InputField label="Outlined" variant="outlined" placeholder="Text" />
      <InputField label="Ghost" variant="ghost" placeholder="Text" />
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <InputField label="Disabled" disabled placeholder="Text" />
      <InputField label="Loading" loading placeholder="Text" />
      <InputField label="Invalid" invalid errorMessage="Invalid value" placeholder="Text" />
      <InputField label="Password" type="password" placeholder="••••••••" />
    </div>
  )
}
