// Forma de estado compartida por los slices que solo listan/crean una entidad plana.
export interface EstadoLista<T> {
  items: T[]
  cargando: boolean
  error: string | null
}

export function estadoListaInicial<T>(): EstadoLista<T> {
  return { items: [], cargando: false, error: null }
}
