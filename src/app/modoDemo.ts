import type { Usuario } from '../types/api'

// Coincide con universidad.demo.email en el backend (ConfiguracionSeguridad).
export const EMAIL_USUARIO_DEMO = 'demo@universidad.edu.ar'

export function esUsuarioDemo(usuario: Usuario | null): boolean {
  return usuario?.email.toLowerCase() === EMAIL_USUARIO_DEMO
}
