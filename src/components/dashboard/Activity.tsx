import type { ReactNode } from 'react'

type ActivityProps = { icon: ReactNode; tone: string; title: string; meta: string }

export function Activity({ icon, tone, title, meta }: ActivityProps) {
  return <li><span className={`activity-icon ${tone}`}>{icon}</span><span><strong>{title}</strong><small>{meta}</small></span></li>
}
