import { ArrowCounterClockwise, CaretDown, CheckCircle, DownloadSimple, MagnifyingGlass, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { EmptyState } from '../../components/ui/EmptyState'
import { MockTag } from '../../components/ui/MockTag'
import { PanelHeader } from '../../components/ui/PanelHeader'
import { Toolbar } from '../../components/ui/Toolbar'
import type { Career, Screen, StudyPlan, Subject } from '../../types/domain'

type AcademicViewProps = {
  screen: Screen
  query: string
  setQuery: (value: string) => void
  onCreate: () => void
  onEdit: (id: number) => void
  onDeactivate: (id: number) => void
  onRestore: (id: number) => void
  onNotify: (value: string) => void
  careers: Career[]
  plans: StudyPlan[]
  subjects: Subject[]
  correlatives: Record<number, number[]>
  onAddCorrelative: (subjectId: number, prerequisiteId: number) => void
  onRemoveCorrelative: (subjectId: number, prerequisiteId: number) => void
}

export function AcademicView({ screen, query, setQuery, onCreate, onEdit, onDeactivate, onRestore, onNotify, careers, plans, subjects, correlatives, onAddCorrelative, onRemoveCorrelative }: AcademicViewProps) {
  const [statusFilter, setStatusFilter] = useState('')
  const normalizedQuery = query.toLowerCase()
  const source = screen === 'Carreras' ? careers : screen === 'Planes de estudio' ? plans : subjects
  const rows = useMemo(() => source.filter((item) => {
    const searchable = `${item.name} ${item.code} ${'faculty' in item ? item.faculty : item.career}`.toLowerCase()
    return searchable.includes(normalizedQuery) && (!statusFilter || item.status === statusFilter)
  }), [source, normalizedQuery, statusFilter])
  const title = screen === 'Carreras' ? 'carreras' : screen === 'Planes de estudio' ? 'planes' : 'asignaturas'

  if (screen === 'Correlatividades') return <Correlatives subjects={subjects} correlatives={correlatives} onAdd={onAddCorrelative} onRemove={onRemoveCorrelative} onNotify={onNotify} />

  return <><Toolbar query={query} setQuery={setQuery} placeholder={`Buscar ${title}...`} filterValue={statusFilter} onFilterChange={setStatusFilter} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {screen === 'Asignaturas' ? 'asignatura' : screen === 'Carreras' ? 'carrera' : 'plan'}</button>} /><div className="list-meta"><span>{rows.length} resultados <MockTag /></span><span>Los cambios se guardan en esta demo</span></div><div className="table-wrap"><table><thead><tr><th>{screen === 'Asignaturas' ? 'Código' : 'Identificador'}</th><th>Nombre</th><th>{screen === 'Carreras' ? 'Facultad' : 'Carrera'}</th><th>Estado</th><th aria-label="Acciones" /></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td><span className="code">{item.code}</span></td><td><strong>{item.name}</strong><small>{'credits' in item ? `${item.credits} créditos · ${item.year}` : 'faculty' in item ? `${item.title} · ${item.duration}` : `${item.subjectsCount} asignaturas · ${item.validFrom}`}</small></td><td>{'faculty' in item ? item.faculty : item.career}</td><td><span className={`status ${item.status === 'Activa' ? 'success' : item.status === 'Inactiva' ? 'warning' : 'draft'}`}><i />{item.status}</span></td><td><button className="row-action" onClick={() => onEdit(item.id)} aria-label={`Editar ${item.name}`}><PencilSimple size={17} /></button>{screen === 'Planes de estudio' && <button className="row-action" onClick={() => onNotify(`Descargando ${item.name} en PDF`)} aria-label={`Descargar ${item.name} en PDF`}><DownloadSimple size={17} /></button>}{item.status !== 'Inactiva' ? <button className="row-action danger" onClick={() => onDeactivate(item.id)} aria-label={`Desactivar ${item.name}`}><Trash size={17} /></button> : <button className="row-action" onClick={() => onRestore(item.id)} aria-label={`Restaurar ${item.name}`}><ArrowCounterClockwise size={17} /></button>}</td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} />}</div></>
}

type CorrelativesProps = { subjects: Subject[]; correlatives: Record<number, number[]>; onAdd: (subjectId: number, prerequisiteId: number) => void; onRemove: (subjectId: number, prerequisiteId: number) => void; onNotify: (value: string) => void }

function Correlatives({ subjects, correlatives, onAdd, onRemove, onNotify }: CorrelativesProps) {
  const [selectedId, setSelectedId] = useState(subjects[0]?.id ?? 0)
  const [search, setSearch] = useState('')
  const [candidate, setCandidate] = useState('')
  const selected = subjects.find((subject) => subject.id === selectedId) ?? subjects[0]
  const requiredIds = selected ? correlatives[selected.id] ?? [] : []
  const required = subjects.filter((subject) => requiredIds.includes(subject.id))
  const options = subjects.filter((subject) => subject.id !== selected?.id && !requiredIds.includes(subject.id))
    .filter((subject) => `${subject.name} ${subject.code}`.toLowerCase().includes(search.toLowerCase()))

  const add = () => {
    if (!selected || !candidate) {
      onNotify('Seleccioná una asignatura para agregar como correlativa.')
      return
    }
    onAdd(selected.id, Number(candidate))
    setCandidate('')
  }

  return <div className="split-layout"><article className="panel course-tree"><PanelHeader title="Asignaturas del plan" subtitle="Ingeniería en Informática · Plan 2026" /><div className="tree-search"><MagnifyingGlass size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar asignatura..." aria-label="Buscar asignatura" /></div>{subjects.filter((subject) => `${subject.name} ${subject.code}`.toLowerCase().includes(search.toLowerCase())).map((subject) => <button key={subject.id} className={`tree-row ${subject.id === selected?.id ? 'selected' : ''}`} onClick={() => setSelectedId(subject.id)}><span className="tree-code">{subject.code}</span><span>{subject.name}</span><CaretDown size={15} /></button>)}</article><article className="panel detail-panel">{selected ? <><div className="detail-kicker">ASIGNATURA SELECCIONADA</div><h2>{selected.name}</h2><p className="detail-copy">Las materias que figuran aquí deben estar aprobadas antes de cursar esta asignatura.</p><div className="detail-label">CORRELATIVIDADES REQUERIDAS <span>{required.length}</span></div>{required.length === 0 && <p className="muted-copy">No hay correlatividades configuradas.</p>}{required.map((subject) => <div className="requirement" key={subject.id}><CheckCircle size={20} weight="fill" /><span><strong>{subject.name}</strong><small>{subject.code} · Requerida</small></span><button onClick={() => onRemove(selected.id, subject.id)}>Quitar</button></div>)}<div className="correlative-add"><select value={candidate} onChange={(event) => setCandidate(event.target.value)} aria-label="Seleccionar correlativa"><option value="">Seleccionar asignatura...</option>{options.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}</select><button className="secondary-button" onClick={add}><Plus size={16} /> Agregar correlativa</button></div></> : <p className="muted-copy">No hay asignaturas disponibles.</p>}</article></div>
}
