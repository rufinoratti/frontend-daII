import { Bell, ListChecks, Plus } from '@phosphor-icons/react'
import { getCreateKind } from '../../app/createKind'
import type { ModalKind, Screen } from '../../types/domain'

type TopbarProps = { screen: Screen; openMenu: () => void; openModal: (kind: ModalKind) => void }

export function Topbar({ screen, openMenu, openModal }: TopbarProps) {
  const kind = getCreateKind(screen)
  return <header className="topbar"><button className="mobile-menu" onClick={openMenu} aria-label="Abrir menú"><ListChecks size={22} /></button><div className="breadcrumb">Gestión académica <span>/</span> {screen}</div><div className="top-actions"><button className="icon-button" aria-label="Notificaciones"><Bell size={20} /><i /></button>{screen !== 'Regularidad' && <button className="primary-button compact" onClick={() => openModal(kind)}><Plus size={16} /> Crear nuevo</button>}</div></header>
}
