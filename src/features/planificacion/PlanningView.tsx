import { CaretDown, CheckCircle, MapPin, PencilSimple, Plus } from '@phosphor-icons/react'
import { courses, rooms } from '../../data/mocks'
import { EmptyState } from '../../components/ui/EmptyState'
import { Toolbar } from '../../components/ui/Toolbar'
import type { Screen } from '../../types/domain'

type PlanningViewProps = { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }

export function PlanningView({ screen, query, setQuery, onCreate, onNotify }: PlanningViewProps) {
  if (screen === 'Agenda') return <Agenda onNotify={onNotify} />
  if (screen === 'Asignaciones') return <Assignments onNotify={onNotify} />

  const rows = rooms.filter((room) => `${room.name} ${room.campus} ${room.type}`.toLowerCase().includes(query.toLowerCase()))
  return <><Toolbar query={query} setQuery={setQuery} placeholder="Buscar sede o aula..." action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Nueva aula</button>} /><div className="campus-strip"><span><MapPin size={18} /> Monserrat <b>18 aulas</b></span><span><MapPin size={18} /> Recoleta <b>9 aulas</b></span><span><MapPin size={18} /> Pilar <b>7 aulas</b></span></div><div className="table-wrap"><table><thead><tr><th>Aula</th><th>Sede</th><th>Tipo</th><th>Capacidad</th><th>Estado</th><th aria-label="Acciones" /></tr></thead><tbody>{rows.map((room) => <tr key={room.id}><td><strong>{room.name}</strong></td><td>{room.campus}</td><td>{room.type}</td><td>{room.capacity} personas</td><td><span className={`status ${room.status === 'Disponible' ? 'success' : 'warning'}`}><i />{room.status}</span></td><td><button className="row-action" onClick={() => onNotify(`Editando ${room.name}`)} aria-label={`Editar ${room.name}`}><PencilSimple size={17} /></button></td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} />}</div></>
}

function Assignments({ onNotify }: { onNotify: (value: string) => void }) {
  const slots = [{ time: '08:00 - 10:00', course: 'Desarrollo de Aplicaciones II', room: 'Lab. Informática 3', day: 'Lunes' }, { time: '10:00 - 12:00', course: 'Análisis Matemático II', room: 'Aula 204', day: 'Martes' }, { time: '18:30 - 20:30', course: 'Gestión de Proyectos', room: 'Aula Magna', day: 'Miércoles' }]
  return <><div className="assignment-toolbar"><div className="select-like">2.º cuatrimestre 2026 <CaretDown size={15} /></div><div className="select-like">Semana del 17 jun <CaretDown size={15} /></div><button className="secondary-button" onClick={() => onNotify('Conflictos revisados: no se encontraron superposiciones')}><CheckCircle size={16} /> Revisar conflictos</button></div><div className="schedule"><div className="schedule-head"><span>HORARIO</span><span>LUNES</span><span>MARTES</span><span>MIÉRCOLES</span><span>JUEVES</span><span>VIERNES</span></div>{slots.map((slot) => <div className="schedule-row" key={slot.course}><span>{slot.time}</span><div className={slot.day === 'Lunes' ? 'scheduled' : ''}>{slot.day === 'Lunes' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div className={slot.day === 'Martes' ? 'scheduled green-card' : ''}>{slot.day === 'Martes' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div className={slot.day === 'Miércoles' ? 'scheduled purple-card' : ''}>{slot.day === 'Miércoles' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div /><div /></div>)}</div><div className="legend"><span><i className="blue-dot" /> Cursos asignados</span><span><i className="green-dot" /> Disponible</span><span><i className="red-dot" /> Superposición detectada</span></div></>
}

function Agenda({ onNotify }: { onNotify: (value: string) => void }) {
  return <><div className="agenda-toolbar"><button className="calendar-nav" onClick={() => onNotify('Semana anterior')} aria-label="Semana anterior">‹</button><strong>17 - 23 de junio, 2026</strong><button className="calendar-nav" onClick={() => onNotify('Semana siguiente')} aria-label="Semana siguiente">›</button><button className="secondary-button today" onClick={() => onNotify('Volviste a hoy')}>Hoy</button></div><div className="agenda-grid">{['Lunes 17', 'Martes 18', 'Miércoles 19', 'Jueves 20', 'Viernes 21'].map((day, index) => <div className="agenda-day" key={day}><strong>{day}</strong><span className="agenda-count">{index === 0 ? 3 : index === 2 ? 2 : 1} reservas</span>{[0, 1, 2].slice(0, index === 0 ? 3 : index === 2 ? 2 : 1).map((item) => <div className={`agenda-event event-${(index + item) % 3}`} key={item}><small>{item === 0 ? '08:00' : item === 1 ? '10:00' : '18:30'}</small><strong>{courses[(index + item) % courses.length].name}</strong><span>{rooms[(index + item) % rooms.length].name}</span></div>)}</div>)}</div></>
}
