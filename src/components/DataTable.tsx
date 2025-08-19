import React from 'react'
import clsx from 'clsx'

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  selectionMode?: 'single' | 'multiple';
  rowKey?: (row: T, index: number) => string | number;
}

type SortState<T> = { key: keyof T | null; direction: 'asc' | 'desc' | null }

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  selectionMode = 'multiple',
  rowKey
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>({ key: null, direction: null })
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sorted = React.useMemo(() => {
    if (!sort.key || !sort.direction) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const av = a[sort.key!]
      const bv = b[sort.key!]
      if (av == null) return -1
      if (bv == null) return 1
      if (av < bv) return sort.direction === 'asc' ? -1 : 1
      if (av > bv) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [data, sort])

  const toggleSort = (key: keyof T) => {
    setSort(s => {
      if (s.key !== key) return { key, direction: 'asc' }
      if (s.direction === 'asc') return { key, direction: 'desc' }
      return { key: null, direction: null }
    })
  }

  const keyFor = (row: T, i: number) => rowKey ? rowKey(row, i) : i

  const handleRowToggle = (idx: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (selectionMode === 'single') {
        next.clear()
        next.add(idx)
      } else {
        if (next.has(idx)) next.delete(idx); else next.add(idx)
      }
      onRowSelect?.(Array.from(next).map(i => sorted[i]))
      return next
    })
  }

  const allSelected = selected.size === sorted.length && sorted.length > 0
  const toggleAll = () => {
    if (selectionMode === 'single') return
    setSelected(prev => {
      if (prev.size === sorted.length) {
        onRowSelect?.([])
        return new Set()
      }
      const all = new Set<number>(sorted.map((_, i) => i))
      onRowSelect?.(sorted)
      return all
    })
  }

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-white/30 dark:border-white/10 glass shadow-soft">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-sm uppercase tracking-wide text-gray-600/80 dark:text-gray-300/80">
            {selectable && (
              <th className="p-3">
                {selectionMode === 'multiple' ? (
                  <input aria-label="Select all rows" type="checkbox" checked={allSelected} onChange={toggleAll} />
                ) : <span className="opacity-60">Select</span>}
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className="p-3 select-none">
                <button
                  className={clsx('flex items-center gap-2', col.sortable && 'hover:opacity-80')}
                  onClick={() => col.sortable && toggleSort(col.dataIndex)}
                  aria-sort={sort.key === col.dataIndex ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <span>{col.title}</span>
                  {col.sortable && (
                    <span aria-hidden="true">
                      {sort.key === col.dataIndex ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td className="p-6 text-center" colSpan={columns.length + (selectable ? 1 : 0)}>Loading…</td></tr>
          ) : sorted.length === 0 ? (
            <tr><td className="p-6 text-center" colSpan={columns.length + (selectable ? 1 : 0)}>No data</td></tr>
          ) : (
            sorted.map((row, i) => {
              const idx = i
              const isSel = selected.has(idx)
              return (
                <tr
                  key={String(keyFor(row, i))}
                  className={clsx('transition', isSel ? 'bg-plum-100/70 dark:bg-white/10' : 'hover:bg-white/50 dark:hover:bg-white/5')}
                >
                  {selectable && (
                    <td className="p-3">
                      {selectionMode === 'multiple' ? (
                        <input
                          aria-label={`Select row ${i+1}`}
                          type="checkbox"
                          checked={isSel}
                          onChange={() => handleRowToggle(idx)}
                        />
                      ) : (
                        <input
                          aria-label={`Select row ${i+1}`}
                          type="radio"
                          name="datatable-selection"
                          checked={isSel}
                          onChange={() => handleRowToggle(idx)}
                        />
                      )}
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="p-3 whitespace-nowrap">
                      {String(row[col.dataIndex])}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
