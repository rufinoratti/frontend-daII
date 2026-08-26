import type { Course, Room } from '../types/domain'

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
