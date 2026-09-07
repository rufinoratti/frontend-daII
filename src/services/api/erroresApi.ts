import { isAxiosError } from 'axios'

interface CuerpoErrorApi {
  mensaje?: string
  errores?: Record<string, string>
}

/**
 * El backend (ManejadorErrores) devuelve { mensaje, errores? } para los errores
 * de negocio y de validacion. Esta funcion lo traduce a un string listo para
 * mostrarle al usuario, con mensajes propios para los casos que no traen body.
 */
export function extraerMensajeError(
  error: unknown,
  mensajePorDefecto = 'Ocurrio un error al comunicarse con el servidor',
): string {
  if (isAxiosError<CuerpoErrorApi>(error)) {
    if (error.response?.data?.mensaje) return error.response.data.mensaje
    if (error.response?.status === 401) return 'Debes iniciar sesion para continuar'
    if (error.response?.status === 403) return 'No tenes permisos para realizar esta accion'
    if (!error.response) return 'No se pudo conectar con el servidor'
  }
  return mensajePorDefecto
}
