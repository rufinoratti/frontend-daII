import type { AcademicPeriod, Assignment, Campus, Career, Course, ExamTurn, Room, StudyPlan, Subject } from '../types/domain'

export const courses: Course[] = [
  { id: 1, code: 'INF-302', name: 'Desarrollo de Aplicaciones II', career: 'Ingeniería en Informática', year: '3.º año', credits: 6, status: 'Activa' },
  { id: 2, code: 'MAT-204', name: 'Análisis Matemático II', career: 'Ingeniería en Informática', year: '2.º año', credits: 6, status: 'Activa' },
  { id: 3, code: 'ADM-116', name: 'Gestión de Proyectos', career: 'Lic. en Gestión Empresarial', year: '2.º año', credits: 4, status: 'Activa' },
  { id: 4, code: 'DIS-210', name: 'Diseño de Interfaces', career: 'Lic. en Diseño', year: '2.º año', credits: 4, status: 'Borrador' },
  { id: 5, code: 'INF-405', name: 'Arquitectura de Software', career: 'Ingeniería en Informática', year: '4.º año', credits: 6, status: 'Activa' },
]

export const careers: Course[] = [
  { id: 1, code: 'ING-INF', name: 'Ingeniería en Informática', career: 'Facultad de Ingeniería', year: '5 años', credits: 0, status: 'Activa' },
  { id: 2, code: 'LIC-GES', name: 'Licenciatura en Gestión Empresarial', career: 'Facultad de Ciencias Económicas', year: '4 años', credits: 0, status: 'Activa' },
  { id: 3, code: 'LIC-DIS', name: 'Licenciatura en Diseño', career: 'Facultad de Arquitectura y Diseño', year: '4 años', credits: 0, status: 'Activa' },
  { id: 4, code: 'TEC-ANA', name: 'Tecnicatura en Analítica', career: 'Facultad de Ingeniería', year: '3 años', credits: 0, status: 'Borrador' },
]

export const studyPlans: Course[] = [
  { id: 1, code: 'PLAN-2026', name: 'Plan de estudio 2026', career: 'Ingeniería en Informática', year: 'Vigente desde marzo 2026', credits: 42, status: 'Activa' },
  { id: 2, code: 'PLAN-2024', name: 'Plan de estudio 2024', career: 'Lic. en Gestión Empresarial', year: 'Vigente desde marzo 2024', credits: 38, status: 'Activa' },
  { id: 3, code: 'PLAN-2025', name: 'Plan de estudio 2025', career: 'Lic. en Diseño', year: 'Vigente desde marzo 2025', credits: 40, status: 'Activa' },
]

export const rooms: Room[] = [
  { id: 1, name: 'Aula 204', campus: 'Monserrat', capacity: 42, type: 'Aula teórica', status: 'Disponible' },
  { id: 2, name: 'Lab. Informática 3', campus: 'Monserrat', capacity: 28, type: 'Laboratorio', status: 'En uso' },
  { id: 3, name: 'Aula Magna', campus: 'Recoleta', capacity: 120, type: 'Auditorio', status: 'Disponible' },
  { id: 4, name: 'Aula 12', campus: 'Pilar', capacity: 35, type: 'Aula teórica', status: 'Disponible' },
]

export const academicCareers: Career[] = [
  { id: 1, code: 'ING-INF', name: 'Ingeniería en Informática', faculty: 'Facultad de Ingeniería', duration: '5 años', title: 'Ingeniero/a en Informática', status: 'Activa' },
  { id: 2, code: 'LIC-GES', name: 'Licenciatura en Gestión Empresarial', faculty: 'Facultad de Ciencias Económicas', duration: '4 años', title: 'Licenciado/a en Gestión Empresarial', status: 'Activa' },
  { id: 3, code: 'LIC-DIS', name: 'Licenciatura en Diseño', faculty: 'Facultad de Arquitectura y Diseño', duration: '4 años', title: 'Licenciado/a en Diseño', status: 'Activa' },
  { id: 4, code: 'TEC-ANA', name: 'Tecnicatura en Analítica', faculty: 'Facultad de Ingeniería', duration: '3 años', title: 'Técnico/a en Analítica', status: 'Borrador' },
]

