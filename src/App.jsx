import { useState } from 'react'
import prospectos from './assets/Data.json'
import filtrosTexto from './assets/filtros.txt?raw'
import './App.css'

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(fecha))
}

const columnas = [
  { field: 'folio', headerName: 'Folio', renderCell: ({ value }) => <code>{value}</code> },
  { field: 'cliente', headerName: 'Cliente', className: 'field-name' },
  { field: 'telefono', headerName: 'Contacto' },
  { field: 'canal', headerName: 'Canal' },
  {
    field: 'mensaje',
    headerName: 'Mensaje',
    className: 'message-cell',
    renderCell: ({ value }) => <span title={value}>{value}</span>,
  },
  {
    field: 'creadoPor',
    headerName: 'Responsable',
    renderCell: ({ value }) => (
      <>
        <span className="responsible">{value.nombres}</span>
        <small>{value.correo}</small>
      </>
    ),
  },
  { field: 'actualizado', headerName: 'Actualizado', renderCell: ({ value }) => formatearFecha(value) },
  {
    field: 'lead',
    headerName: 'Lead',
    renderCell: ({ value }) => (
      <span className={`state ${Number(value) > 0 ? 'state-lead' : 'state-neutral'}`}>
        {typeof value === 'number' ? `${value} puntos` : value ? 'Sí' : 'No'}
      </span>
    ),
  },
  {
    field: 'estadoLogico',
    headerName: 'Estado',
    renderCell: ({ value }) => (
      <span className={`state ${value ? 'state-active' : 'state-inactive'}`}>{value ? 'Activo' : 'Inactivo'}</span>
    ),
  },
]

function App() {
  const [datos, setDatos] = useState(prospectos)
  const [resultado, setResultado] = useState(null)

  const normalizar = (texto) => texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  const analizarMensajes = () => {
    const palabrasClave = filtrosTexto
      .split('\n')
      .map((filtro) => normalizar(filtro.trim()))
      .filter(Boolean)

    let coincidencias = 0
    const datosAnalizados = datos.map((prospecto) => {
      const mensaje = normalizar(prospecto.mensaje || '')
      const coincidenciasMensaje = palabrasClave.filter((palabra) => mensaje.includes(palabra)).length
      coincidencias += coincidenciasMensaje
      return { ...prospecto, lead: coincidenciasMensaje * 10 }
    })

    setDatos(datosAnalizados)
    setResultado(coincidencias)
  }

  return (
    <div className="app-layout">
      <main className="app-main">
        <div className="content-container">
          <section className="table-view">
            <div className="panel-header">
              <div className="title-group">
                <h1>Prospectos</h1>
                {resultado !== null && <span>{resultado} palabras clave encontradas</span>}
              </div>
              <button className="analyze-button" type="button" onClick={analizarMensajes}>
                Analizar mensajes
              </button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {columnas.map((columna) => <th key={columna.field}>{columna.headerName}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {datos.map((prospecto) => (
                    <tr key={prospecto.folio}>
                      {columnas.map((columna) => (
                        <td key={columna.field} className={columna.className}>
                          {columna.renderCell
                            ? columna.renderCell({ value: prospecto[columna.field] })
                            : prospecto[columna.field]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="data-source">
            <span>Fuente de datos</span>
            <code>src/assets/Data.json</code>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
