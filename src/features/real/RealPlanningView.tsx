import { Check, MapPin, Plus, WarningCircle } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { EmptyState } from '../../components/ui/EmptyState'
import { crearSede, listarSedes } from '../../services/sedes/sedesSlice'
import { crearAula, listarAulas } from '../../services/aulas/aulasSlice'
import { crearAsignacion, obtenerAgenda } from '../../services/asignaciones/asignacionesSlice'
import { CursosPanel } from './CursosPanel'
import type { Screen } from '../../types/domain'

export function RealPlanningView({ screen, query, onNotify }: { screen: Screen; query: string; setQuery: (v: string) => void; onNotify: (v: string) => void }) {
  if (screen === 'Agenda') return <AgendaPanel onNotify={onNotify} />
  if (screen === 'Cursos') return <CursosPanel query={query} onNotify={onNotify} />
  if (screen === 'Asignaciones') return <AsignacionesPanel onNotify={onNotify} />
  return <SedesYAulasPanel query={query} onNotify={onNotify} />
}

function SedesYAulasPanel({ query, onNotify }: { query: string; onNotify: (v: string) => void }) {
  const dispatch = useAppDispatch()
  const sedes = useAppSelector((state) => state.sedes)
  const aulas = useAppSelector((state) => state.aulas)
  const [sedeId, setSedeId] = useState<number | null>(null)
  const [formSede, setFormSede] = useState(false)
  const [nuevaSede, setNuevaSede] = useState({ nombre: '', direccion: '' })
  const [formAula, setFormAula] = useState(false)
  const [nuevaAula, setNuevaAula] = useState({ codigo: '', capacidadMaxima: '' })

  useEffect(() => { dispatch(listarSedes()) }, [dispatch])
  useEffect(() => { if (sedeId) dispatch(listarAulas(sedeId)) }, [dispatch, sedeId])

  const sedesFiltradas = sedes.items.filter((s) => `${s.nombre} ${s.direccion}`.toLowerCase().includes(query.toLowerCase()))

  const crearNuevaSede = async () => {
    const resultado = await dispatch(crearSede(nuevaSede))
    if (crearSede.fulfilled.match(resultado)) {
      onNotify('Sede creada correctamente')
      setNuevaSede({ nombre: '', direccion: '' })
      setFormSede(false)
    }
  }

  const crearNuevaAula = async () => {
    if (!sedeId) return
    const resultado = await dispatch(crearAula({ sedeId, datos: { codigo: nuevaAula.codigo, capacidadMaxima: Number(nuevaAula.capacidadMaxima) } }))
    if (crearAula.fulfilled.match(resultado)) {
      onNotify('Aula creada correctamente')
      setNuevaAula({ codigo: '', capacidadMaxima: '' })
      setFormAula(false)
    }
  }

  return <>
    <div className="section-title"><span><h2>Sedes</h2></span></div>
    <div className="list-meta"><span>{sedes.items.length} sedes</span><button className="text-button" onClick={() => setFormSede((v) => !v)}>{formSede ? 'Cancelar' : '+ Nueva sede'}</button></div>
    <div className="campus-strip" style={{ marginTop: 0 }}>{sedesFiltradas.map((sede) => (
      <button key={sede.id} className={sede.id === sedeId ? 'selected' : ''} style={{ border: 0, background: 'none', cursor: 'pointer' }} onClick={() => setSedeId(sede.id)}>
        <span><MapPin size={18} /> {sede.nombre}</span>
      </button>
    ))}</div>
    {sedes.error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {sedes.error}</div>}

    {formSede && (
      <article className="panel" style={{ marginBottom: 18 }}>
        <div className="form-grid">
          <label>Nombre<input value={nuevaSede.nombre} onChange={(e) => setNuevaSede({ ...nuevaSede, nombre: e.target.value })} placeholder="Ej. Monserrat" /></label>
          <label>Dirección<input value={nuevaSede.direccion} onChange={(e) => setNuevaSede({ ...nuevaSede, direccion: e.target.value })} placeholder="Ej. Av. Independencia 3651" /></label>
        </div>
        <button className="primary-button" onClick={crearNuevaSede}><Check size={16} /> Guardar</button>
      </article>
    )}

    <div className="section-title"><span><h2>Aulas</h2></span></div>
    {!sedeId
      ? <p className="muted-copy">Elegí una sede arriba para ver y crear sus aulas.</p>
      : <>
          {aulas.error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {aulas.error}</div>}
          <div className="list-meta"><span>{aulas.items.length} aulas</span><button className="text-button" onClick={() => setFormAula((v) => !v)}>{formAula ? 'Cancelar' : '+ Nueva aula'}</button></div>
          {formAula && (
            <article className="panel" style={{ marginBottom: 18 }}>
              <div className="form-grid">
                <label>Código<input value={nuevaAula.codigo} onChange={(e) => setNuevaAula({ ...nuevaAula, codigo: e.target.value })} placeholder="Ej. Aula 204" /></label>
                <label>Capacidad máxima<input type="number" min="1" value={nuevaAula.capacidadMaxima} onChange={(e) => setNuevaAula({ ...nuevaAula, capacidadMaxima: e.target.value })} /></label>
              </div>
              <button className="primary-button" onClick={crearNuevaAula}><Check size={16} /> Guardar</button>
            </article>
          )}
          <div className="table-wrap">
            <table>
              <thead><tr><th>Código</th><th>Capacidad</th><th>ID (para asignar)</th></tr></thead>
              <tbody>{aulas.items.map((aula) => <tr key={aula.id}><td><strong>{aula.codigo}</strong></td><td>{aula.capacidadMaxima} personas</td><td><span className="code">#{aula.id}</span></td></tr>)}</tbody>
            </table>
            {!aulas.cargando && aulas.items.length === 0 && <EmptyState query="" />}
          </div>
        </>}
  </>
}

const asignacionVacia = { aulaId: '', asignaturaId: '', fecha: '', horaInicio: '', horaFin: '', cantidadEstudiantes: '' }

function AsignacionesPanel({ onNotify }: { onNotify: (v: string) => void }) {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.asignaciones)
  const [valores, setValores] = useState(asignacionVacia)

  const crear = async () => {
    const resultado = await dispatch(crearAsignacion({
      aulaId: Number(valores.aulaId),
      asignaturaId: Number(valores.asignaturaId),
      fecha: valores.fecha,
      horaInicio: valores.horaInicio,
      horaFin: valores.horaFin,
      cantidadEstudiantes: Number(valores.cantidadEstudiantes),
    }))
    if (crearAsignacion.fulfilled.match(resultado)) {
      onNotify('Asignación creada correctamente')
      setValores(asignacionVacia)
    }
  }

  return <article className="panel">
    <p className="muted-copy">Los IDs de aula y asignatura se ven en las tablas de "Sedes y aulas" y "Asignaturas".</p>
    {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}
    <div className="form-grid">
      <label>ID de aula<input type="number" value={valores.aulaId} onChange={(e) => setValores({ ...valores, aulaId: e.target.value })} /></label>
      <label>ID de asignatura<input type="number" value={valores.asignaturaId} onChange={(e) => setValores({ ...valores, asignaturaId: e.target.value })} /></label>
      <label>Fecha<input type="date" value={valores.fecha} onChange={(e) => setValores({ ...valores, fecha: e.target.value })} /></label>
      <label>Cantidad de estudiantes<input type="number" min="1" value={valores.cantidadEstudiantes} onChange={(e) => setValores({ ...valores, cantidadEstudiantes: e.target.value })} /></label>
      <label>Hora de inicio<input type="time" value={valores.horaInicio} onChange={(e) => setValores({ ...valores, horaInicio: e.target.value })} /></label>
      <label>Hora de fin<input type="time" value={valores.horaFin} onChange={(e) => setValores({ ...valores, horaFin: e.target.value })} /></label>
    </div>
    <button className="primary-button" onClick={crear}><Plus size={16} /> Crear asignación</button>
  </article>
}

function AgendaPanel({ onNotify }: { onNotify: (v: string) => void }) {
  const dispatch = useAppDispatch()
  const { agenda, cargando, error } = useAppSelector((state) => state.asignaciones)
  const [aulaId, setAulaId] = useState('')
  const [fecha, setFecha] = useState('')

  const consultar = async () => {
    if (!aulaId || !fecha) {
      onNotify('Completá el ID de aula y la fecha.')
      return
    }
    await dispatch(obtenerAgenda({ aulaId: Number(aulaId), fecha }))
  }

  return <article className="panel">
    <div className="form-grid" style={{ maxWidth: 420 }}>
      <label>ID de aula<input type="number" value={aulaId} onChange={(e) => setAulaId(e.target.value)} /></label>
      <label>Fecha<input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} /></label>
    </div>
    <button className="secondary-button" onClick={consultar}>Consultar agenda</button>
    {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}
    {cargando && <p className="muted-copy">Consultando...</p>}
    {!cargando && agenda.length > 0 && (
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead><tr><th>Asignatura</th><th>Horario</th><th>Estudiantes</th></tr></thead>
          <tbody>{agenda.map((a) => <tr key={a.id}><td><span className="code">#{a.asignaturaId}</span></td><td>{a.horaInicio} – {a.horaFin}</td><td>{a.cantidadEstudiantes}</td></tr>)}</tbody>
        </table>
      </div>
    )}
    {!cargando && agenda.length === 0 && <p className="muted-copy" style={{ marginTop: 12 }}>Consultá una fecha para ver la ocupación del aula.</p>}
  </article>
}
