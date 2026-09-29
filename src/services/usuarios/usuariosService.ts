import { authAxios } from '../api/authAxios'
import type { CrearUsuario, LoginUsuario, Usuario } from '../../types/api'

const BASE = '/api/usuarios'

export const usuariosService = {
  login: (datos: LoginUsuario) => authAxios.post<Usuario>('/api/auth/login', datos).then((r) => r.data),
  logout: () => authAxios.post<void>('/api/auth/logout'),
  actual: () => authAxios.get<Usuario>('/api/auth/me').then((r) => r.data),
  crear: (datos: CrearUsuario) => authAxios.post<Usuario>(BASE, datos).then((r) => r.data),
  listar: () => authAxios.get<Usuario[]>(BASE).then((r) => r.data),
}
