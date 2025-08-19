import React from 'react'
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

const sample: User[] = [
  { id: 1, name: 'Ananya', email: 'ananya@example.com', age: 24 },
  { id: 2, name: 'Rahul', email: 'rahul@example.com', age: 28 },
  { id: 3, name: 'Zoya', email: 'zoya@example.com', age: 22 },
  { id: 4, name: 'Vijay', email: 'vijay@example.com', age: 23 },
  { id: 5, name: 'Mohan', email: 'mohan@example.com', age: 25 },
  { id: 6, name: 'Ravi', email: 'ravi@example.com', age: 22 }
]

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const [value, setValue] = React.useState('')

  return (
    <div className="min-h-screen p-6 md:p-10 space-y-8 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">UI Components Demo</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-xl border shadow dark:border-gray-600"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl border shadow dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">InputField</h2>
          <div className="space-y-4">
            <InputField
              label="Email"
              placeholder="username@example.com"
              helperText="We’ll never share your email."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outlined"
              size="md"
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              helperText="Use at least 8 characters."
              variant="filled"
              size="lg"
              type="password"
            />
            <InputField
              label="Loading state"
              loading
              helperText="Simulating async validation…"
              variant="ghost"
              size="sm"
            />
            <InputField
              label="Invalid"
              invalid
              errorMessage="Please provide a valid value."
              variant="outlined"
            />
          </div>
        </div>

        <div className="p-6 rounded-xl border shadow dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">DataTable</h2>
          <DataTable<User>
            data={sample}
            loading={false}
            selectable
            selectionMode="multiple"
            onRowSelect={(rows) => console.log('Selected:', rows)}
            columns={[
              { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
              { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
              { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
