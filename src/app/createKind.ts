import type { ModalKind, Screen } from '../types/domain'

export function getCreateKind(screen: Screen): ModalKind {
  if (screen === 'Carreras') return 'career'
  if (screen === 'Planes de estudio') return 'plan'
  if (screen === 'Asignaturas' || screen === 'Correlatividades') return 'subject'
  if (screen === 'Sedes y aulas') return 'room'
  if (screen === 'Asignaciones') return 'assignment'
  if (screen === 'Períodos') return 'period'
  if (screen === 'Turnos de examen') return 'exam'
  return 'career'
}
