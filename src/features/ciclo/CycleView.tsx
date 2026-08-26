import { ArrowRight, CalendarBlank, PencilSimple, Plus } from '@phosphor-icons/react'
import { Toolbar } from '../../components/ui/Toolbar'
import type { Screen } from '../../types/domain'

type CycleViewProps = { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }

const finals = [
  { name: 'Turno febrero 2027', date: '08 feb - 19 feb 2027', exams: 24, status: 'Planificado' },
  { name: 'Turno diciembre 2026', date: '01 dic - 12 dic 2026', exams: 31, status: 'Inscripción abierta' },
  { name: 'Turno agosto 2026', date: '03 ago - 14 ago 2026', exams: 28, status: 'Finalizado' },
]

export function CycleView({ screen, query, setQuery, onCreate, onNotify }: CycleViewProps) {
  return <><Toolbar query={query} setQuery={setQuery} placeholder={screen === 'Períodos' ? 'Buscar período...' : 'Buscar turno...'} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {screen === 'Períodos' ? 'período' : 'turno'}</button>} /><div className="cycle-cards">{finals.filter((item) => `${item.name} ${item.date}`.toLowerCase().includes(query.toLowerCase())).map((item, i) => <article className="cycle-card" key={item.name}><div className="cycle-top"><span className={`status ${i === 1 ? 'success' : i === 2 ? 'neutral' : 'draft'}`}><i />{item.status}</span><button className="row-action" onClick={() => onNotify(`Editando ${item.name}`)} aria-label={`Editar ${item.name}`}><PencilSimple size={17} /></button></div><h2>{item.name}</h2><p><CalendarBlank size={16} /> {item.date}</p><div className="cycle-foot"><span><strong>{item.exams}</strong> mesas de examen</span><button onClick={() => onNotify('Detalle abierto')}>Ver detalle <ArrowRight size={15} /></button></div></article>)}</div></>
}
