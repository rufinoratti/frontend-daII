import axios from 'axios'

const coreUrl = import.meta.env.VITE_CORE_URL ?? 'http://localhost:8080'
let accessToken: string | null = null
let refreshEnCurso: Promise<string> | null = null

/** El access token sólo vive en memoria; CORE conserva el refresh token en cookie HttpOnly. */
export const authAxios = axios.create({
  baseURL: coreUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

const coreAxios = axios.create({ baseURL: coreUrl, withCredentials: true })

export function guardarAccessToken(token: string | null) {
  accessToken = token
}

export async function refrescarAccessToken(): Promise<string> {
  if (!refreshEnCurso) {
    refreshEnCurso = coreAxios.post<{ accessToken: string }>('/api/v1/auth/refresh')
      .then(({ data }) => {
        accessToken = data.accessToken
        return data.accessToken
      })
      .finally(() => { refreshEnCurso = null })
  }
  return refreshEnCurso
}

authAxios.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  // CORE enruta este módulo a /api/v1/*; las pantallas conservan sus rutas internas.
  if (config.url?.startsWith('/api/') && !config.url.startsWith('/api/v1/auth/')) {
    config.url = `/api/v1/academic${config.url.slice(4)}`
  }
  return config
})

authAxios.interceptors.response.use(undefined, async (error) => {
  const config = error.config as (typeof error.config & { _coreRetry?: boolean }) | undefined
  if (error.response?.status !== 401 || !config || config._coreRetry) return Promise.reject(error)
  config._coreRetry = true
  try {
    const token = await refrescarAccessToken()
    config.headers.Authorization = `Bearer ${token}`
    return authAxios(config)
  } catch {
    guardarAccessToken(null)
    return Promise.reject(error)
  }
})

export { coreAxios }
