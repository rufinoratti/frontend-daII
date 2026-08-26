import { useState } from 'react'
import {
  ArrowRight, Bell, BookOpen, Buildings, CalendarBlank, CaretDown, Check,
  CheckCircle, ClipboardText, Clock, DownloadSimple, Exam, GraduationCap,
  House, ListChecks, MagnifyingGlass, MapPin, PencilSimple, Plus,
  SlidersHorizontal, Trash, X,
  WarningCircle, type Icon,
} from '@phosphor-icons/react'
import './index.css'

type Screen = 'Resumen' | 'Carreras' | 'Planes de estudio' | 'Asignaturas' | 'Correlatividades' | 'Sedes y aulas' | 'Asignaciones' | 'Agenda' | 'Períodos' | 'Turnos de examen' | 'Regularidad'

type Course = { id: number; code: string; name: string; career: string; year: string; credits: number; status: 'Activa' | 'Borrador' }
type Room = { id: number; name: string; campus: string; capacity: number; type: string; status: 'Disponible' | 'En uso' }

const courses: Course[] = [
  { id: 1, code: 'INF-302', name: 'Desarrollo de Aplicaciones II', career: 'Ingeniería en Informática', year: '3.º año', credits: 6, status: 'Activa' },
  { id: 2, code: 'MAT-204', name: 'Análisis Matemático II', career: 'Ingeniería en Informática', year: '2.º año', credits: 6, status: 'Activa' },
  { id: 3, code: 'ADM-116', name: 'Gestión de Proyectos', career: 'Lic. en Gestión Empresarial', year: '2.º año', credits: 4, status: 'Activa' },
  { id: 4, code: 'DIS-210', name: 'Diseño de Interfaces', career: 'Lic. en Diseño', year: '2.º año', credits: 4, status: 'Borrador' },
  { id: 5, code: 'INF-405', name: 'Arquitectura de Software', career: 'Ingeniería en Informática', year: '4.º año', credits: 6, status: 'Activa' },
]

const careers: Course[] = [
  { id: 1, code: 'ING-INF', name: 'Ingeniería en Informática', career: 'Facultad de Ingeniería', year: '5 años', credits: 0, status: 'Activa' },
  { id: 2, code: 'LIC-GES', name: 'Licenciatura en Gestión Empresarial', career: 'Facultad de Ciencias Económicas', year: '4 años', credits: 0, status: 'Activa' },
  { id: 3, code: 'LIC-DIS', name: 'Licenciatura en Diseño', career: 'Facultad de Arquitectura y Diseño', year: '4 años', credits: 0, status: 'Activa' },
  { id: 4, code: 'TEC-ANA', name: 'Tecnicatura en Analítica', career: 'Facultad de Ingeniería', year: '3 años', credits: 0, status: 'Borrador' },
]

const studyPlans: Course[] = [
  { id: 1, code: 'PLAN-2026', name: 'Plan de estudio 2026', career: 'Ingeniería en Informática', year: 'Vigente desde marzo 2026', credits: 42, status: 'Activa' },
  { id: 2, code: 'PLAN-2024', name: 'Plan de estudio 2024', career: 'Lic. en Gestión Empresarial', year: 'Vigente desde marzo 2024', credits: 38, status: 'Activa' },
  { id: 3, code: 'PLAN-2025', name: 'Plan de estudio 2025', career: 'Lic. en Diseño', year: 'Vigente desde marzo 2025', credits: 40, status: 'Activa' },
]

const rooms: Room[] = [
  { id: 1, name: 'Aula 204', campus: 'Monserrat', capacity: 42, type: 'Aula teórica', status: 'Disponible' },
  { id: 2, name: 'Lab. Informática 3', campus: 'Monserrat', capacity: 28, type: 'Laboratorio', status: 'En uso' },
  { id: 3, name: 'Aula Magna', campus: 'Recoleta', capacity: 120, type: 'Auditorio', status: 'Disponible' },
  { id: 4, name: 'Aula 12', campus: 'Pilar', capacity: 35, type: 'Aula teórica', status: 'Disponible' },
]

