import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '../components/DataTable'
import '../index.css'

type User = { id: number; name: string; email: string; age: number }
const data: User[] = [
  { id: 1, name: 'Ananya', email: 'ananya@example.com', age: 24 },
  { id: 2, name: 'Rahul', email: 'rahul@example.com', age: 28 },
  { id: 3, name: 'Zoya', email: 'zoya@example.com', age: 22 },
]

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  parameters: { layout: 'centered' }
}
export default meta
type Story = StoryObj<typeof DataTable<User>>

export const Basic: Story = {
  args: {
    data,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    ]
  }
}

export const Selectable: Story = {
  args: {
    data,
    selectable: true,
    selectionMode: 'multiple',
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    ]
  }
}

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name' },
    ]
  }
}

export const Empty: Story = {
  args: {
    data: [],
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name' },
    ]
  }
}
