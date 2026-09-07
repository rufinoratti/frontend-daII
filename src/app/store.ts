import { configureStore } from '@reduxjs/toolkit'
import usuariosReducer, { obtenerUsuarioActual } from '../services/usuarios/usuariosSlice'
import carrerasReducer from '../services/carreras/carrerasSlice'
import planesEstudioReducer from '../services/planesEstudio/planesEstudioSlice'
import asignaturasReducer from '../services/asignaturas/asignaturasSlice'
import correlatividadesReducer from '../services/correlatividades/correlatividadesSlice'
import sedesReducer from '../services/sedes/sedesSlice'
import aulasReducer from '../services/aulas/aulasSlice'
import asignacionesReducer from '../services/asignaciones/asignacionesSlice'
import periodosReducer from '../services/periodos/periodosSlice'
import turnosExamenReducer from '../services/turnosExamen/turnosExamenSlice'
import regularidadReducer from '../services/regularidad/regularidadSlice'

export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    carreras: carrerasReducer,
    planesEstudio: planesEstudioReducer,
    asignaturas: asignaturasReducer,
    correlatividades: correlatividadesReducer,
    sedes: sedesReducer,
    aulas: aulasReducer,
    asignaciones: asignacionesReducer,
    periodos: periodosReducer,
    turnosExamen: turnosExamenReducer,
    regularidad: regularidadReducer,
  },
})

// El backend autentica por cookie de sesion, no por token: la cookie ya la
// tiene el navegador (si el usuario logueo antes), pero Redux arranca vacio
// en cada carga de pagina. Esta llamada reconstruye el estado "logueado" a
// partir de esa cookie sin pedirle credenciales de nuevo al usuario.
store.dispatch(obtenerUsuarioActual())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
