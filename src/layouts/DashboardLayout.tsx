import type { ReactNode } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'
import type { Screen } from '../types/domain'

type DashboardLayoutProps = {
  screen: Screen
  sidebarOpen: boolean
  navigate: (screen: Screen) => void
  closeSidebar: () => void
  openSidebar: () => void
  perfilNombre?: string
  perfilSubtitulo?: string
  onLogout?: () => void
  children: ReactNode
}

export function DashboardLayout({
  screen,
  sidebarOpen,
  navigate,
  closeSidebar,
  openSidebar,
  perfilNombre,
  perfilSubtitulo,
  onLogout,
  children,
}: DashboardLayoutProps) {
  return <div className="app-shell">
    <Sidebar
      screen={screen}
      open={sidebarOpen}
      navigate={navigate}
      close={closeSidebar}
      perfilNombre={perfilNombre}
      perfilSubtitulo={perfilSubtitulo}
      onLogout={onLogout}
    />
    <section className="workspace"><Topbar screen={screen} openMenu={openSidebar} /><main className="page-content">{children}</main></section>
  </div>
}
