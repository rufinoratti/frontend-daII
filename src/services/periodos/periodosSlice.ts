import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { periodosService } from './periodosService'
import { extraerMensajeError } from '../api/erroresApi'
import { estadoListaInicial, type EstadoLista } from '../api/estadoLista'
import type { CrearPeriodoAcademico, PeriodoAcademico } from '../../types/api'

export const listarPeriodos = createAsyncThunk<PeriodoAcademico[], void, { rejectValue: string }>(
  'periodos/listar',
  async (_, { rejectWithValue }) => {
    try {
      return await periodosService.listar()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearPeriodo = createAsyncThunk<PeriodoAcademico, CrearPeriodoAcademico, { rejectValue: string }>(
  'periodos/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await periodosService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const periodosSlice = createSlice({
  name: 'periodos',
  initialState: estadoListaInicial<PeriodoAcademico>(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarPeriodos.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(
        listarPeriodos.fulfilled,
        (state: EstadoLista<PeriodoAcademico>, action: PayloadAction<PeriodoAcademico[]>) => {
          state.cargando = false
          state.items = action.payload
        },
      )
      .addCase(listarPeriodos.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudieron obtener los periodos'
      })

      .addCase(crearPeriodo.fulfilled, (state: EstadoLista<PeriodoAcademico>, action: PayloadAction<PeriodoAcademico>) => {
        state.items.push(action.payload)
      })
      .addCase(crearPeriodo.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear el periodo'
      })
  },
})

export default periodosSlice.reducer
