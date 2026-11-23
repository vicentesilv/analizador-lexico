import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Plantillas genéricas para cuestionarios
const ContenedorPrincipal = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ContenedorDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TarjetaIndicador = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TituloIndicador = styled.span`
    color: #666;
    font-size: 14px;
    font-weight: 600;
`;

const ValorIndicador = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  border-bottom: ${props => props.$colorLinea ? `3px solid ${props.$colorLinea}` : 'none'};
  padding-bottom: 5px;
  width: fit-content;
`;

const Subtexto = styled.span`
  font-size: 16px;
  color: #888;
`;

const TarjetaPregunta = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FilaEtiquetas = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Etiqueta = styled.span`
  background-color: ${props => props.$bg || '#f0f0f0'};
  color: ${props => props.$color || '#333'};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
`;

const TextoPregunta = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const InputURL = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

const ContenedorBotones = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const BotonOpcion = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.$active ? props.$activeColor : '#ddd'};
  background-color: ${props => props.$active ? props.$activeColor : 'white'};
  color: ${props => props.$active ? '#000' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$activeColor};
  }
`;

// Opciones por defecto (compatibilidad con catálogos sin "opciones")
export const OPCIONES_POR_DEFECTO = [
  { valor: 0, etiqueta: "No cumple - 0", color: "#FFCDD2" },
  { valor: 5, etiqueta: "Cumple parcial - 5", color: "#FFE0B2" },
  { valor: 10, etiqueta: "Cumple total - 10", color: "#C8E6C9" },
];

// Normaliza las opciones de una pregunta: acepta arreglo de
// { valor, etiqueta, color } o arreglo simple [0, 5, 10]
export const resolverOpciones = (pregunta) => {
  if (!pregunta?.opciones || pregunta.opciones.length === 0) return OPCIONES_POR_DEFECTO;
  if (typeof pregunta.opciones[0] === "number") {
    return pregunta.opciones.map((v) => ({ valor: v, etiqueta: String(v), color: "#E3F2FD" }));
  }
  return pregunta.opciones;
};

export const valorMaximoPregunta = (pregunta) => {
  const ops = resolverOpciones(pregunta);
  return Math.max(...ops.map((o) => Number(o.valor) || 0), 1);
};

export const PlantillaCuestionario = ({ 
  preguntas = [], 
  respuestasGuardadas = {}, 
  onRespuestasChange,
  soloLectura = false,
}) => {
  const [respuestas, setRespuestas] = useState(respuestasGuardadas);

  // Sincroniza cuando el padre (Formik/borrador/Firebase) cambia las respuestas
  const respuestasGuardadasKey = JSON.stringify(respuestasGuardadas || {});
  useEffect(() => {
    setRespuestas(JSON.parse(respuestasGuardadasKey));
  }, [respuestasGuardadasKey]);

  const actualizarRespuesta = (preguntaId, campo, valor) => {
    const nuevasRespuestas = {
      ...respuestas,
      [preguntaId]: {
        ...respuestas[preguntaId],
        [campo]: valor
      }
    };
    
    setRespuestas(nuevasRespuestas);
    if (onRespuestasChange) onRespuestasChange(nuevasRespuestas);
  };

  const handleToggleValor = (preguntaId, valorClickeado) => {
    const valorActual = respuestas[preguntaId]?.valor;
    if (valorActual === valorClickeado) {
      actualizarRespuesta(preguntaId, 'valor', undefined);
    } else {
      actualizarRespuesta(preguntaId, 'valor', valorClickeado);
    }
  };

  const totalPreguntas = preguntas.length;
  
  const preguntasRespondidas = preguntas.filter(
    (p) => respuestas[p.id]?.valor !== undefined
  ).length;

  // Ponderada normalizada a /10 aunque cada pregunta tenga escala distinta:
  // aporte = (valor / maxPregunta) * peso * 10. Con escala 0-10 y pesos=1 es igual al cálculo anterior.
  const calificacionPonderada = preguntas.reduce((suma, p) => {
    const valorSeleccionado = Number(respuestas[p.id]?.valor ?? 0);
    const pesoEnCodigo = Number(p.peso) || 0;
    const max = valorMaximoPregunta(p);
    return suma + ((valorSeleccionado / max) * pesoEnCodigo * 10);
  }, 0);

  if (totalPreguntas === 0) {
    return <ContenedorPrincipal>No hay preguntas configuradas para esta sección.</ContenedorPrincipal>;
  }

  return (
    <ContenedorPrincipal>
      <ContenedorDashboard>
        <TarjetaIndicador>
          <TituloIndicador>Preguntas respondidas</TituloIndicador>
          <ValorIndicador $colorLinea="#2196F3">
            {preguntasRespondidas} <Subtexto>/ {totalPreguntas}</Subtexto>
          </ValorIndicador>
        </TarjetaIndicador>

        <TarjetaIndicador>
          <TituloIndicador>Calificación técnica</TituloIndicador>
          <ValorIndicador>
            {calificacionPonderada.toFixed(1)} <Subtexto>/ 10</Subtexto>
          </ValorIndicador>
        </TarjetaIndicador>
      </ContenedorDashboard>

      {preguntas.map((pregunta) => {
        const respuestaActual = respuestas[pregunta.id] || {};
        const opciones = resolverOpciones(pregunta);

        return (
          <TarjetaPregunta key={pregunta.id}>
            <FilaEtiquetas>
              <Etiqueta>ID: {pregunta.id}</Etiqueta>
              <Etiqueta $bg="#E3F2FD" $color="#1976D2">{pregunta.categoria}</Etiqueta>
              {pregunta.tipo ? <Etiqueta $bg="#F3E5F5" $color="#6A1B9A">{pregunta.tipo}</Etiqueta> : null}
            </FilaEtiquetas>

            <TextoPregunta>{pregunta.texto}</TextoPregunta>

            <TextArea
              placeholder="Observación o evidencia registrada por el evaluador"
              value={respuestaActual.observacion || ""}
              disabled={soloLectura}
              onChange={(e) => actualizarRespuesta(pregunta.id, 'observacion', e.target.value)}
            />

            <ContenedorBotones>
              {opciones.map((op) => (
                <BotonOpcion
                  key={`${pregunta.id}-${op.valor}`}
                  type="button"
                  disabled={soloLectura}
                  $active={respuestaActual.valor === op.valor}
                  $activeColor={op.color || "#E3F2FD"}
                  onClick={() => handleToggleValor(pregunta.id, op.valor)}
                >
                  {op.etiqueta}
                </BotonOpcion>
              ))}
            </ContenedorBotones>

            <InputURL
              placeholder="Incluir la URL del documento evidencia"
              value={respuestaActual.url || ""}
              disabled={soloLectura}
              onChange={(e) => actualizarRespuesta(pregunta.id, 'url', e.target.value)}
            />
          </TarjetaPregunta>
        );
      })}
    </ContenedorPrincipal>
  );
};