const navGroups: { label: string; items: { name: Screen; icon: Icon }[] }[] = [
  { label: 'INICIO', items: [{ name: 'Resumen', icon: House }] },
  { label: 'ESTRUCTURA ACADÉMICA', items: [{ name: 'Carreras', icon: GraduationCap }, { name: 'Planes de estudio', icon: BookOpen }, { name: 'Asignaturas', icon: ClipboardText }, { name: 'Correlatividades', icon: ListChecks }] },
  { label: 'PLANIFICACIÓN', items: [{ name: 'Sedes y aulas', icon: Buildings }, { name: 'Asignaciones', icon: CalendarBlank }, { name: 'Agenda', icon: Clock }] },
  { label: 'CICLO ACADÉMICO', items: [{ name: 'Períodos', icon: CalendarBlank }, { name: 'Turnos de examen', icon: Exam }, { name: 'Regularidad', icon: CheckCircle }] },
]

function MockTag() { return <span className="mock-tag">DATOS MOCK</span> }

function App() {
  const [screen, setScreen] = useState<Screen>('Resumen')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'course' | 'room' | 'period' | null>(null)
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (next: Screen) => { setScreen(next); setQuery(''); setSidebarOpen(false) }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="brand"><span className="brand-mark">U</span><span><strong>UADEnet</strong><small>Gestión académica</small></span><button className="close-sidebar" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú"><X size={20} /></button></div>
      <div className="sidebar-scroll">{navGroups.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map(({ name, icon: IconComponent }) => <button type="button" key={name} className={screen === name ? 'active' : ''} onClick={() => navigate(name)}><IconComponent size={19} weight={screen === name ? 'fill' : 'regular'} />{name}</button>)}</div>)}</div>
      <div className="profile"><span className="profile-avatar">SA</span><span><strong>Secretaría Académica</strong><small>Administrativo</small></span><CaretDown size={15} /></div>
    </aside>

    <section className="workspace">
      <header className="topbar"><button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><ListChecks size={22} /></button><div className="breadcrumb">Gestión académica <span>/</span> {screen}</div><div className="top-actions"><button className="icon-button" aria-label="Notificaciones"><Bell size={20} /><i /></button><button className="primary-button compact" onClick={() => setModal(screen === 'Sedes y aulas' || screen === 'Asignaciones' ? 'room' : screen === 'Períodos' ? 'period' : 'course')}><Plus size={16} /> Crear nuevo</button></div></header>
      <main className="page-content"><PageHeading screen={screen} onCreate={() => setModal(screen === 'Sedes y aulas' ? 'room' : screen === 'Períodos' ? 'period' : 'course')} />
        {screen === 'Resumen' && <Dashboard onNavigate={navigate} onCreate={() => setModal('course')} />}
        {['Carreras', 'Planes de estudio', 'Asignaturas', 'Correlatividades'].includes(screen) && <AcademicView screen={screen} query={query} setQuery={setQuery} onCreate={() => setModal('course')} onNotify={notify} />}
        {['Sedes y aulas', 'Asignaciones', 'Agenda'].includes(screen) && <PlanningView screen={screen} query={query} setQuery={setQuery} onCreate={() => setModal('room')} onNotify={notify} />}
        {['Períodos', 'Turnos de examen'].includes(screen) && <CycleView screen={screen} query={query} setQuery={setQuery} onCreate={() => setModal('period')} onNotify={notify} />}
        {screen === 'Regularidad' && <RegularityView onNotify={notify} />}
      </main>
    </section>
    {toast && <div className="toast" role="status"><CheckCircle size={20} weight="fill" />{toast}</div>}
    {modal && <Modal kind={modal} screen={screen} close={() => setModal(null)} notify={notify} />}
  </div>
}

