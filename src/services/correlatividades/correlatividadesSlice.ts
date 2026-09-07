import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { correlatividadesService } from './correlatividadesService'
import { extraerMensajeError } from '../api/erroresApi'
import { estadoListaInicial, type EstadoLista } from '../api/estadoLista'
import type { Correlatividad, CrearCorrelatividad } from '../../types/api'

export const listarCorrelatividades = createAsyncThunk<Correlatividad[], number, { rejectValue: string }>(
  'correlatividades/listar',
  async (asignaturaId, { rejectWithValue }) => {
    try {
      return await correlatividadesService.listar(asignaturaId)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearCorrelatividad = createAsyncThunk<
  Correlatividad,
  { asignaturaId: number; datos: CrearCorrelatividad },
  { rejectValue: string }
>('correlatividades/crear', async ({ asignaturaId, datos }, { rejectWithValue }) => {
  try {
    return await correlatividadesService.crear(asignaturaId, datos)
  } catch (error) {
    return rejectWithValue(extraerMensajeError(error))
  }
})

const correlatividadesSlice = createSlice({
  name: 'correlatividades',
  initialState: estadoListaInicial<Correlatividad>(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarCorrelatividades.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(
        listarCorrelatividades.fulfilled,
        (state: EstadoLista<Correlatividad>, action: PayloadAction<Correlatividad[]>) => {
          state.cargando = false
          state.items = action.payload
        },
      )
      .addCase(listarCorrelatividades.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudieron obtener las correlatividades'
      })

      .addCase(
        crearCorrelatividad.fulfilled,
        (state: EstadoLista<Correlatividad>, action: PayloadAction<Correlatividad>) => {
          state.items.push(action.payload)
        },
      )
      .addCase(crearCorrelatividad.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo agregar la correlatividad'
      })
  },
})

export default correlatividadesSlice.reducer