export const academicPlans: StudyPlan[] = [
  { id: 1, code: 'PLAN-2026', name: 'Plan de estudio 2026', career: 'Ingeniería en Informática', careerId: 1, validFrom: 'Marzo 2026', subjectsCount: 42, status: 'Activa' },
  { id: 2, code: 'PLAN-2024', name: 'Plan de estudio 2024', career: 'Lic. en Gestión Empresarial', careerId: 2, validFrom: 'Marzo 2024', subjectsCount: 38, status: 'Activa' },
  { id: 3, code: 'PLAN-2025', name: 'Plan de estudio 2025', career: 'Lic. en Diseño', careerId: 3, validFrom: 'Marzo 2025', subjectsCount: 40, status: 'Activa' },
]

export const academicSubjects: Subject[] = [
  { id: 1, code: 'INF-302', name: 'Desarrollo de Aplicaciones II', career: 'Ingeniería en Informática', plan: 'Plan 2026', year: '3.º año', credits: 6, status: 'Activa' },
  { id: 2, code: 'MAT-204', name: 'Análisis Matemático II', career: 'Ingeniería en Informática', plan: 'Plan 2026', year: '2.º año', credits: 6, status: 'Activa' },
  { id: 3, code: 'ADM-116', name: 'Gestión de Proyectos', career: 'Lic. en Gestión Empresarial', plan: 'Plan 2024', year: '2.º año', credits: 4, status: 'Activa' },
  { id: 4, code: 'DIS-210', name: 'Diseño de Interfaces', career: 'Lic. en Diseño', plan: 'Plan 2025', year: '2.º año', credits: 4, status: 'Borrador' },
  { id: 5, code: 'INF-405', name: 'Arquitectura de Software', career: 'Ingeniería en Informática', plan: 'Plan 2026', year: '4.º año', credits: 6, status: 'Activa' },
]

export const campuses: Campus[] = [
  { id: 1, name: 'Monserrat', roomsCount: 18 },
  { id: 2, name: 'Recoleta', roomsCount: 9 },
  { id: 3, name: 'Pilar', roomsCount: 7 },
]

export const academicAssignments: Assignment[] = [
  { id: 1, course: 'Desarrollo de Aplicaciones II', room: 'Lab. Informática 3', day: 'Lunes', start: '08:00', end: '10:00', period: '2.º cuatrimestre 2026' },
  { id: 2, course: 'Análisis Matemático II', room: 'Aula 204', day: 'Martes', start: '10:00', end: '12:00', period: '2.º cuatrimestre 2026' },
  { id: 3, course: 'Gestión de Proyectos', room: 'Aula Magna', day: 'Miércoles', start: '18:30', end: '20:30', period: '2.º cuatrimestre 2026' },
]

export const academicPeriods: AcademicPeriod[] = [
  { id: 1, name: '2.º cuatrimestre 2026', start: '2026-08-10', end: '2026-12-12', status: 'Activo' },
  { id: 2, name: '1.º cuatrimestre 2026', start: '2026-03-09', end: '2026-07-17', status: 'Finalizado' },
  { id: 3, name: '2.º cuatrimestre 2025', start: '2025-08-11', end: '2025-12-13', status: 'Finalizado' },
]

export const examTurns: ExamTurn[] = [
  { id: 1, name: 'Turno febrero 2027', start: '2027-02-08', end: '2027-02-19', exams: 24, status: 'Planificado' },
  { id: 2, name: 'Turno diciembre 2026', start: '2026-12-01', end: '2026-12-12', exams: 31, status: 'Inscripción abierta' },
  { id: 3, name: 'Turno agosto 2026', start: '2026-08-03', end: '2026-08-14', exams: 28, status: 'Finalizado' },
]
