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

export type Career = {
  id: number
  code: string
  name: string
  faculty: string
  duration: string
  title: string
  status: 'Activa' | 'Borrador' | 'Inactiva'
}

export type StudyPlan = {
  id: number
  code: string
  name: string
  career: string
  careerId?: number
  validFrom: string
  subjectsCount: number
  status: 'Activa' | 'Borrador' | 'Inactiva'
}

export type Subject = {
  id: number
  code: string
  name: string
  career: string
  plan: string
  year: string
  credits: number
  status: 'Activa' | 'Borrador' | 'Inactiva'
}

export type Room = {
  id: number
  name: string
  campus: string
  capacity: number
  type: string
  status: 'Disponible' | 'En uso' | 'Inactiva'
}

export type Campus = {
  id: number
  name: string
  roomsCount: number
}

export type Assignment = {
  id: number
  course: string
  room: string
  day: string
  start: string
  end: string
  period: string
}

export type AcademicPeriod = {
  id: number
  name: string
  start: string
  end: string
  status: 'Planificado' | 'Activo' | 'Finalizado'
}

export type ExamTurn = {
  id: number
  name: string
  start: string
  end: string
  exams: number
  status: 'Planificado' | 'Inscripción abierta' | 'Finalizado'
}

export type NavGroup = {
  label: string
  items: { name: Screen; icon: Icon }[]
}

export type ModalKind = 'career' | 'plan' | 'subject' | 'campus' | 'room' | 'assignment' | 'period' | 'exam'

export type ModalTarget = { kind: ModalKind; id?: number }
