import { CalendarBlank, Check, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { EmptyState } from '../../components/ui/EmptyState'
import { crearPeriodo, listarPeriodos } from '../../services/periodos/periodosSlice'
import { crearTurnoExamen, listarTurnosExamen } from '../../services/turnosExamen/turnosExamenSlice'
import type { Screen } from '../../types/domain'

export function RealCycleView({ screen, query, onNotify }: { screen: Screen; query: string; setQuery: (v: string) => void; onNotify: (v: string) => void }) {
  return screen === 'Períodos' ? <PeriodosPanel query={query} onNotify={onNotify} /> : <TurnosPanel query={query} onNotify={onNotify} />
}

const periodoVacio = { anio: '', numero: '1', fechaInicio: '', fechaFin: '' }

function PeriodosPanel({ query, onNotify }: { query: string; onNotify: (v: string) => void }) {
  const dispatch = useAppDispatch()
  const { items, cargando, error } = useAppSelector((state) => state.periodos)
  const [formAbierto, setFormAbierto] = useState(false)
  const [valores, setValores] = useState(periodoVacio)

  useEffect(() => { dispatch(listarPeriodos()) }, [dispatch])

  const rows = items.filter((p) => `${p.anio} ${p.numero}`.includes(query))

  const crear = async () => {
    const resultado = await dispatch(crearPeriodo({
      anio: Number(valores.anio),
      numero: Number(valores.numero),
      fechaInicio: valores.fechaInicio,
      fechaFin: valores.fechaFin,
    }))
    if (crearPeriodo.fulfilled.match(resultado)) {
      onNotify('Período creado correctamente')
      setValores(periodoVacio)
      setFormAbierto(false)
    }
  }

  return <>
    <div className="list-meta"><span>{rows.length} períodos</span><button className="text-button" onClick={() => setFormAbierto((v) => !v)}>{formAbierto ? 'Cancelar' : '+ Crear período'}</button></div>
    {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}
    {formAbierto && (
      <article className="panel" style={{ marginBottom: 18 }}>
        <div className="form-grid">
          <label>Año<input type="number" min="2000" value={valores.anio} onChange={(e) => setValores({ ...valores, anio: e.target.value })} /></label>
          <label>Número de cuatrimestre
            <select value={valores.numero} onChange={(e) => setValores({ ...valores, numero: e.target.value })}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>
          <label>Fecha de inicio<input type="date" value={valores.fechaInicio} onChange={(e) => setValores({ ...valores, fechaInicio: e.target.value })} /></label>
          <label>Fecha de fin<input type="date" value={valores.fechaFin} onChange={(e) => setValores({ ...valores, fechaFin: e.target.value })} /></label>
        </div>
        <button className="primary-button" onClick={crear}><Check size={16} /> Guardar</button>
      </article>
    )}
    {rows.length === 0 && !cargando ? <EmptyState query={query} /> : (
      <div className="cycle-cards">
        {rows.map((periodo) => (
          <article className="cycle-card" key={periodo.id}>
            <h2>{periodo.numero}.º cuatrimestre {periodo.anio}</h2>
            <p><CalendarBlank size={16} /> {periodo.fechaInicio} - {periodo.fechaFin}</p>
          </article>
        ))}
      </div>
    )}
  </>
}

const turnoVacio = { nombre: '', fechaInicio: '', fechaFin: '', inscripcionDesde: '', inscripcionHasta: '' }

function TurnosPanel({ query, onNotify }: { query: string; onNotify: (v: string) => void }) {
  const dispatch = useAppDispatch()
  const { items, cargando, error } = useAppSelector((state) => state.turnosExamen)
  const [formAbierto, setFormAbierto] = useState(false)
  const [valores, setValores] = useState(turnoVacio)

  useEffect(() => { dispatch(listarTurnosExamen()) }, [dispatch])

  const rows = items.filter((t) => t.nombre.toLowerCase().includes(query.toLowerCase()))

  const crear = async () => {
    const resultado = await dispatch(crearTurnoExamen(valores))
    if (crearTurnoExamen.fulfilled.match(resultado)) {
      onNotify('Turno de examen creado correctamente')
      setValores(turnoVacio)
      setFormAbierto(false)
    }
  }

  return <>
    <div className="list-meta"><span>{rows.length} turnos</span><button className="text-button" onClick={() => setFormAbierto((v) => !v)}>{formAbierto ? 'Cancelar' : '+ Crear turno'}</button></div>
    {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}
    {formAbierto && (
      <article className="panel" style={{ marginBottom: 18 }}>
        <div className="form-grid">
          <label>Nombre<input value={valores.nombre} onChange={(e) => setValores({ ...valores, nombre: e.target.value })} placeholder="Ej. Turno febrero 2027" /></label>
          <label>Fecha de inicio<input type="date" value={valores.fechaInicio} onChange={(e) => setValores({ ...valores, fechaInicio: e.target.value })} /></label>
          <label>Fecha de fin<input type="date" value={valores.fechaFin} onChange={(e) => setValores({ ...valores, fechaFin: e.target.value })} /></label>
          <label>Inscripción desde<input type="date" value={valores.inscripcionDesde} onChange={(e) => setValores({ ...valores, inscripcionDesde: e.target.value })} /></label>
          <label>Inscripción hasta<input type="date" value={valores.inscripcionHasta} onChange={(e) => setValores({ ...valores, inscripcionHasta: e.target.value })} /></label>
        </div>
        <button className="primary-button" onClick={crear}><Check size={16} /> Guardar</button>
      </article>
    )}
    {rows.length === 0 && !cargando ? <EmptyState query={query} /> : (
      <div className="cycle-cards">
        {rows.map((turno) => (
          <article className="cycle-card" key={turno.id}>
            <h2>{turno.nombre}</h2>
            <p><CalendarBlank size={16} /> {turno.fechaInicio} - {turno.fechaFin}</p>
            <div className="cycle-foot"><span>Inscripción: {turno.inscripcionDesde} a {turno.inscripcionHasta}</span></div>
          </article>
        ))}
      </div>
    )}
  </>
}
