import { Check, CheckCircle, ClipboardText, WarningCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { MockTag } from '../../components/ui/MockTag'

export function RegularityView({ onNotify }: { onNotify: (value: string) => void }) {
  const [attendance, setAttendance] = useState('80')
  const [average, setAverage] = useState('7')
  const [result, setResult] = useState<'idle' | 'approved' | 'rejected'>('idle')

  const validate = () => {
    setResult(Number(attendance) >= 75 && Number(average) >= 6 ? 'approved' : 'rejected')
    onNotify('Validación completada')
  }

  return <div className="regularity-layout"><article className="panel validation-card"><div className="form-kicker">MOTOR DE VALIDACIÓN <MockTag /></div><h2>¿Puede rendir el final?</h2><p>Ingresá los valores de la cursada para comprobar si cumple los requisitos de regularidad.</p><div className="form-grid"><label>Asistencia registrada<input value={attendance} onChange={(event) => setAttendance(event.target.value)} type="number" min="0" max="100" /><small>Mínimo requerido: 75%</small></label><label>Promedio de cursada<input value={average} onChange={(event) => setAverage(event.target.value)} type="number" min="0" max="10" step=".1" /><small>Mínimo requerido: 6</small></label></div><button className="primary-button" onClick={validate}><Check size={17} /> Validar regularidad</button></article><article className={`panel result-card ${result}`}><div className="result-icon">{result === 'approved' ? <CheckCircle size={28} weight="fill" /> : result === 'rejected' ? <WarningCircle size={28} weight="fill" /> : <ClipboardText size={28} />}</div><span className="result-label">RESULTADO</span><h2>{result === 'approved' ? 'Habilitado para rendir' : result === 'rejected' ? 'No cumple las condiciones' : 'Esperando validación'}</h2><p>{result === 'approved' ? 'La asistencia y el promedio superan los mínimos configurados.' : result === 'rejected' ? 'Revisá los valores ingresados y consultá la situación de la materia.' : 'El resultado aparecerá después de completar los datos.'}</p>{result !== 'idle' && <div className="result-values"><span>Asistencia <strong>{attendance}%</strong></span><span>Promedio <strong>{average}</strong></span></div>}</article></div>
}
