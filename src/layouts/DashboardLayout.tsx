import type { ReactNode } from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'
import type { ModalKind, Screen } from '../types/domain'

type DashboardLayoutProps = {
  screen: Screen
  sidebarOpen: boolean
  navigate: (screen: Screen) => void
  closeSidebar: () => void
  openSidebar: () => void
  openModal: (kind: ModalKind) => void
  children: ReactNode
}

export function DashboardLayout({ screen, sidebarOpen, navigate, closeSidebar, openSidebar, openModal, children }: DashboardLayoutProps) {
  return <div className="app-shell"><Sidebar screen={screen} open={sidebarOpen} navigate={navigate} close={closeSidebar} /><section className="workspace"><Topbar screen={screen} openMenu={openSidebar} openModal={openModal} /><main className="page-content">{children}</main></section></div>
}
