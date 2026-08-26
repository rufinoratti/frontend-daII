import { useState } from 'react'
import { Modal } from './components/Modal'
import { Toast } from './components/Toast'
import { PageHeading } from './components/layout/PageHeading'
import { AcademicView } from './features/academica/AcademicView'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { PlanningView } from './features/planificacion/PlanningView'
import { CycleView } from './features/ciclo/CycleView'
import { RegularityView } from './features/ciclo/RegularityView'
import { DashboardLayout } from './layouts/DashboardLayout'
import type { ModalKind, Screen } from './types/domain'
import './index.css'

function App() {
  const [screen, setScreen] = useState<Screen>('Resumen')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<ModalKind | null>(null)
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

  const academicScreens: Screen[] = ['Carreras', 'Planes de estudio', 'Asignaturas', 'Correlatividades']
  const planningScreens: Screen[] = ['Sedes y aulas', 'Asignaciones', 'Agenda']
  const cycleScreens: Screen[] = ['Períodos', 'Turnos de examen']

  const createCourse = () => setModal('course')
  const createRoom = () => setModal('room')
  const createPeriod = () => setModal('period')

  return <>
    <DashboardLayout screen={screen} sidebarOpen={sidebarOpen} navigate={navigate} closeSidebar={() => setSidebarOpen(false)} openSidebar={() => setSidebarOpen(true)} openModal={setModal}>
      <PageHeading screen={screen} onCreate={screen === 'Sedes y aulas' ? createRoom : screen === 'Períodos' ? createPeriod : createCourse} />
      {screen === 'Resumen' && <DashboardPage onNavigate={navigate} onCreate={createCourse} />}
      {academicScreens.includes(screen) && <AcademicView screen={screen} query={query} setQuery={setQuery} onCreate={createCourse} onNotify={notify} />}
      {planningScreens.includes(screen) && <PlanningView screen={screen} query={query} setQuery={setQuery} onCreate={createRoom} onNotify={notify} />}
      {cycleScreens.includes(screen) && <CycleView screen={screen} query={query} setQuery={setQuery} onCreate={createPeriod} onNotify={notify} />}
      {screen === 'Regularidad' && <RegularityView onNotify={notify} />}
    </DashboardLayout>
    {toast && <Toast message={toast} />}
    {modal && <Modal kind={modal} screen={screen} close={() => setModal(null)} notify={notify} />}
  </>
}

export default App
