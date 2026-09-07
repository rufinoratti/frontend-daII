import { Check, PencilSimple, Plus, Trash, WarningCircle, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { EmptyState } from '../../components/ui/EmptyState'
import { Toolbar } from '../../components/ui/Toolbar'
import {
  actualizarCarrera,
  crearCarrera,
  desactivarCarrera,
  listarCarreras,
} from '../../services/carreras/carrerasSlice'
import { crearPlanDeEstudio, listarPlanesDeEstudio } from '../../services/planesEstudio/planesEstudioSlice'
import { crearAsignatura, listarAsignaturas } from '../../services/asignaturas/asignaturasSlice'
import {
  crearCorrelatividad,
  listarCorrelatividades,
} from '../../services/correlatividades/correlatividadesSlice'
import type { Carrera, CrearCarrera, EstadoAcademico, TipoCorrelatividad } from '../../types/api'
import type { Screen } from '../../types/domain'

type Props = { screen: Screen; query: string; setQuery: (value: string) => void; onNotify: (value: string) => void }

const estadoClase: Record<EstadoAcademico, string> = { ACTIVA: 'success', BORRADOR: 'draft', INACTIVA: 'warning' }

export function RealAcademicView({ screen, query, setQuery, onNotify }: Props) {
  if (screen === 'Carreras') return <CarrerasPanel query={query} setQuery={setQuery} onNotify={onNotify} />
  if (screen === 'Planes de estudio') return <PlanesPanel onNotify={onNotify} />
  if (screen === 'Asignaturas') return <AsignaturasPanel onNotify={onNotify} />
  return <CorrelatividadesPanel onNotify={onNotify} />
}

const carreraVacia: CrearCarrera = { codigo: '', nombre: '', facultad: '', duracion: '', titulo: '' }

function CarrerasPanel({ query, setQuery, onNotify }: { query: string; setQuery: (value: string) => void; onNotify: (value: string) => void }) {
  const dispatch = useAppDispatch()
  const { items, cargando, error } = useAppSelector((state) => state.carreras)
  const [formAbierto, setFormAbierto] = useState<'nueva' | number | null>(null)
  const [valores, setValores] = useState<CrearCarrera>(carreraVacia)

  useEffect(() => {
    dispatch(listarCarreras())
  }, [dispatch])

  const rows = items.filter((carrera) => `${carrera.nombre} ${carrera.codigo} ${carrera.facultad}`.toLowerCase().includes(query.toLowerCase()))

  const abrirCreacion = () => {
    setValores(carreraVacia)
    setFormAbierto('nueva')
  }

  const abrirEdicion = (carrera: Carrera) => {
    setValores({ codigo: carrera.codigo, nombre: carrera.nombre, facultad: carrera.facultad, duracion: carrera.duracion, titulo: carrera.titulo })
    setFormAbierto(carrera.id)
  }

  const guardar = async () => {
    if (formAbierto === 'nueva') {
      const resultado = await dispatch(crearCarrera(valores))
      if (crearCarrera.fulfilled.match(resultado)) {
        onNotify('Carrera creada correctamente')
        setFormAbierto(null)
      }
      return
    }
    const resultado = await dispatch(actualizarCarrera({ id: formAbierto as number, datos: valores }))
    if (actualizarCarrera.fulfilled.match(resultado)) {
      onNotify('Carrera actualizada')
      setFormAbierto(null)
    }
  }

  const desactivar = async (id: number) => {
    if (!window.confirm('¿Querés desactivar esta carrera?')) return
    const resultado = await dispatch(desactivarCarrera(id))
    if (desactivarCarrera.fulfilled.match(resultado)) onNotify('Carrera desactivada')
  }

  return <>
    <Toolbar query={query} setQuery={setQuery} placeholder="Buscar carreras..." filters={false} action={<button className="primary-button" onClick={abrirCreacion}><Plus size={17} /> Crear carrera</button>} />
    {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}

    {formAbierto !== null && (
      <article className="panel" style={{ marginBottom: 18 }}>
        <div className="panel-header"><div><h2>{formAbierto === 'nueva' ? 'Nueva carrera' : 'Editar carrera'}</h2></div><button className="text-button" onClick={() => setFormAbierto(null)}><X size={16} /></button></div>
        <div className="form-grid">
          <label>Código<input value={valores.codigo} onChange={(e) => setValores({ ...valores, codigo: e.target.value })} placeholder="Ej. ING-INF" /></label>
          <label>Nombre<input value={valores.nombre} onChange={(e) => setValores({ ...valores, nombre: e.target.value })} placeholder="Ej. Ingeniería en Informática" /></label>
          <label>Facultad<input value={valores.facultad} onChange={(e) => setValores({ ...valores, facultad: e.target.value })} placeholder="Ej. Facultad de Ingeniería" /></label>
          <label>Duración<input value={valores.duracion} onChange={(e) => setValores({ ...valores, duracion: e.target.value })} placeholder="Ej. 5 años" /></label>
          <label>Título que otorga<input value={valores.titulo} onChange={(e) => setValores({ ...valores, titulo: e.target.value })} placeholder="Ej. Ingeniero/a en Informática" /></label>
        </div>
        <button className="primary-button" onClick={guardar}><Check size={16} /> Guardar</button>
      </article>
    )}

    <div className="list-meta"><span>{rows.length} resultados</span></div>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Código</th><th>Nombre</th><th>Facultad</th><th>Estado</th><th aria-label="Acciones" /></tr></thead>
        <tbody>
          {rows.map((carrera) => (
            <tr key={carrera.id}>
              <td><span className="code">{carrera.codigo}</span></td>
              <td><strong>{carrera.nombre}</strong><small>{carrera.titulo} · {carrera.duracion}</small></td>
              <td>{carrera.facultad}</td>
              <td><span className={`status ${estadoClase[carrera.estado]}`}><i />{carrera.estado}</span></td>
              <td>
                <button className="row-action" onClick={() => abrirEdicion(carrera)} aria-label={`Editar ${carrera.nombre}`}><PencilSimple size={17} /></button>
                {carrera.estado !== 'INACTIVA' && <button className="row-action danger" onClick={() => desactivar(carrera.id)} aria-label={`Desactivar ${carrera.nombre}`}><Trash size={17} /></button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!cargando && rows.length === 0 && <EmptyState query={query} />}
    </div>
  </>
}

function PlanesPanel({ onNotify }: { onNotify: (value: string) => void }) {
  const dispatch = useAppDispatch()
  const carreras = useAppSelector((state) => state.carreras)
  const planes = useAppSelector((state) => state.planesEstudio)
  const [carreraId, setCarreraId] = useState<number | null>(null)
  const [formAbierto, setFormAbierto] = useState(false)
  const [valores, setValores] = useState({ codigo: '', nombre: '', vigenciaDesde: '', cantidadAsignaturas: '' })

  useEffect(() => {
    dispatch(listarCarreras())
  }, [dispatch])

  useEffect(() => {
    if (carreraId) dispatch(listarPlanesDeEstudio(carreraId))
  }, [dispatch, carreraId])

  const crear = async () => {
    if (!carreraId) return
    const resultado = await dispatch(crearPlanDeEstudio({
      carreraId,
      datos: { ...valores, cantidadAsignaturas: Number(valores.cantidadAsignaturas) },
    }))
    if (crearPlanDeEstudio.fulfilled.match(resultado)) {
      onNotify('Plan de estudio creado correctamente')
      setValores({ codigo: '', nombre: '', vigenciaDesde: '', cantidadAsignaturas: '' })
      setFormAbierto(false)
    }
  }

  return <>
    <div className="form-grid single-column" style={{ maxWidth: 360 }}>
      <label>Carrera
        <select value={carreraId ?? ''} onChange={(e) => setCarreraId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Seleccioná una carrera...</option>
          {carreras.items.map((carrera) => <option key={carrera.id} value={carrera.id}>{carrera.codigo} · {carrera.nombre}</option>)}
        </select>
      </label>
    </div>

    {!carreraId
      ? <p className="muted-copy">Elegí una carrera para ver y crear sus planes de estudio.</p>
      : <>
          {planes.error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {planes.error}</div>}
          <div className="list-meta"><span>{planes.items.length} planes</span><button className="text-button" onClick={() => setFormAbierto((v) => !v)}>{formAbierto ? 'Cancelar' : '+ Crear plan'}</button></div>

          {formAbierto && (
            <article className="panel" style={{ marginBottom: 18 }}>
              <div className="form-grid">
                <label>Código<input value={valores.codigo} onChange={(e) => setValores({ ...valores, codigo: e.target.value })} placeholder="Ej. PLAN-2026" /></label>
                <label>Nombre<input value={valores.nombre} onChange={(e) => setValores({ ...valores, nombre: e.target.value })} placeholder="Ej. Plan de estudio 2026" /></label>
                <label>Vigente desde<input type="date" value={valores.vigenciaDesde} onChange={(e) => setValores({ ...valores, vigenciaDesde: e.target.value })} /></label>
                <label>Cantidad de asignaturas<input type="number" min="0" value={valores.cantidadAsignaturas} onChange={(e) => setValores({ ...valores, cantidadAsignaturas: e.target.value })} /></label>
              </div>
              <button className="primary-button" onClick={crear}><Check size={16} /> Guardar</button>
            </article>
          )}

          <div className="table-wrap">
            <table>
              <thead><tr><th>Código</th><th>Nombre</th><th>Vigente desde</th><th>Asignaturas</th><th>Estado</th></tr></thead>
              <tbody>
                {planes.items.map((plan) => (
                  <tr key={plan.id}>
                    <td><span className="code">{plan.codigo}</span></td>
                    <td><strong>{plan.nombre}</strong></td>
                    <td>{plan.vigenciaDesde}</td>
                    <td>{plan.cantidadAsignaturas}</td>
                    <td><span className={`status ${estadoClase[plan.estado]}`}><i />{plan.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!planes.cargando && planes.items.length === 0 && <EmptyState query="" />}
          </div>
        </>}
  </>
}

function AsignaturasPanel({ onNotify }: { onNotify: (value: string) => void }) {
  const dispatch = useAppDispatch()
  const carreras = useAppSelector((state) => state.carreras)
  const planes = useAppSelector((state) => state.planesEstudio)
  const asignaturas = useAppSelector((state) => state.asignaturas)
  const [carreraId, setCarreraId] = useState<number | null>(null)
  const [planId, setPlanId] = useState<number | null>(null)
  const [formAbierto, setFormAbierto] = useState(false)
  const [valores, setValores] = useState({ codigo: '', nombre: '', anio: '', creditos: '', cargaHoraria: '' })

  useEffect(() => {
    dispatch(listarCarreras())
  }, [dispatch])
  useEffect(() => {
    if (carreraId) dispatch(listarPlanesDeEstudio(carreraId))
  }, [dispatch, carreraId])
  useEffect(() => {
    if (planId) dispatch(listarAsignaturas(planId))
  }, [dispatch, planId])

  const seleccionarCarrera = (value: string) => {
    setCarreraId(value ? Number(value) : null)
    setPlanId(null)
  }

  const crear = async () => {
    if (!planId) return
    const resultado = await dispatch(crearAsignatura({
      planId,
      datos: { ...valores, creditos: Number(valores.creditos), cargaHoraria: Number(valores.cargaHoraria) },
    }))
    if (crearAsignatura.fulfilled.match(resultado)) {
      onNotify('Asignatura creada correctamente')
      setValores({ codigo: '', nombre: '', anio: '', creditos: '', cargaHoraria: '' })
      setFormAbierto(false)
    }
  }

  return <>
    <div className="form-grid" style={{ maxWidth: 620 }}>
      <label>Carrera
        <select value={carreraId ?? ''} onChange={(e) => seleccionarCarrera(e.target.value)}>
          <option value="">Seleccioná una carrera...</option>
          {carreras.items.map((carrera) => <option key={carrera.id} value={carrera.id}>{carrera.codigo} · {carrera.nombre}</option>)}
        </select>
      </label>
      <label>Plan de estudio
        <select value={planId ?? ''} onChange={(e) => setPlanId(e.target.value ? Number(e.target.value) : null)} disabled={!carreraId}>
          <option value="">Seleccioná un plan...</option>
          {planes.items.map((plan) => <option key={plan.id} value={plan.id}>{plan.codigo} · {plan.nombre}</option>)}
        </select>
      </label>
    </div>

    {!planId
      ? <p className="muted-copy">Elegí una carrera y un plan de estudio para ver sus asignaturas.</p>
      : <>
          {asignaturas.error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {asignaturas.error}</div>}
          <div className="list-meta"><span>{asignaturas.items.length} asignaturas</span><button className="text-button" onClick={() => setFormAbierto((v) => !v)}>{formAbierto ? 'Cancelar' : '+ Crear asignatura'}</button></div>

          {formAbierto && (
            <article className="panel" style={{ marginBottom: 18 }}>
              <div className="form-grid">
                <label>Código<input value={valores.codigo} onChange={(e) => setValores({ ...valores, codigo: e.target.value })} placeholder="Ej. INF-306" /></label>
                <label>Nombre<input value={valores.nombre} onChange={(e) => setValores({ ...valores, nombre: e.target.value })} placeholder="Ej. Desarrollo de Aplicaciones II" /></label>
                <label>Año<input value={valores.anio} onChange={(e) => setValores({ ...valores, anio: e.target.value })} placeholder="Ej. 3.º año" /></label>
                <label>Créditos<input type="number" min="1" value={valores.creditos} onChange={(e) => setValores({ ...valores, creditos: e.target.value })} /></label>
                <label>Carga horaria (hs)<input type="number" min="1" value={valores.cargaHoraria} onChange={(e) => setValores({ ...valores, cargaHoraria: e.target.value })} /></label>
              </div>
              <button className="primary-button" onClick={crear}><Check size={16} /> Guardar</button>
            </article>
          )}

          <div className="table-wrap">
            <table>
              <thead><tr><th>Código</th><th>Nombre</th><th>Año</th><th>Créditos</th><th>Carga horaria</th><th>Estado</th></tr></thead>
              <tbody>
                {asignaturas.items.map((asignatura) => (
                  <tr key={asignatura.id}>
                    <td><span className="code">{asignatura.codigo}</span></td>
                    <td><strong>{asignatura.nombre}</strong></td>
                    <td>{asignatura.anio}</td>
                    <td>{asignatura.creditos}</td>
                    <td>{asignatura.cargaHoraria} hs</td>
                    <td><span className={`status ${estadoClase[asignatura.estado]}`}><i />{asignatura.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!asignaturas.cargando && asignaturas.items.length === 0 && <EmptyState query="" />}
          </div>
        </>}
  </>
}

function CorrelatividadesPanel({ onNotify }: { onNotify: (value: string) => void }) {
  const dispatch = useAppDispatch()
  const carreras = useAppSelector((state) => state.carreras)
  const planes = useAppSelector((state) => state.planesEstudio)
  const asignaturas = useAppSelector((state) => state.asignaturas)
  const correlatividades = useAppSelector((state) => state.correlatividades)
  const [carreraId, setCarreraId] = useState<number | null>(null)
  const [planId, setPlanId] = useState<number | null>(null)
  const [asignaturaId, setAsignaturaId] = useState<number | null>(null)
  const [correlativaId, setCorrelativaId] = useState('')
  const [tipo, setTipo] = useState<TipoCorrelatividad>('REGULAR')

  useEffect(() => { dispatch(listarCarreras()) }, [dispatch])
  useEffect(() => { if (carreraId) dispatch(listarPlanesDeEstudio(carreraId)) }, [dispatch, carreraId])
  useEffect(() => { if (planId) dispatch(listarAsignaturas(planId)) }, [dispatch, planId])
  useEffect(() => { if (asignaturaId) dispatch(listarCorrelatividades(asignaturaId)) }, [dispatch, asignaturaId])

  const seleccionarCarrera = (value: string) => {
    setCarreraId(value ? Number(value) : null)
    setPlanId(null)
    setAsignaturaId(null)
  }

  const seleccionarPlan = (value: string) => {
    setPlanId(value ? Number(value) : null)
    setAsignaturaId(null)
  }

  const opciones = asignaturas.items.filter((a) => a.id !== asignaturaId)

  const agregar = async () => {
    if (!asignaturaId || !correlativaId) {
      onNotify('Seleccioná una asignatura correlativa.')
      return
    }
    const resultado = await dispatch(crearCorrelatividad({ asignaturaId, datos: { correlativaId: Number(correlativaId), tipo } }))
    if (crearCorrelatividad.fulfilled.match(resultado)) {
      onNotify('Correlatividad agregada')
      setCorrelativaId('')
    }
  }

  return <>
    <div className="form-grid" style={{ maxWidth: 620 }}>
      <label>Carrera
        <select value={carreraId ?? ''} onChange={(e) => seleccionarCarrera(e.target.value)}>
          <option value="">Seleccioná una carrera...</option>
          {carreras.items.map((c) => <option key={c.id} value={c.id}>{c.codigo} · {c.nombre}</option>)}
        </select>
      </label>
      <label>Plan de estudio
        <select value={planId ?? ''} onChange={(e) => seleccionarPlan(e.target.value)} disabled={!carreraId}>
          <option value="">Seleccioná un plan...</option>
          {planes.items.map((p) => <option key={p.id} value={p.id}>{p.codigo} · {p.nombre}</option>)}
        </select>
      </label>
      <label>Asignatura
        <select value={asignaturaId ?? ''} onChange={(e) => setAsignaturaId(e.target.value ? Number(e.target.value) : null)} disabled={!planId}>
          <option value="">Seleccioná una asignatura...</option>
          {asignaturas.items.map((a) => <option key={a.id} value={a.id}>{a.codigo} · {a.nombre}</option>)}
        </select>
      </label>
    </div>

    {!asignaturaId
      ? <p className="muted-copy">Elegí una asignatura para ver y agregar sus correlatividades.</p>
      : <article className="panel">
          {correlatividades.error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {correlatividades.error}</div>}
          <div className="detail-label">CORRELATIVIDADES REQUERIDAS <span>{correlatividades.items.length}</span></div>
          {correlatividades.items.length === 0 && <p className="muted-copy">No hay correlatividades configuradas.</p>}
          {correlatividades.items.map((correlatividad) => {
            const requerida = asignaturas.items.find((a) => a.id === correlatividad.correlativaId)
            return <div className="requirement" key={correlatividad.id}>
              <span><strong>{requerida?.nombre ?? `Asignatura #${correlatividad.correlativaId}`}</strong><small>{requerida?.codigo} · {correlatividad.tipo}</small></span>
            </div>
          })}
          <div className="correlative-add">
            <select value={correlativaId} onChange={(e) => setCorrelativaId(e.target.value)} aria-label="Seleccionar correlativa">
              <option value="">Seleccionar asignatura...</option>
              {opciones.map((a) => <option key={a.id} value={a.id}>{a.codigo} · {a.nombre}</option>)}
            </select>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoCorrelatividad)} aria-label="Tipo de correlatividad">
              <option value="REGULAR">Regular</option>
              <option value="APROBADA">Aprobada</option>
            </select>
            <button className="secondary-button" onClick={agregar}><Plus size={16} /> Agregar correlativa</button>
          </div>
        </article>}
  </>
}
