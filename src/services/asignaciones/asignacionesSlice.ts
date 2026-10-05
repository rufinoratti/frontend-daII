import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { asignacionesService } from './asignacionesService'
import { extraerMensajeError } from '../api/erroresApi'
import type { Asignacion, CrearAsignacion } from '../../types/api'

interface EstadoAsignaciones {
  agenda: Asignacion[]
  cargando: boolean
  error: string | null
}

const estadoInicial: EstadoAsignaciones = { agenda: [], cargando: false, error: null }

export const obtenerAgenda = createAsyncThunk<
  Asignacion[],
  { aulaId: number; fecha: string },
  { rejectValue: string }
>('asignaciones/agenda', async ({ aulaId, fecha }, { rejectWithValue }) => {
  try {
    return await asignacionesService.agenda(aulaId, fecha)
  } catch (error) {
    return rejectWithValue(extraerMensajeError(error))
  }
})

export const crearAsignacion = createAsyncThunk<Asignacion, CrearAsignacion, { rejectValue: string }>(
  'asignaciones/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await asignacionesService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const asignacionesSlice = createSlice({
  name: 'asignaciones',
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerAgenda.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(obtenerAgenda.fulfilled, (state, action: PayloadAction<Asignacion[]>) => {
        state.cargando = false
        state.agenda = action.payload
      })
      .addCase(obtenerAgenda.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudo obtener la agenda'
      })

      // No se agrega directo a "agenda": la asignacion creada puede no
      // pertenecer al aula/fecha que esta consultando la pantalla en este
      // momento. Quien crea deberia volver a pedir la agenda si la necesita.
      .addCase(crearAsignacion.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear la asignacion'
      })
  },
})

export default asignacionesSlice.reducer