function PageHeading({ screen, onCreate }: { screen: Screen; onCreate: () => void }) {
  const copy: Record<Screen, [string, string]> = {
    Resumen: ['Buen día, equipo.', 'Organizá la estructura académica y planificá el próximo cuatrimestre desde un único lugar.'],
    Carreras: ['Carreras', 'Administrá las propuestas académicas de la universidad.'],
    'Planes de estudio': ['Planes de estudio', 'Diseñá la trayectoria de cada carrera, con sus materias y correlatividades.'],
    Asignaturas: ['Asignaturas', 'Mantené el catálogo de materias y sus datos académicos.'],
    Correlatividades: ['Correlatividades', 'Definí qué asignaturas debe aprobar un estudiante antes de cursar otra.'],
    'Sedes y aulas': ['Sedes y aulas', 'Organizá los espacios físicos disponibles por sede y capacidad.'],
    Asignaciones: ['Asignaciones', 'Distribuí cursos, aulas y horarios evitando superposiciones.'],
    Agenda: ['Agenda', 'Consultá la ocupación de cada aula por fecha.'],
    Períodos: ['Períodos académicos', 'Definí las fechas que ordenan cada ciclo lectivo.'],
    'Turnos de examen': ['Turnos de examen', 'Publicá las fechas y aulas para los finales.'],
    Regularidad: ['Validación de regularidad', 'Comprobá si una persona cumple las condiciones para rendir un final.'],
  }
  const [title, subtitle] = copy[screen]
  return <div className="page-heading"><div><div className="eyebrow">SECRETARÍA ACADÉMICA</div><h1>{title}</h1><p>{subtitle}</p></div>{screen !== 'Resumen' && <button className="primary-button heading-action" onClick={onCreate}><Plus size={17} /> {screen === 'Regularidad' ? 'Nueva validación' : 'Crear nuevo'}</button>}</div>
}

function Dashboard({ onNavigate, onCreate }: { onNavigate: (screen: Screen) => void; onCreate: () => void }) {
  return <>
    <div className="notice"><WarningCircle size={20} weight="fill" /><div><strong>Estás viendo una demo</strong><span>La información de esta pantalla es sintética y se reemplazará por datos del backend.</span></div><MockTag /></div>
    <section className="hero-grid"><div className="next-period"><div><span className="label">PERÍODO ACTIVO</span><strong>2.º cuatrimestre 2026</strong><p>Finaliza el 12 de diciembre</p></div><CalendarBlank size={37} weight="duotone" /><button onClick={() => onNavigate('Períodos')}>Ver calendario <ArrowRight size={15} /></button></div><div className="next-period accent"><div><span className="label">PRÓXIMO HITO</span><strong>Inscripción a finales</strong><p>Del 10 al 21 de noviembre</p></div><Exam size={37} weight="duotone" /><button onClick={() => onNavigate('Turnos de examen')}>Gestionar turnos <ArrowRight size={15} /></button></div></section>
    <div className="section-title"><span><h2>Acciones frecuentes</h2><p>Empezá las tareas más habituales de planificación.</p></span></div><div className="action-grid"><ActionCard icon={<Plus />} title="Nueva carrera" text="Crear y organizar la oferta académica" onClick={onCreate} /><ActionCard icon={<Buildings />} title="Planificar aula" text="Asignar un espacio y horario" onClick={() => onNavigate('Asignaciones')} /><ActionCard icon={<CalendarBlank />} title="Crear período" text="Definir un nuevo cuatrimestre" onClick={() => onNavigate('Períodos')} /></div>
    <section className="dashboard-grid"><article className="panel"><PanelHeader title="Actividad reciente" subtitle="Últimos movimientos del equipo" action="Ver todo" /><ul className="activity-list"><Activity icon={<BookOpen />} tone="blue" title="Plan 2026 actualizado" meta="Ingeniería en Informática · Hace 18 min" /><Activity icon={<Buildings />} tone="green" title="Aula asignada a Desarrollo II" meta="Sede Monserrat · Hace 1 h" /><Activity icon={<Exam />} tone="violet" title="Turno de final creado" meta="Febrero 2027 · Ayer" /></ul></article><article className="panel overview-panel"><PanelHeader title="Vista general" subtitle="Oferta académica activa" /><div className="overview-number"><strong>24</strong><span>Carreras <b>+2 este año</b></span></div><div className="overview-stats"><span><strong>186</strong>Asignaturas</span><span><strong>42</strong>Aulas</span></div></article></section>
  </>
}

