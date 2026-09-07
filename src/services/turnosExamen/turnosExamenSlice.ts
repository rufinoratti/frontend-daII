import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { turnosExamenService } from './turnosExamenService'
import { extraerMensajeError } from '../api/erroresApi'
import { estadoListaInicial, type EstadoLista } from '../api/estadoLista'
import type { CrearTurnoExamen, TurnoExamen } from '../../types/api'

export const listarTurnosExamen = createAsyncThunk<TurnoExamen[], void, { rejectValue: string }>(
  'turnosExamen/listar',
  async (_, { rejectWithValue }) => {
    try {
      return await turnosExamenService.listar()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearTurnoExamen = createAsyncThunk<TurnoExamen, CrearTurnoExamen, { rejectValue: string }>(
  'turnosExamen/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await turnosExamenService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const turnosExamenSlice = createSlice({
  name: 'turnosExamen',
  initialState: estadoListaInicial<TurnoExamen>(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarTurnosExamen.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(
        listarTurnosExamen.fulfilled,
        (state: EstadoLista<TurnoExamen>, action: PayloadAction<TurnoExamen[]>) => {
          state.cargando = false
          state.items = action.payload
        },
      )
      .addCase(listarTurnosExamen.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudieron obtener los turnos de examen'
      })

      .addCase(crearTurnoExamen.fulfilled, (state: EstadoLista<TurnoExamen>, action: PayloadAction<TurnoExamen>) => {
        state.items.push(action.payload)
      })
      .addCase(crearTurnoExamen.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear el turno de examen'
      })
  },
})

export default turnosExamenSlice.reducer
