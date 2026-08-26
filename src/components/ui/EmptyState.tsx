import { MagnifyingGlass } from '@phosphor-icons/react'

export function EmptyState({ query }: { query: string }) {
  return <div className="empty-state"><MagnifyingGlass size={26} /><strong>No encontramos resultados</strong><span>{query ? `Probá con otro término distinto de “${query}”.` : 'Todavía no hay registros para mostrar.'}</span></div>
}
