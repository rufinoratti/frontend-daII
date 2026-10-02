import {
  BookOpen,
  Buildings,
  CalendarBlank,
  CheckCircle,
  ClipboardText,
  Clock,
  ChalkboardTeacher,
  Exam,
  GraduationCap,
  House,
  ListChecks,
} from '@phosphor-icons/react'
import type { NavGroup } from '../types/domain'

export const navGroups: NavGroup[] = [
  { label: 'INICIO', items: [{ name: 'Resumen', icon: House }] },
  { label: 'ESTRUCTURA ACADÉMICA', items: [{ name: 'Carreras', icon: GraduationCap }, { name: 'Planes de estudio', icon: BookOpen }, { name: 'Asignaturas', icon: ClipboardText }, { name: 'Correlatividades', icon: ListChecks }] },
  { label: 'PLANIFICACIÓN', items: [{ name: 'Sedes y aulas', icon: Buildings }, { name: 'Cursos', icon: ChalkboardTeacher }, { name: 'Asignaciones', icon: CalendarBlank }, { name: 'Agenda', icon: Clock }] },
  { label: 'CICLO ACADÉMICO', items: [{ name: 'Períodos', icon: CalendarBlank }, { name: 'Turnos de examen', icon: Exam }, { name: 'Regularidad', icon: CheckCircle }] },
]
