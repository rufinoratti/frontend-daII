import { ArrowRight, CalendarBlank, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { MockTag } from '../../components/ui/MockTag'
import { EmptyState } from '../../components/ui/EmptyState'
import { Toolbar } from '../../components/ui/Toolbar'
import type { AcademicPeriod, ExamTurn, Screen } from '../../types/domain'

type CycleViewProps = { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void; periods: AcademicPeriod[]; turns: ExamTurn[]; onEdit: (id: number) => void; onDeactivate: (id: number) => void }

export function CycleView({ screen, query, setQuery, onCreate, onNotify, periods, turns, onEdit, onDeactivate }: CycleViewProps) {
  const [statusFilter, setStatusFilter] = useState('')
  const isPeriods = screen === 'Períodos'
  const source = isPeriods ? periods : turns
  const items = source.filter((item) => `${item.name} ${item.start} ${item.end}`.toLowerCase().includes(query.toLowerCase()) && (!statusFilter || item.status === statusFilter))
  const statuses = isPeriods ? ['Activo', 'Planificado', 'Finalizado'] : ['Inscripción abierta', 'Planificado', 'Finalizado']
  return <><Toolbar query={query} setQuery={setQuery} placeholder={isPeriods ? 'Buscar período...' : 'Buscar turno...'} filterValue={statusFilter} onFilterChange={setStatusFilter} filterOptions={statuses} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {isPeriods ? 'período' : 'turno'}</button>} /><div className="status-filter-hint">{statuses.map((status) => <button key={status} className={statusFilter === status ? 'selected' : ''} onClick={() => setStatusFilter(statusFilter === status ? '' : status)}>{status}</button>)}</div>{items.length === 0 ? <EmptyState query={query} /> : <div className="cycle-cards">{items.map((item) => <article className="cycle-card" key={item.id}><div className="cycle-top"><span className={`status ${item.status === 'Activo' || item.status === 'Inscripción abierta' ? 'success' : item.status === 'Finalizado' ? 'neutral' : 'draft'}`}><i />{item.status}</span><span className="cycle-actions"><button className="row-action" onClick={() => onEdit(item.id)} aria-label={`Editar ${item.name}`}><PencilSimple size={17} /></button>{item.status !== 'Finalizado' && <button className="row-action danger" onClick={() => onDeactivate(item.id)} aria-label={`Desactivar ${item.name}`}><Trash size={17} /></button>}</span></div><h2>{item.name}</h2><p><CalendarBlank size={16} /> {formatDateRange(item.start, item.end)}</p><div className="cycle-foot"><span><strong>{'exams' in item ? item.exams : item.status}</strong> {'exams' in item ? 'mesas de examen' : 'estado del período'}</span><button onClick={() => onNotify(`Detalle abierto: ${item.name}`)}>Ver detalle <ArrowRight size={15} /></button></div></article>)}</div>}<div className="list-meta"><span>{items.length} resultados <MockTag /></span><span>Los cambios se guardan en esta demo</span></div></>
}

function formatDateRange(start: string, end: string) {
  const parse = (value: string) => new Date(`${value}T12:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
  return `${parse(start)} - ${parse(end)}`
}
