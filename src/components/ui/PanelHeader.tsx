type PanelHeaderProps = { title: string; subtitle: string; action?: string }

export function PanelHeader({ title, subtitle, action }: PanelHeaderProps) {
  return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{action && <button className="text-button">{action}</button>}</div>
}
