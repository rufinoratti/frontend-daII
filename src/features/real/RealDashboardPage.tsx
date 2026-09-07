import { ArrowRight, Buildings, GraduationCap, Plus, WarningCircle } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { listarCarreras } from '../../services/carreras/carrerasSlice'
import { listarSedes } from '../../services/sedes/sedesSlice'
import { listarPeriodos } from '../../services/periodos/periodosSlice'
import type { Screen } from '../../types/domain'

export function RealDashboardPage({ onNavigate, onCreate }: { onNavigate: (screen: Screen) => void; onCreate: () => void }) {
  const dispatch = useAppDispatch()
  const carreras = useAppSelector((state) => state.carreras)
  const sedes = useAppSelector((state) => state.sedes)
  const periodos = useAppSelector((state) => state.periodos)

  useEffect(() => {
    dispatch(listarCarreras())
    dispatch(listarSedes())
    dispatch(listarPeriodos())
  }, [dispatch])

  const carrerasActivas = carreras.items.filter((carrera) => carrera.estado !== 'INACTIVA').length
  const error = carreras.error ?? sedes.error ?? periodos.error

  return <>
    {error && <div className="notice" role="alert"><WarningCircle size={20} weight="fill" /><div><strong>No se pudo cargar todo</strong><span>{error}</span></div></div>}

    <div className="section-title"><span><h2>Acciones frecuentes</h2><p>Empezá las tareas más habituales de planificación.</p></span></div>
    <div className="action-grid">
      <button className="action-card" onClick={onCreate}><span className="action-icon"><Plus /></span><span><strong>Nueva carrera</strong><small>Crear y organizar la oferta académica</small></span></button>
      <button className="action-card" onClick={() => onNavigate('Sedes y aulas')}><span className="action-icon"><Buildings /></span><span><strong>Ver sedes y aulas</strong><small>Consultar espacios disponibles</small></span></button>
      <button className="action-card" onClick={() => onNavigate('Períodos')}><span className="action-icon"><GraduationCap /></span><span><strong>Ver períodos</strong><small>Consultar los cuatrimestres cargados</small></span></button>
    </div>

    <section className="dashboard-grid">
      <article className="panel">
        <div className="panel-header"><div><h2>Carreras</h2><p>Oferta académica cargada en la base</p></div><button className="text-button" onClick={() => onNavigate('Carreras')}>Ver todas <ArrowRight size={13} /></button></div>
        {carreras.cargando
          ? <p className="muted-copy">Cargando...</p>
          : carreras.items.length === 0
            ? <p className="muted-copy">Todavía no hay carreras cargadas.</p>
            : <ul className="activity-list">
                {carreras.items.slice(0, 5).map((carrera) => (
                  <li key={carrera.id}>
                    <span className="activity-icon blue"><GraduationCap size={16} /></span>
                    <span><strong>{carrera.nombre}</strong><small>{carrera.codigo} · {carrera.estado}</small></span>
                  </li>
                ))}
              </ul>}
      </article>
      <article className="panel overview-panel">
        <div className="panel-header"><div><h2>Vista general</h2><p>Datos reales del backend</p></div></div>
        <div className="overview-number"><strong>{carrerasActivas}</strong><span>Carreras activas</span></div>
        <div className="overview-stats">
          <span><strong>{sedes.items.length}</strong>Sedes</span>
          <span><strong>{periodos.items.length}</strong>Períodos</span>
        </div>
      </article>
    </section>
  </>
}
