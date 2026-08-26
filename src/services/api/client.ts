const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

/**
 * Punto único para las futuras llamadas al backend Spring Boot.
 * Mientras trabajamos con mocks, las pantallas no lo invocan todavía.
 */
export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${path}`)
  }

  return response.json() as Promise<T>
}
