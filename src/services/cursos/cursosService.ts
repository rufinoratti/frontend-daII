import { authAxios } from '../api/authAxios'
import type {
  AsignarDocenteCurso,
  CrearCurso,
  CrearHorarioCurso,
  Curso,
  CursoDetalle,
  GuardarInscripcionCurso,
} from '../../types/api'

const BASE = '/api/planificacion/cursos'

export const cursosService = {
  listar: (periodoId?: number) =>
    authAxios.get<Curso[]>(BASE, { params: periodoId ? { periodoId } : undefined }).then((r) => r.data),
  obtener: (id: number) => authAxios.get<CursoDetalle>(`${BASE}/${id}`).then((r) => r.data),
  crear: (datos: CrearCurso) => authAxios.post<Curso>(BASE, datos).then((r) => r.data),
  actualizarEstado: (id: number, estado: string) =>
    authAxios.put(`${BASE}/${id}/estado`, { estado }).then(() => undefined),
  asignarDocente: (id: number, datos: AsignarDocenteCurso) =>
    authAxios.post(`${BASE}/${id}/docentes`, datos).then(() => undefined),
  guardarInscripcion: (id: number, datos: GuardarInscripcionCurso) =>
    authAxios.post(`${BASE}/${id}/inscripciones`, datos).then(() => undefined),
  actualizarInscripcion: (id: number, alumnoId: string, datos: GuardarInscripcionCurso) =>
    authAxios.put(`${BASE}/${id}/inscripciones/${encodeURIComponent(alumnoId)}`, datos).then(() => undefined),
  agregarHorario: (id: number, datos: CrearHorarioCurso) =>
    authAxios.post(`${BASE}/${id}/horarios`, datos).then(() => undefined),
}
