import filtrosTexto from './assets/filtros.txt?raw'

const PUNTOS_POR_COINCIDENCIA = 10

function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function obtenerPalabrasClave() {
  return filtrosTexto
    .split('\n')
    .map((filtro) => normalizar(filtro.trim()))
    .filter(Boolean)
}

export function analizarProspectos(prospectos) {
  const palabrasClave = obtenerPalabrasClave()
  let coincidencias = 0

  const datos = prospectos.map((prospecto) => {
    const mensaje = normalizar(prospecto.mensaje)
    const coincidenciasMensaje = palabrasClave.filter((palabra) => mensaje.includes(palabra)).length

    coincidencias += coincidenciasMensaje

    return {
      ...prospecto,
      lead: coincidenciasMensaje * PUNTOS_POR_COINCIDENCIA,
    }
  })

  return { datos, coincidencias }
}
