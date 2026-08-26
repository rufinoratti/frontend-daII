import { Bell, ListChecks, Plus } from '@phosphor-icons/react'
import type { Screen, ModalKind } from '../../types/domain'

type TopbarProps = { screen: Screen; openMenu: () => void; openModal: (kind: ModalKind) => void }

export function Topbar({ screen, openMenu, openModal }: TopbarProps) {
  const kind: ModalKind = screen === 'Sedes y aulas' || screen === 'Asignaciones' ? 'room' : screen === 'Períodos' ? 'period' : 'course'
  return <header className="topbar"><button className="mobile-menu" onClick={openMenu} aria-label="Abrir menú"><ListChecks size={22} /></button><div className="breadcrumb">Gestión académica <span>/</span> {screen}</div><div className="top-actions"><button className="icon-button" aria-label="Notificaciones"><Bell size={20} /><i /></button><button className="primary-button compact" onClick={() => openModal(kind)}><Plus size={16} /> Crear nuevo</button></div></header>
}
