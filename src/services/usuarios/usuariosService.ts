import { authAxios, coreAxios, guardarAccessToken } from '../api/authAxios'
import type { CrearUsuario, LoginUsuario, Usuario } from '../../types/api'

const BASE = '/api/usuarios'

type UsuarioCore = {
  id: string
  email: string
  roles: string[]
  permissions: string[]
  status: string
}
type LoginCore = { accessToken: string; expiresIn: number; user: UsuarioCore }

const convertirUsuario = (usuario: UsuarioCore): Usuario => ({
  ...usuario,
  nombre: usuario.email.split('@')[0],
  permiso: usuario.roles.join(', ') || 'Sin rol',
  activo: usuario.status === 'ACTIVE',
})

export const usuariosService = {
  login: async (datos: LoginUsuario) => {
    const { data } = await coreAxios.post<LoginCore>('/api/v1/auth/login', datos)
    guardarAccessToken(data.accessToken)
    return convertirUsuario(data.user)
  },
  logout: async () => {
    try { await coreAxios.post<void>('/api/v1/auth/logout') } finally { guardarAccessToken(null) }
  },
  actual: () => authAxios.get<UsuarioCore>('/api/v1/auth/me').then((r) => convertirUsuario(r.data)),
  crear: (datos: CrearUsuario) => authAxios.post<Usuario>(BASE, datos).then((r) => r.data),
  listar: () => authAxios.get<Usuario[]>(BASE).then((r) => r.data),
}
