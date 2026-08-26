import { ArrowRight, Buildings, CalendarBlank, Exam, Plus, WarningCircle, BookOpen } from '@phosphor-icons/react'
import { ActionCard } from '../../components/dashboard/ActionCard'
import { Activity } from '../../components/dashboard/Activity'
import { PanelHeader } from '../../components/ui/PanelHeader'
import { MockTag } from '../../components/ui/MockTag'
import type { Screen } from '../../types/domain'

type DashboardPageProps = { onNavigate: (screen: Screen) => void; onCreate: () => void }

export function DashboardPage({ onNavigate, onCreate }: DashboardPageProps) {
  return <>
    <div className="notice"><WarningCircle size={20} weight="fill" /><div><strong>Estás viendo una demo</strong><span>La información de esta pantalla es sintética y se reemplazará por datos del backend.</span></div><MockTag /></div>
    <section className="hero-grid"><div className="next-period"><div><span className="label">PERÍODO ACTIVO</span><strong>2.º cuatrimestre 2026</strong><p>Finaliza el 12 de diciembre</p></div><CalendarBlank size={37} weight="duotone" /><button onClick={() => onNavigate('Períodos')}>Ver calendario <ArrowRight size={15} /></button></div><div className="next-period accent"><div><span className="label">PRÓXIMO HITO</span><strong>Inscripción a finales</strong><p>Del 10 al 21 de noviembre</p></div><Exam size={37} weight="duotone" /><button onClick={() => onNavigate('Turnos de examen')}>Gestionar turnos <ArrowRight size={15} /></button></div></section>
    <div className="section-title"><span><h2>Acciones frecuentes</h2><p>Empezá las tareas más habituales de planificación.</p></span></div><div className="action-grid"><ActionCard icon={<Plus />} title="Nueva carrera" text="Crear y organizar la oferta académica" onClick={onCreate} /><ActionCard icon={<Buildings />} title="Planificar aula" text="Asignar un espacio y horario" onClick={() => onNavigate('Asignaciones')} /><ActionCard icon={<CalendarBlank />} title="Crear período" text="Definir un nuevo cuatrimestre" onClick={() => onNavigate('Períodos')} /></div>
    <section className="dashboard-grid"><article className="panel"><PanelHeader title="Actividad reciente" subtitle="Últimos movimientos del equipo" action="Ver todo" /><ul className="activity-list"><Activity icon={<BookOpen />} tone="blue" title="Plan 2026 actualizado" meta="Ingeniería en Informática · Hace 18 min" /><Activity icon={<Buildings />} tone="green" title="Aula asignada a Desarrollo II" meta="Sede Monserrat · Hace 1 h" /><Activity icon={<Exam />} tone="violet" title="Turno de final creado" meta="Febrero 2027 · Ayer" /></ul></article><article className="panel overview-panel"><PanelHeader title="Vista general" subtitle="Oferta académica activa" /><div className="overview-number"><strong>24</strong><span>Carreras <b>+2 este año</b></span></div><div className="overview-stats"><span><strong>186</strong>Asignaturas</span><span><strong>42</strong>Aulas</span></div></article></section>
  </>
}