function ActionCard({ icon, title, text, onClick }: { icon: React.ReactNode; title: string; text: string; onClick: () => void }) { return <button className="action-card" onClick={onClick}><span className="action-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight className="action-arrow" size={18} /></button> }
function PanelHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: string }) { return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{action && <button className="text-button">{action}</button>}</div> }
function Activity({ icon, tone, title, meta }: { icon: React.ReactNode; tone: string; title: string; meta: string }) { return <li><span className={`activity-icon ${tone}`}>{icon}</span><span><strong>{title}</strong><small>{meta}</small></span></li> }

function Toolbar({ query, setQuery, placeholder, action, filters = true }: { query: string; setQuery: (query: string) => void; placeholder: string; action?: React.ReactNode; filters?: boolean }) { return <div className="toolbar"><label className="search"><MagnifyingGlass size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>{filters && <button className="filter-button"><SlidersHorizontal size={16} /> Filtros <CaretDown size={14} /></button>}{action}</div> }
function AcademicView({ screen, query, setQuery, onCreate, onNotify }: { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }) {
  if (screen === 'Correlatividades') return <Correlatives onNotify={onNotify} />
  const source = screen === 'Carreras' ? careers : screen === 'Planes de estudio' ? studyPlans : courses
  const rows = source.filter((course) => `${course.name} ${course.code} ${course.career}`.toLowerCase().includes(query.toLowerCase()))
  const title = screen === 'Carreras' ? 'carreras' : screen === 'Planes de estudio' ? 'planes' : 'asignaturas'
  return <><Toolbar query={query} setQuery={setQuery} placeholder={`Buscar ${title}...`} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {screen === 'Asignaturas' ? 'asignatura' : screen === 'Carreras' ? 'carrera' : 'plan'}</button>} /><div className="list-meta"><span>{rows.length} resultados <MockTag /></span><span>Actualizado hoy, 09:42</span></div><div className="table-wrap"><table><thead><tr><th>{screen === 'Asignaturas' ? 'Código' : 'Identificador'}</th><th>Nombre</th><th>{screen === 'Carreras' ? 'Título' : 'Carrera'}</th><th>Estado</th><th aria-label="Acciones" /></tr></thead><tbody>{rows.map((course) => <tr key={course.id}><td><span className="code">{course.code}</span></td><td><strong>{course.name}</strong><small>{screen === 'Asignaturas' ? `${course.credits} créditos · ${course.year}` : screen === 'Carreras' ? course.year : `${course.credits} asignaturas · ${course.year}`}</small></td><td>{course.career}</td><td><span className={`status ${course.status === 'Activa' ? 'success' : 'draft'}`}><i />{course.status}</span></td><td><button className="row-action" onClick={() => onNotify(`Editando ${course.name}`)} aria-label={`Editar ${course.name}`}><PencilSimple size={17} /></button>{screen === 'Planes de estudio' && <button className="row-action" onClick={() => onNotify(`Descargando ${course.name} en PDF`)} aria-label={`Descargar ${course.name} en PDF`}><DownloadSimple size={17} /></button>}<button className="row-action danger" onClick={() => onNotify('La eliminación se habilitará con la API')} aria-label={`Eliminar ${course.name}`}><Trash size={17} /></button></td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} />}</div></>
}
function Correlatives({ onNotify }: { onNotify: (value: string) => void }) { return <div className="split-layout"><article className="panel course-tree"><PanelHeader title="Asignaturas del plan" subtitle="Ingeniería en Informática · Plan 2026" /><div className="tree-search"><MagnifyingGlass size={17} /><input placeholder="Buscar asignatura..." aria-label="Buscar asignatura" /></div>{courses.slice(0, 4).map((course, index) => <button key={course.id} className={`tree-row ${index === 0 ? 'selected' : ''}`} onClick={() => onNotify(`Seleccionaste ${course.name}`)}><span className="tree-code">{course.code}</span><span>{course.name}</span><CaretDown size={15} /></button>)}</article><article className="panel detail-panel"><div className="detail-kicker">ASIGNATURA SELECCIONADA</div><h2>Desarrollo de Aplicaciones II</h2><p className="detail-copy">Las materias que figuran aquí deben estar aprobadas antes de cursar esta asignatura.</p><div className="detail-label">CORRELATIVIDADES REQUERIDAS <span>2</span></div><div className="requirement"><CheckCircle size={20} weight="fill" /><span><strong>Programación II</strong><small>INF-201 · Aprobada</small></span><button onClick={() => onNotify('Correlativa quitada')}>Quitar</button></div><div className="requirement"><CheckCircle size={20} weight="fill" /><span><strong>Bases de Datos</strong><small>INF-205 · Aprobada</small></span><button onClick={() => onNotify('Correlativa quitada')}>Quitar</button></div><button className="secondary-button" onClick={() => onNotify('Selector de correlativas abierto')}><Plus size={16} /> Agregar correlativa</button></article></div> }

