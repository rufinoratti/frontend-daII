import { Check, X } from '@phosphor-icons/react'
import type { FormEvent } from 'react'
import { MockTag } from './ui/MockTag'
import type { ModalKind, Screen } from '../types/domain'

type ModalProps = { kind: ModalKind; screen: Screen; close: () => void; notify: (value: string) => void }

export function Modal({ kind, screen, close, notify }: ModalProps) {
  const labels = kind === 'course'
    ? screen === 'Carreras' ? ['Nueva carrera', 'Nombre de la carrera', 'Título que otorga', 'Ej. Ingeniería en Informática'] : screen === 'Planes de estudio' ? ['Nuevo plan de estudio', 'Nombre del plan', 'Carrera', 'Ej. Ingeniería en Informática'] : ['Nueva asignatura', 'Nombre de la asignatura', 'Código', 'Ej. INF-306']
    : kind === 'room' ? ['Nueva aula', 'Nombre del aula', 'Sede', 'Ej. Monserrat']
      : screen === 'Turnos de examen' ? ['Nuevo turno de examen', 'Nombre del turno', 'Fecha de inicio', 'dd/mm/aaaa'] : ['Nuevo período académico', 'Nombre del período', 'Fecha de inicio', 'dd/mm/aaaa']

  const submit = (event: FormEvent) => {
    event.preventDefault()
    close()
    notify(`${labels[0]} guardada como mock`)
  }

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}><form className="modal" onSubmit={submit}><div className="modal-head"><div><span className="form-kicker">CREAR REGISTRO <MockTag /></span><h2>{labels[0]}</h2></div><button type="button" onClick={close} aria-label="Cerrar"><X size={20} /></button></div><label>{labels[1]}<input required placeholder="Escribí un nombre" autoFocus /></label><label>{labels[2]}<input required placeholder={labels[3]} /></label><label>Descripción<textarea rows={3} placeholder="Información adicional (opcional)" /></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={close}>Cancelar</button><button className="primary-button" type="submit"><Check size={17} /> Guardar mock</button></div></form></div>
}
