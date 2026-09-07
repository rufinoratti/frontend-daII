import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { sedesService } from './sedesService'
import { extraerMensajeError } from '../api/erroresApi'
import { estadoListaInicial, type EstadoLista } from '../api/estadoLista'
import type { CrearSede, Sede } from '../../types/api'

export const listarSedes = createAsyncThunk<Sede[], void, { rejectValue: string }>(
  'sedes/listar',
  async (_, { rejectWithValue }) => {
    try {
      return await sedesService.listar()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearSede = createAsyncThunk<Sede, CrearSede, { rejectValue: string }>(
  'sedes/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await sedesService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const sedesSlice = createSlice({
  name: 'sedes',
  initialState: estadoListaInicial<Sede>(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarSedes.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(listarSedes.fulfilled, (state: EstadoLista<Sede>, action: PayloadAction<Sede[]>) => {
        state.cargando = false
        state.items = action.payload
      })
      .addCase(listarSedes.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudieron obtener las sedes'
      })

      .addCase(crearSede.fulfilled, (state: EstadoLista<Sede>, action: PayloadAction<Sede>) => {
        state.items.push(action.payload)
      })
      .addCase(crearSede.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear la sede'
      })
  },
})

export default sedesSlice.reducer
