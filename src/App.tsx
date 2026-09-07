import { useAppSelector } from './app/hooks'
import { esUsuarioDemo } from './app/modoDemo'
import { LoginView } from './features/auth/LoginView'
import AppMock from './AppMock'
import AppReal from './AppReal'
import './index.css'

function App() {
  const { actual, verificandoSesion } = useAppSelector((state) => state.usuarios)

  if (verificandoSesion) return <div className="auth-shell"><p className="muted-copy">Cargando sesión...</p></div>
  if (!actual) return <LoginView />
  return esUsuarioDemo(actual) ? <AppMock /> : <AppReal />
}

export default App
