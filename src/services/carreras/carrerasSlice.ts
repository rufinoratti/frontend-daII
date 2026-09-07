import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { carrerasService } from './carrerasService'
import { extraerMensajeError } from '../api/erroresApi'
import { estadoListaInicial, type EstadoLista } from '../api/estadoLista'
import type { Carrera, CrearCarrera } from '../../types/api'

export const listarCarreras = createAsyncThunk<Carrera[], void, { rejectValue: string }>(
  'carreras/listar',
  async (_, { rejectWithValue }) => {
    try {
      return await carrerasService.listar()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearCarrera = createAsyncThunk<Carrera, CrearCarrera, { rejectValue: string }>(
  'carreras/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await carrerasService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const actualizarCarrera = createAsyncThunk<
  Carrera,
  { id: number; datos: CrearCarrera },
  { rejectValue: string }
>('carreras/actualizar', async ({ id, datos }, { rejectWithValue }) => {
  try {
    return await carrerasService.actualizar(id, datos)
  } catch (error) {
    return rejectWithValue(extraerMensajeError(error))
  }
})

export const desactivarCarrera = createAsyncThunk<number, number, { rejectValue: string }>(
  'carreras/desactivar',
  async (id, { rejectWithValue }) => {
    try {
      await carrerasService.desactivar(id)
      return id
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const carrerasSlice = createSlice({
  name: 'carreras',
  initialState: estadoListaInicial<Carrera>(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarCarreras.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(listarCarreras.fulfilled, (state: EstadoLista<Carrera>, action: PayloadAction<Carrera[]>) => {
        state.cargando = false
        state.items = action.payload
      })
      .addCase(listarCarreras.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudieron obtener las carreras'
      })

      .addCase(crearCarrera.fulfilled, (state: EstadoLista<Carrera>, action: PayloadAction<Carrera>) => {
        state.items.push(action.payload)
      })
      .addCase(crearCarrera.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear la carrera'
      })

      .addCase(actualizarCarrera.fulfilled, (state: EstadoLista<Carrera>, action: PayloadAction<Carrera>) => {
        const indice = state.items.findIndex((carrera) => carrera.id === action.payload.id)
        if (indice !== -1) state.items[indice] = action.payload
      })
      .addCase(actualizarCarrera.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo actualizar la carrera'
      })

      .addCase(desactivarCarrera.fulfilled, (state: EstadoLista<Carrera>, action: PayloadAction<number>) => {
        const carrera = state.items.find((item) => item.id === action.payload)
        if (carrera) carrera.estado = 'INACTIVA'
      })
      .addCase(desactivarCarrera.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo desactivar la carrera'
      })
  },
})

export default carrerasSlice.reducer
