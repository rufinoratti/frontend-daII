import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { usuariosService } from './usuariosService'
import { refrescarAccessToken } from '../api/authAxios'
import { extraerMensajeError } from '../api/erroresApi'
import type { CrearUsuario, LoginUsuario, Usuario } from '../../types/api'

interface EstadoUsuario {
  actual: Usuario | null
  listado: Usuario[]
  verificandoSesion: boolean
  cargando: boolean
  error: string | null
}

const estadoInicial: EstadoUsuario = {
  actual: null,
  listado: [],
  verificandoSesion: true,
  cargando: false,
  error: null,
}

export const iniciarSesion = createAsyncThunk<Usuario, LoginUsuario, { rejectValue: string }>(
  'usuarios/iniciarSesion',
  async (datos, { rejectWithValue }) => {
    try {
      return await usuariosService.login(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error, 'Email o contrasena incorrectos'))
    }
  },
)

export const cerrarSesion = createAsyncThunk<void, void, { rejectValue: string }>(
  'usuarios/cerrarSesion',
  async (_, { rejectWithValue }) => {
    try {
      await usuariosService.logout()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

// Se dispara una vez al arrancar la app (ver app/store.ts) para saber si la
// cookie de sesion que ya tiene el navegador todavia es valida, sin pedirle
// al usuario que vuelva a loguearse en cada recarga de pagina.
export const obtenerUsuarioActual = createAsyncThunk<Usuario, void, { rejectValue: string }>(
  'usuarios/obtenerActual',
  async (_, { rejectWithValue }) => {
    try {
      await refrescarAccessToken()
      return await usuariosService.actual()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const crearUsuario = createAsyncThunk<Usuario, CrearUsuario, { rejectValue: string }>(
  'usuarios/crear',
  async (datos, { rejectWithValue }) => {
    try {
      return await usuariosService.crear(datos)
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

export const listarUsuarios = createAsyncThunk<Usuario[], void, { rejectValue: string }>(
  'usuarios/listar',
  async (_, { rejectWithValue }) => {
    try {
      return await usuariosService.listar()
    } catch (error) {
      return rejectWithValue(extraerMensajeError(error))
    }
  },
)

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: estadoInicial,
  reducers: {
    limpiarErrorUsuario: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(iniciarSesion.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(iniciarSesion.fulfilled, (state, action: PayloadAction<Usuario>) => {
        state.cargando = false
        state.actual = action.payload
      })
      .addCase(iniciarSesion.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudo iniciar sesion'
      })

      .addCase(cerrarSesion.fulfilled, (state) => {
        state.actual = null
      })

      .addCase(obtenerUsuarioActual.pending, (state) => {
        state.verificandoSesion = true
      })
      .addCase(obtenerUsuarioActual.fulfilled, (state, action: PayloadAction<Usuario>) => {
        state.verificandoSesion = false
        state.actual = action.payload
      })
      .addCase(obtenerUsuarioActual.rejected, (state) => {
        // No habia sesion activa (401) o fallo la consulta: seguimos como no
        // logueados, sin mostrar esto como un error visible al usuario.
        state.verificandoSesion = false
        state.actual = null
      })

      .addCase(crearUsuario.fulfilled, (state, action: PayloadAction<Usuario>) => {
        state.listado.push(action.payload)
      })
      .addCase(crearUsuario.rejected, (state, action) => {
        state.error = action.payload ?? 'No se pudo crear el usuario'
      })

      .addCase(listarUsuarios.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(listarUsuarios.fulfilled, (state, action: PayloadAction<Usuario[]>) => {
        state.cargando = false
        state.listado = action.payload
      })
      .addCase(listarUsuarios.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload ?? 'No se pudo obtener el listado de usuarios'
      })
  },
})

export const { limpiarErrorUsuario } = usuariosSlice.actions
export default usuariosSlice.reducer
