import { CaretDown, CheckCircle, DownloadSimple, MagnifyingGlass, PencilSimple, Plus, Trash } from '@phosphor-icons/react'
import { courses, careers, studyPlans } from '../../data/mocks'
import { EmptyState } from '../../components/ui/EmptyState'
import { MockTag } from '../../components/ui/MockTag'
import { PanelHeader } from '../../components/ui/PanelHeader'
import { Toolbar } from '../../components/ui/Toolbar'
import type { Screen } from '../../types/domain'

type AcademicViewProps = { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }

export function AcademicView({ screen, query, setQuery, onCreate, onNotify }: AcademicViewProps) {
  if (screen === 'Correlatividades') return <Correlatives onNotify={onNotify} />

  const source = screen === 'Carreras' ? careers : screen === 'Planes de estudio' ? studyPlans : courses
  const rows = source.filter((course) => `${course.name} ${course.code} ${course.career}`.toLowerCase().includes(query.toLowerCase()))
  const title = screen === 'Carreras' ? 'carreras' : screen === 'Planes de estudio' ? 'planes' : 'asignaturas'

  return <><Toolbar query={query} setQuery={setQuery} placeholder={`Buscar ${title}...`} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {screen === 'Asignaturas' ? 'asignatura' : screen === 'Carreras' ? 'carrera' : 'plan'}</button>} /><div className="list-meta"><span>{rows.length} resultados <MockTag /></span><span>Actualizado hoy, 09:42</span></div><div className="table-wrap"><table><thead><tr><th>{screen === 'Asignaturas' ? 'Código' : 'Identificador'}</th><th>Nombre</th><th>{screen === 'Carreras' ? 'Título' : 'Carrera'}</th><th>Estado</th><th aria-label="Acciones" /></tr></thead><tbody>{rows.map((course) => <tr key={course.id}><td><span className="code">{course.code}</span></td><td><strong>{course.name}</strong><small>{screen === 'Asignaturas' ? `${course.credits} créditos · ${course.year}` : screen === 'Carreras' ? course.year : `${course.credits} asignaturas · ${course.year}`}</small></td><td>{course.career}</td><td><span className={`status ${course.status === 'Activa' ? 'success' : 'draft'}`}><i />{course.status}</span></td><td><button className="row-action" onClick={() => onNotify(`Editando ${course.name}`)} aria-label={`Editar ${course.name}`}><PencilSimple size={17} /></button>{screen === 'Planes de estudio' && <button className="row-action" onClick={() => onNotify(`Descargando ${course.name} en PDF`)} aria-label={`Descargar ${course.name} en PDF`}><DownloadSimple size={17} /></button>}<button className="row-action danger" onClick={() => onNotify('La eliminación se habilitará con la API')} aria-label={`Eliminar ${course.name}`}><Trash size={17} /></button></td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} />}</div></>
}

function Correlatives({ onNotify }: { onNotify: (value: string) => void }) {
  return <div className="split-layout"><article className="panel course-tree"><PanelHeader title="Asignaturas del plan" subtitle="Ingeniería en Informática · Plan 2026" /><div className="tree-search"><MagnifyingGlass size={17} /><input placeholder="Buscar asignatura..." aria-label="Buscar asignatura" /></div>{courses.slice(0, 4).map((course, index) => <button key={course.id} className={`tree-row ${index === 0 ? 'selected' : ''}`} onClick={() => onNotify(`Seleccionaste ${course.name}`)}><span className="tree-code">{course.code}</span><span>{course.name}</span><CaretDown size={15} /></button>)}</article><article className="panel detail-panel"><div className="detail-kicker">ASIGNATURA SELECCIONADA</div><h2>Desarrollo de Aplicaciones II</h2><p className="detail-copy">Las materias que figuran aquí deben estar aprobadas antes de cursar esta asignatura.</p><div className="detail-label">CORRELATIVIDADES REQUERIDAS <span>2</span></div><div className="requirement"><CheckCircle size={20} weight="fill" /><span><strong>Programación II</strong><small>INF-201 · Aprobada</small></span><button onClick={() => onNotify('Correlativa quitada')}>Quitar</button></div><div className="requirement"><CheckCircle size={20} weight="fill" /><span><strong>Bases de Datos</strong><small>INF-205 · Aprobada</small></span><button onClick={() => onNotify('Correlativa quitada')}>Quitar</button></div><button className="secondary-button" onClick={() => onNotify('Selector de correlativas abierto')}><Plus size={16} /> Agregar correlativa</button></article></div>
}
