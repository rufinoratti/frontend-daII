import { ArrowRight } from '@phosphor-icons/react'
import type { ReactNode } from 'react'

type ActionCardProps = { icon: ReactNode; title: string; text: string; onClick: () => void }

export function ActionCard({ icon, title, text, onClick }: ActionCardProps) {
  return <button className="action-card" onClick={onClick}><span className="action-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span><ArrowRight className="action-arrow" size={18} /></button>
}
