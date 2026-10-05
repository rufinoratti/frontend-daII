import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import './CalendarDatePicker.css'

const nombresMeses = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })
const diasSemana = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

function parsearFecha(value: string) {
  if (!value) return null
  const [anio, mes, dia] = value.split('-').map(Number)
  if (!anio || !mes || !dia) return null
  return new Date(anio, mes - 1, dia)
}

function formatearFecha(fecha: Date) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

export function CalendarDatePicker({
  label,
  value,
  onChange,
  placeholder = 'Seleccioná una fecha',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [abierto, setAbierto] = useState(false)
  const [mesVisible, setMesVisible] = useState(() => {
    const seleccionada = parsearFecha(value)
    const fecha = seleccionada ?? new Date()
    return new Date(fecha.getFullYear(), fecha.getMonth(), 1)
  })
  const contenedor = useRef<HTMLDivElement>(null)
  const fechaSeleccionada = parsearFecha(value)
  const hoy = new Date()
  const primerDia = new Date(mesVisible.getFullYear(), mesVisible.getMonth(), 1)
  const desplazamiento = (primerDia.getDay() + 6) % 7
  const cantidadDias = new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 0).getDate()
  const celdas = Array.from({ length: 42 }, (_, index) => {
    const dia = index - desplazamiento + 1
    return dia > 0 && dia <= cantidadDias ? dia : null
  })

  useEffect(() => {
    if (!abierto) return
    const cerrarAlHacerClickAfuera = (event: MouseEvent) => {
      if (!contenedor.current?.contains(event.target as Node)) setAbierto(false)
    }
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('mousedown', cerrarAlHacerClickAfuera)
    document.addEventListener('keydown', cerrarConEscape)
    return () => {
      document.removeEventListener('mousedown', cerrarAlHacerClickAfuera)
      document.removeEventListener('keydown', cerrarConEscape)
    }
  }, [abierto])

  const abrir = () => {
    const seleccionada = parsearFecha(value)
    const fecha = seleccionada ?? new Date()
    setMesVisible(new Date(fecha.getFullYear(), fecha.getMonth(), 1))
    setAbierto((actual) => !actual)
  }

  return (
    <div className="calendar-picker" ref={contenedor}>
      <span className="calendar-picker__label">{label}</span>
      <button
        className="calendar-picker__trigger"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={abierto}
        aria-label={`${label}: ${fechaSeleccionada ? fechaSeleccionada.toLocaleDateString('es-AR') : placeholder}`}
        onClick={abrir}
      >
        <span>{fechaSeleccionada ? fechaSeleccionada.toLocaleDateString('es-AR') : placeholder}</span>
        <CalendarBlank size={18} aria-hidden="true" />
      </button>
      {abierto && (
        <div className="calendar-picker__popover" role="dialog" aria-label="Elegir fecha">
          <div className="calendar-picker__header">
            <button
              type="button"
              aria-label="Mes anterior"
              onClick={() => setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() - 1, 1))}
            >
              <CaretLeft size={18} />
            </button>
            <strong>{nombresMeses.format(mesVisible)}</strong>
            <button
              type="button"
              aria-label="Mes siguiente"
              onClick={() => setMesVisible(new Date(mesVisible.getFullYear(), mesVisible.getMonth() + 1, 1))}
            >
              <CaretRight size={18} />
            </button>
          </div>
          <div className="calendar-picker__grid" role="grid">
            {diasSemana.map((dia) => <span className="calendar-picker__weekday" key={dia}>{dia}</span>)}
            {celdas.map((dia, index) => {
              if (dia === null) return <span className="calendar-picker__empty" key={`empty-${index}`} />
              const fecha = new Date(mesVisible.getFullYear(), mesVisible.getMonth(), dia)
              const seleccionada = Boolean(fechaSeleccionada && formatearFecha(fecha) === value)
              const esHoy = formatearFecha(fecha) === formatearFecha(hoy)
              return (
                <button
                  className={`calendar-picker__day${seleccionada ? ' is-selected' : ''}${esHoy ? ' is-today' : ''}`}
                  type="button"
                  role="gridcell"
                  aria-label={fecha.toLocaleDateString('es-AR', { dateStyle: 'full' })}
                  aria-selected={seleccionada}
                  key={dia}
                  onClick={() => {
                    onChange(formatearFecha(fecha))
                    setAbierto(false)
                  }}
                >
                  {dia}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