function PlanningView({ screen, query, setQuery, onCreate, onNotify }: { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }) {
  if (screen === 'Agenda') return <Agenda onNotify={onNotify} />
  if (screen === 'Asignaciones') return <Assignments onNotify={onNotify} />
  const rows = rooms.filter((room) => `${room.name} ${room.campus} ${room.type}`.toLowerCase().includes(query.toLowerCase()))
  return <><Toolbar query={query} setQuery={setQuery} placeholder="Buscar sede o aula..." action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Nueva aula</button>} /><div className="campus-strip"><span><MapPin size={18} /> Monserrat <b>18 aulas</b></span><span><MapPin size={18} /> Recoleta <b>9 aulas</b></span><span><MapPin size={18} /> Pilar <b>7 aulas</b></span></div><div className="table-wrap"><table><thead><tr><th>Aula</th><th>Sede</th><th>Tipo</th><th>Capacidad</th><th>Estado</th><th aria-label="Acciones" /></tr></thead><tbody>{rows.map((room) => <tr key={room.id}><td><strong>{room.name}</strong></td><td>{room.campus}</td><td>{room.type}</td><td>{room.capacity} personas</td><td><span className={`status ${room.status === 'Disponible' ? 'success' : 'warning'}`}><i />{room.status}</span></td><td><button className="row-action" onClick={() => onNotify(`Editando ${room.name}`)} aria-label={`Editar ${room.name}`}><PencilSimple size={17} /></button></td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState query={query} />}</div></>
}
function Assignments({ onNotify }: { onNotify: (value: string) => void }) { const slots = [{ time: '08:00 - 10:00', course: 'Desarrollo de Aplicaciones II', room: 'Lab. Informática 3', day: 'Lunes' }, { time: '10:00 - 12:00', course: 'Análisis Matemático II', room: 'Aula 204', day: 'Martes' }, { time: '18:30 - 20:30', course: 'Gestión de Proyectos', room: 'Aula Magna', day: 'Miércoles' }]; return <><div className="assignment-toolbar"><div className="select-like">2.º cuatrimestre 2026 <CaretDown size={15} /></div><div className="select-like">Semana del 17 jun <CaretDown size={15} /></div><button className="secondary-button" onClick={() => onNotify('Conflictos revisados: no se encontraron superposiciones')}><CheckCircle size={16} /> Revisar conflictos</button></div><div className="schedule"><div className="schedule-head"><span>HORARIO</span><span>LUNES</span><span>MARTES</span><span>MIÉRCOLES</span><span>JUEVES</span><span>VIERNES</span></div>{slots.map((slot) => <div className="schedule-row" key={slot.course}><span>{slot.time}</span><div className={slot.day === 'Lunes' ? 'scheduled' : ''}>{slot.day === 'Lunes' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div className={slot.day === 'Martes' ? 'scheduled green-card' : ''}>{slot.day === 'Martes' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div className={slot.day === 'Miércoles' ? 'scheduled purple-card' : ''}>{slot.day === 'Miércoles' && <><strong>{slot.course}</strong><small>{slot.room}</small></>}</div><div /><div /></div>)}</div><div className="legend"><span><i className="blue-dot" /> Cursos asignados</span><span><i className="green-dot" /> Disponible</span><span><i className="red-dot" /> Superposición detectada</span></div></> }
function Agenda({ onNotify }: { onNotify: (value: string) => void }) { return <><div className="agenda-toolbar"><button className="calendar-nav" onClick={() => onNotify('Semana anterior')} aria-label="Semana anterior">‹</button><strong>17 - 23 de junio, 2026</strong><button className="calendar-nav" onClick={() => onNotify('Semana siguiente')} aria-label="Semana siguiente">›</button><button className="secondary-button today" onClick={() => onNotify('Volviste a hoy')}>Hoy</button></div><div className="agenda-grid">{['Lunes 17', 'Martes 18', 'Miércoles 19', 'Jueves 20', 'Viernes 21'].map((day, index) => <div className="agenda-day" key={day}><strong>{day}</strong><span className="agenda-count">{index === 0 ? 3 : index === 2 ? 2 : 1} reservas</span>{[0, 1, 2].slice(0, index === 0 ? 3 : index === 2 ? 2 : 1).map((item) => <div className={`agenda-event event-${(index + item) % 3}`} key={item}><small>{item === 0 ? '08:00' : item === 1 ? '10:00' : '18:30'}</small><strong>{courses[(index + item) % courses.length].name}</strong><span>{rooms[(index + item) % rooms.length].name}</span></div>)}</div>)}</div></> }

function CycleView({ screen, query, setQuery, onCreate, onNotify }: { screen: Screen; query: string; setQuery: (value: string) => void; onCreate: () => void; onNotify: (value: string) => void }) { const finals = [{ name: 'Turno febrero 2027', date: '08 feb - 19 feb 2027', exams: 24, status: 'Planificado' }, { name: 'Turno diciembre 2026', date: '01 dic - 12 dic 2026', exams: 31, status: 'Inscripción abierta' }, { name: 'Turno agosto 2026', date: '03 ago - 14 ago 2026', exams: 28, status: 'Finalizado' }]; return <><Toolbar query={query} setQuery={setQuery} placeholder={screen === 'Períodos' ? 'Buscar período...' : 'Buscar turno...'} action={<button className="primary-button" onClick={onCreate}><Plus size={17} /> Crear {screen === 'Períodos' ? 'período' : 'turno'}</button>} /><div className="cycle-cards">{finals.filter((item) => `${item.name} ${item.date}`.toLowerCase().includes(query.toLowerCase())).map((item, i) => <article className="cycle-card" key={item.name}><div className="cycle-top"><span className={`status ${i === 1 ? 'success' : i === 2 ? 'neutral' : 'draft'}`}><i />{item.status}</span><button className="row-action" onClick={() => onNotify(`Editando ${item.name}`)} aria-label={`Editar ${item.name}`}><PencilSimple size={17} /></button></div><h2>{item.name}</h2><p><CalendarBlank size={16} /> {item.date}</p><div className="cycle-foot"><span><strong>{item.exams}</strong> mesas de examen</span><button onClick={() => onNotify('Detalle abierto')}>Ver detalle <ArrowRight size={15} /></button></div></article>)}</div></> }

function RegularityView({ onNotify }: { onNotify: (value: string) => void }) { const [attendance, setAttendance] = useState('80'); const [average, setAverage] = useState('7'); const [result, setResult] = useState<'idle' | 'approved' | 'rejected'>('idle'); const validate = () => { setResult(Number(attendance) >= 75 && Number(average) >= 6 ? 'approved' : 'rejected'); onNotify('Validación completada') }; return <div className="regularity-layout"><article className="panel validation-card"><div className="form-kicker">MOTOR DE VALIDACIÓN <MockTag /></div><h2>¿Puede rendir el final?</h2><p>Ingresá los valores de la cursada para comprobar si cumple los requisitos de regularidad.</p><div className="form-grid"><label>Asistencia registrada<input value={attendance} onChange={(e) => setAttendance(e.target.value)} type="number" min="0" max="100" /><small>Mínimo requerido: 75%</small></label><label>Promedio de cursada<input value={average} onChange={(e) => setAverage(e.target.value)} type="number" min="0" max="10" step=".1" /><small>Mínimo requerido: 6</small></label></div><button className="primary-button" onClick={validate}><Check size={17} /> Validar regularidad</button></article><article className={`panel result-card ${result}`}><div className="result-icon">{result === 'approved' ? <CheckCircle size={28} weight="fill" /> : result === 'rejected' ? <WarningCircle size={28} weight="fill" /> : <ClipboardText size={28} />}</div><span className="result-label">RESULTADO</span><h2>{result === 'approved' ? 'Habilitado para rendir' : result === 'rejected' ? 'No cumple las condiciones' : 'Esperando validación'}</h2><p>{result === 'approved' ? 'La asistencia y el promedio superan los mínimos configurados.' : result === 'rejected' ? 'Revisá los valores ingresados y consultá la situación de la materia.' : 'El resultado aparecerá después de completar los datos.'}</p>{result !== 'idle' && <div className="result-values"><span>Asistencia <strong>{attendance}%</strong></span><span>Promedio <strong>{average}</strong></span></div>}</article></div> }
function EmptyState({ query }: { query: string }) { return <div className="empty-state"><MagnifyingGlass size={26} /><strong>No encontramos resultados</strong><span>{query ? `Probá con otro término distinto de “${query}”.` : 'Todavía no hay registros para mostrar.'}</span></div> }

function Modal({ kind, screen, close, notify }: { kind: 'course' | 'room' | 'period'; screen: Screen; close: () => void; notify: (value: string) => void }) {
  const labels = kind === 'course'
    ? screen === 'Carreras' ? ['Nueva carrera', 'Nombre de la carrera', 'Título que otorga', 'Ej. Ingeniería en Informática'] : screen === 'Planes de estudio' ? ['Nuevo plan de estudio', 'Nombre del plan', 'Carrera', 'Ej. Ingeniería en Informática'] : ['Nueva asignatura', 'Nombre de la asignatura', 'Código', 'Ej. INF-306']
    : kind === 'room' ? ['Nueva aula', 'Nombre del aula', 'Sede', 'Ej. Monserrat']
      : screen === 'Turnos de examen' ? ['Nuevo turno de examen', 'Nombre del turno', 'Fecha de inicio', 'dd/mm/aaaa'] : ['Nuevo período académico', 'Nombre del período', 'Fecha de inicio', 'dd/mm/aaaa']
  const submit = (event: React.FormEvent) => { event.preventDefault(); close(); notify(`${labels[0]} guardada como mock`) }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}><form className="modal" onSubmit={submit}><div className="modal-head"><div><span className="form-kicker">CREAR REGISTRO <MockTag /></span><h2>{labels[0]}</h2></div><button type="button" onClick={close} aria-label="Cerrar"><X size={20} /></button></div><label>{labels[1]}<input required placeholder="Escribí un nombre" autoFocus /></label><label>{labels[2]}<input required placeholder={labels[3]} /></label><label>Descripción<textarea rows={3} placeholder="Información adicional (opcional)" /></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={close}>Cancelar</button><button className="primary-button" type="submit"><Check size={17} /> Guardar mock</button></div></form></div>
}

export default App
