import { LayoutGeneral } from './assets/componentesGenerales/Layout/LayoutGeneral'
import { ContenedorVistaTabla } from './assets/componentesGenerales/Layout/ContenedorVistaTabla'
import { ContenedorMediano } from './assets/componentesGenerales/Genericos/Contenedores'
import { H1Generico, TxtGenerico } from './assets/componentesGenerales/Genericos/Textos'
import prospectos from './assets/Data.json'
import './App.css'

function formatearFecha(fecha) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(fecha))
}

function App() {
  const activos = prospectos.filter((prospecto) => prospecto.estadoLogico).length
  const canales = new Set(prospectos.map((prospecto) => prospecto.canal)).size

  return (
    <LayoutGeneral>
      <header className="app-header">
        <div>
          <span className="app-kicker">Componentes generales</span>
          <H1Generico margin="4px 0 0">Prospectos</H1Generico>
        </div>
        <span className="status"><i /> Datos cargados</span>
      </header>

      <main className="app-main">
        <ContenedorMediano>
          <section className="record-summary" aria-label="Resumen de prospectos">
            <div><span>Total</span><strong>{prospectos.length} prospectos</strong></div>
            <div><span>Activos</span><strong className="active">{activos}</strong></div>
            <div><span>Inactivos</span><strong className="inactive">{prospectos.length - activos}</strong></div>
            <div><span>Canales</span><strong>{canales}</strong></div>
          </section>

          <ContenedorVistaTabla className="table-view">
            <div className="panel-header">
              <div>
                <TxtGenerico size="20px">Listado de prospectos</TxtGenerico>
                <span>Información obtenida desde Data.json</span>
              </div>
              <strong>{prospectos.length}</strong>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Cliente</th>
                    <th>Contacto</th>
                    <th>Canal</th>
                    <th>Mensaje</th>
                    <th>Responsable</th>
                    <th>Actualizado</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {prospectos.map((prospecto) => (
                    <tr key={prospecto.folio}>
                      <td><code>{prospecto.folio}</code></td>
                      <td className="field-name">{prospecto.cliente}</td>
                      <td>{prospecto.telefono}</td>
                      <td>{prospecto.canal}</td>
                      <td className="message-cell" title={prospecto.mensaje}>{prospecto.mensaje}</td>
                      <td>
                        <span className="responsible">{prospecto.creadoPor.nombres}</span>
                        <small>{prospecto.creadoPor.correo}</small>
                      </td>
                      <td>{formatearFecha(prospecto.actualizado)}</td>
                      <td>
                        <span className={`state ${prospecto.estadoLogico ? 'state-active' : 'state-inactive'}`}>
                          {prospecto.estadoLogico ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContenedorVistaTabla>

          <footer className="data-source">
            <span>Fuente de datos</span>
            <code>src/assets/Data.json</code>
          </footer>
        </ContenedorMediano>
      </main>
    </LayoutGeneral>
  )
}

export default App
