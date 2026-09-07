import { useState } from 'react'
import { Toast } from './components/Toast'
import { PageHeading } from './components/layout/PageHeading'
import { DashboardLayout } from './layouts/DashboardLayout'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { cerrarSesion } from './services/usuarios/usuariosSlice'
import { RealDashboardPage } from './features/real/RealDashboardPage'
import { RealAcademicView } from './features/real/RealAcademicView'
import { RealPlanningView } from './features/real/RealPlanningView'
import { RealCycleView } from './features/real/RealCycleView'
import { RealRegularityView } from './features/real/RealRegularityView'
import type { Screen } from './types/domain'

const academicScreens: Screen[] = ['Carreras', 'Planes de estudio', 'Asignaturas', 'Correlatividades']
const planningScreens: Screen[] = ['Sedes y aulas', 'Asignaciones', 'Agenda']
const cycleScreens: Screen[] = ['Períodos', 'Turnos de examen']

// Contraparte de AppMock.tsx pero contra el backend real: cada pantalla
// despacha sus propios thunks (services/*/*.slice.ts) en vez de leer arrays
// locales. No reutiliza el Modal generico de mocks porque los formularios
// reales necesitan referenciar IDs concretos (carreraId, planId, etc.).
function AppReal() {
  const dispatch = useAppDispatch()
  const usuario = useAppSelector((state) => state.usuarios.actual)
  const [screen, setScreen] = useState<Screen>('Resumen')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (next: Screen) => {
    setScreen(next)
    setQuery('')
    setSidebarOpen(false)
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return <>
    <DashboardLayout
      screen={screen}
      sidebarOpen={sidebarOpen}
      navigate={navigate}
      closeSidebar={() => setSidebarOpen(false)}
      openSidebar={() => setSidebarOpen(true)}
      openModal={() => notify('Usá el botón "+" dentro de la sección para crear un registro.')}
      perfilNombre={usuario?.nombre}
      perfilSubtitulo={usuario?.permiso}
      onLogout={() => dispatch(cerrarSesion())}
    >
      <PageHeading screen={screen} />
      {screen === 'Resumen' && <RealDashboardPage onNavigate={navigate} onCreate={() => navigate('Carreras')} />}
      {academicScreens.includes(screen) && <RealAcademicView screen={screen} query={query} setQuery={setQuery} onNotify={notify} />}
      {planningScreens.includes(screen) && <RealPlanningView screen={screen} query={query} setQuery={setQuery} onNotify={notify} />}
      {cycleScreens.includes(screen) && <RealCycleView screen={screen} query={query} setQuery={setQuery} onNotify={notify} />}
      {screen === 'Regularidad' && <RealRegularityView onNotify={notify} />}
    </DashboardLayout>
    {toast && <Toast message={toast} />}
  </>
}

export default AppReal
