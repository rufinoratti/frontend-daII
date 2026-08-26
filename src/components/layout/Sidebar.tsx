import { CaretDown, X } from '@phosphor-icons/react'
import { navGroups } from '../../app/navigation'
import type { Screen } from '../../types/domain'

type SidebarProps = { screen: Screen; open: boolean; navigate: (screen: Screen) => void; close: () => void }

export function Sidebar({ screen, open, navigate, close }: SidebarProps) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="brand"><span className="brand-mark">U</span><span><strong>UADEnet</strong><small>Gestión académica</small></span><button className="close-sidebar" onClick={close} aria-label="Cerrar menú"><X size={20} /></button></div>
    <div className="sidebar-scroll">{navGroups.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map(({ name, icon: IconComponent }) => <button type="button" key={name} className={screen === name ? 'active' : ''} onClick={() => navigate(name)}><IconComponent size={19} weight={screen === name ? 'fill' : 'regular'} />{name}</button>)}</div>)}</div>
    <div className="profile"><span className="profile-avatar">SA</span><span><strong>Secretaría Académica</strong><small>Administrativo</small></span><CaretDown size={15} /></div>
  </aside>
}
