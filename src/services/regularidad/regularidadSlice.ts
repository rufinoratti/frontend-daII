import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { regularidadService } from './regularidadService'
import { extraerMensajeError } from '../api/erroresApi'
import type { ResultadoRegularidad, ValidarRegularidad } from '../../types/api'

interface EstadoRegularidad {
  resultado: ResultadoRegularidad | null
  cargando: boolean
  error: string | null
}

const estadoInicial: EstadoRegularidad = { resultado: null, cargando: false, error: null }

export const validarRegularidad = createAsyncThunk<
  ResultadoRegularidad,
  ValidarRegularidad,
  { rejectValue: string }
>('regularidad/validar', async (datos, { rejectWithValue }) => {
  try {
    return await regularidadService.validar(datos)
  } catch (error) {
    return rejectWithValue(extraerMensajeError(error))
  }
})

const regularidadSlice = createSlice({
  name: 'regularidad',
  initialState: estadoInicial,
  reducers: {
    limpiarResultadoRegularidad: (state) => {
      state.resultado = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validarRegularidad.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(validarRegularidad.fulfilled, (state, action: PayloadAction<ResultadoRegularidad>) => {
        state.cargando = false
        state.resultado = action.payload
      })
      .addCase(validarRegularidad.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudo validar la regularidad'
      })
  },
})

export const { limpiarResultadoRegularidad } = regularidadSlice.actions
export default regularidadSlice.reducer
