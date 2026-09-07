import { authAxios } from '../api/authAxios'
import type { ResultadoRegularidad, ValidarRegularidad } from '../../types/api'

export const regularidadService = {
  validar: (datos: ValidarRegularidad) =>
    authAxios.post<ResultadoRegularidad>('/api/regularidad/validar', datos).then((r) => r.data),
}
