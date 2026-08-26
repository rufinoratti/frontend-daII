import { useState } from 'react'

const sections = ['Resumen', 'Oferta académica', 'Planificación', 'Calendario', 'Regularidad']

function App() {
  const [section, setSection] = useState('Resumen')

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><b>U</b><span><strong>UADEnet</strong><small>Gestión académica</small></span></div>
        <p className="menu-label">ESPACIO DE TRABAJO</p>
        <nav aria-label="Secciones">
          {sections.map((item) => <button className={section === item ? 'selected' : ''} key={item} onClick={() => setSection(item)} type="button">{item}</button>)}
        </nav>
        <div className="profile"><i>SA</i><span><strong>Secretaría Académica</strong><small>Administrativo</small></span></div>
      </aside>

      <section className="workspace">
        <header><p>Gestión académica <span>/</span> {section}</p><button type="button">+ Crear nuevo</button></header>
        <div className="page-content">
          <p className="eyebrow">SECRETARÍA ACADÉMICA</p>
          <h1>Buen día, equipo.</h1>
          <p className="subtitle">Organizá la estructura académica y planificá el próximo cuatrimestre desde un único lugar.</p>
          <div className="notice"><strong>Vista de demostración</strong><span>Los valores visibles son datos mock. Próximamente se conectarán con la API de Spring Boot.</span></div>

          <h2>Acciones frecuentes</h2>
          <div className="cards">
            <button type="button"><b>+</b><span><strong>Nueva carrera</strong><small>Crear y organizar la oferta académica</small></span><em>→</em></button>
            <button type="button"><b>▧</b><span><strong>Planificar aula</strong><small>Asignar un espacio y horario</small></span><em>→</em></button>
            <button type="button"><b>◷</b><span><strong>Crear período</strong><small>Definir un nuevo cuatrimestre</small></span><em>→</em></button>
          </div>

          <div className="panels">
            <article><div className="panel-title"><span><h2>Actividad reciente</h2><p>Últimos movimientos del equipo</p></span><button type="button">Ver todo</button></div><ul><li><b>◫</b><span><strong>Plan 2026 actualizado</strong><small>Ingeniería en Informática · Hace 18 min</small></span></li><li><b>▧</b><span><strong>Aula asignada a Desarrollo II</strong><small>Sede Monserrat · Hace 1 h</small></span></li><li><b>◷</b><span><strong>Turno de final creado</strong><small>Febrero 2027 · Ayer</small></span></li></ul></article>
            <article><div className="panel-title"><span><h2>Vista general</h2><p>Oferta académica activa</p></span></div><div className="big-metric"><strong>24</strong><span>Carreras</span></div><div className="metrics"><span><strong>186</strong>Asignaturas</span><span><strong>42</strong>Aulas</span></div></article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
