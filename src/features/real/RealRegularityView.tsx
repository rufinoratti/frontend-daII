import { Check, CheckCircle, ClipboardText, WarningCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { validarRegularidad } from '../../services/regularidad/regularidadSlice'

export function RealRegularityView({ onNotify }: { onNotify: (value: string) => void }) {
  const dispatch = useAppDispatch()
  const { resultado, cargando, error } = useAppSelector((state) => state.regularidad)
  const [asistencia, setAsistencia] = useState('80')
  const [promedio, setPromedio] = useState('7')
  const [asistenciaMinima, setAsistenciaMinima] = useState('75')
  const [promedioMinimo, setPromedioMinimo] = useState('6')

  const validar = async () => {
    const resultadoAccion = await dispatch(validarRegularidad({
      asistencia: Number(asistencia),
      promedio: Number(promedio),
      asistenciaMinima: Number(asistenciaMinima),
      promedioMinimo: Number(promedioMinimo),
    }))
    if (validarRegularidad.fulfilled.match(resultadoAccion)) onNotify('Validación completada')
  }

  return <div className="regularity-layout">
    <article className="panel validation-card">
      <div className="form-kicker">MOTOR DE VALIDACIÓN</div>
      <h2>¿Puede rendir el final?</h2>
      <p>Ingresá los valores de la cursada y los mínimos exigidos para comprobar la regularidad.</p>
      {error && <div className="form-error summary" role="alert"><WarningCircle size={15} /> {error}</div>}
      <div className="form-grid">
        <label>Asistencia registrada (%)<input value={asistencia} onChange={(e) => setAsistencia(e.target.value)} type="number" min="0" max="100" /></label>
        <label>Promedio de cursada<input value={promedio} onChange={(e) => setPromedio(e.target.value)} type="number" min="0" max="10" step=".1" /></label>
        <label>Asistencia mínima exigida (%)<input value={asistenciaMinima} onChange={(e) => setAsistenciaMinima(e.target.value)} type="number" min="0" max="100" /></label>
        <label>Promedio mínimo exigido<input value={promedioMinimo} onChange={(e) => setPromedioMinimo(e.target.value)} type="number" min="0" max="10" step=".1" /></label>
      </div>
      <button className="primary-button" onClick={validar} disabled={cargando}><Check size={17} /> {cargando ? 'Validando...' : 'Validar regularidad'}</button>
    </article>
    <article className={`panel result-card ${resultado ? (resultado.habilitadoParaFinal ? 'approved' : 'rejected') : ''}`}>
      <div className="result-icon">{resultado ? (resultado.habilitadoParaFinal ? <CheckCircle size={28} weight="fill" /> : <WarningCircle size={28} weight="fill" />) : <ClipboardText size={28} />}</div>
      <span className="result-label">RESULTADO</span>
      <h2>{resultado ? (resultado.habilitadoParaFinal ? 'Habilitado para rendir' : 'No cumple las condiciones') : 'Esperando validación'}</h2>
      {resultado ? (
        resultado.motivos.length > 0
          ? <ul>{resultado.motivos.map((motivo) => <li key={motivo}>{motivo}</li>)}</ul>
          : <p>La asistencia y el promedio superan los mínimos configurados.</p>
      ) : <p>El resultado aparecerá después de completar los datos.</p>}
    </article>
  </div>
}
