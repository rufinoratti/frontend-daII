import { authAxios } from '../api/authAxios'
import type { Asignacion, CrearAsignacion } from '../../types/api'

export const asignacionesService = {
  crear: (datos: CrearAsignacion) =>
    authAxios.post<Asignacion>('/api/planificacion/asignaciones', datos).then((r) => r.data),
  agenda: (aulaId: number, fecha: string) =>
    authAxios
      .get<Asignacion[]>(`/api/planificacion/aulas/${aulaId}/agenda`, { params: { fecha } })
      .then((r) => r.data),
}
