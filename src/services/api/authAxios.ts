import axios from 'axios'

/**
 * El backend autentica por sesion (cookie JSESSIONID), no por token Bearer.
 * "authAxios" es la instancia configurada para mandar y recibir esa cookie
 * (withCredentials): no agrega un header Authorization, el navegador maneja
 * la cookie solo. Requiere que el backend tenga CORS con allowCredentials
 * habilitado para este origen (ver ConfiguracionSeguridad en el backend).
 */
export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
