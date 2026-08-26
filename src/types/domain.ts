import type { Icon } from '@phosphor-icons/react'

export type Screen =
  | 'Resumen'
  | 'Carreras'
  | 'Planes de estudio'
  | 'Asignaturas'
  | 'Correlatividades'
  | 'Sedes y aulas'
  | 'Asignaciones'
  | 'Agenda'
  | 'Períodos'
  | 'Turnos de examen'
  | 'Regularidad'

export type Course = {
  id: number
  code: string
  name: string
  career: string
  year: string
  credits: number
  status: 'Activa' | 'Borrador'
}

export type Room = {
  id: number
  name: string
  campus: string
  capacity: number
  type: string
  status: 'Disponible' | 'En uso'
}

export type NavGroup = {
  label: string
  items: { name: Screen; icon: Icon }[]
}

export type ModalKind = 'course' | 'room' | 'period'
