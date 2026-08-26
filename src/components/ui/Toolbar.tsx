import { CaretDown, MagnifyingGlass, SlidersHorizontal } from '@phosphor-icons/react'
import type { ReactNode } from 'react'

type ToolbarProps = {
  query: string
  setQuery: (query: string) => void
  placeholder: string
  action?: ReactNode
  filters?: boolean
}

export function Toolbar({ query, setQuery, placeholder, action, filters = true }: ToolbarProps) {
  return <div className="toolbar"><label className="search"><MagnifyingGlass size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>{filters && <button className="filter-button"><SlidersHorizontal size={16} /> Filtros <CaretDown size={14} /></button>}{action}</div>
}
