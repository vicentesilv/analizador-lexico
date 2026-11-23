import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaClock, FaEllipsisV, FaExclamationTriangle, FaHistory, FaRegCheckCircle } from "react-icons/fa";
import { CheckListItem } from "../Formularios/FormulariosV1";
import { LabelMenuPrincipal } from "./LabelCircular";
import { AcordeonItem, ContenedorVistaEspecifica } from "./AcordeonEtapas";
import { useMediaQuery } from "@mui/material";
import { ModalGenericoV2 } from "./ModalGenericoV2";

const ContenedorInfoProveedor = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columnas = 4 }) => Math.min($columnas, 4)}, minmax(0, 1fr));
  gap: 20px;
  padding: 15px 0 10px 0;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(${({ $columnas = 4 }) => Math.min($columnas, 3)}, minmax(0, 1fr));
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(${({ $columnas = 4 }) => Math.min($columnas, 2)}, minmax(0, 1fr));
  }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 12px; }
`;
const ContenedorEtapas = styled.div`
  display: flex; flex-direction: column; gap: 10px;
`;
const CheckRow = styled.div`
  display: flex; align-items: center; gap: 8px;
`;
const TextoCheck = styled.span`
  font-size: 16px; color: var(--colorPrincipal); width: 100%; cursor: pointer; transition: all 0.2s ease;
  &:hover { text-decoration: underline; opacity: 0.8; }
`;

const BarraInfoVal = styled.div`
  width: 100%;
  height: 65px;
  min-height: 65px;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 20px 0;
  background: var(--colorPrincipal);
  color: var(--colorContrastePrincipal);
  border-radius: 15px;

`;
const FolioVisita = styled.span`font-size: 15px; white-space: nowrap;`;
const CampoVisita = styled.span`
  width: 132px;
  height: 28px;
  border: 1px solid #737373;
  border-radius: 2px;
  flex-shrink: 1;
`;
const ProgresoTiempo = styled.div`
  flex: 1;
  min-width: 80px;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #e3e7ec;
`;
const ProgresoTiempoRelleno = styled.span`
  display: block;
  width: ${({ $porcentaje }) => `${$porcentaje}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease, background-color 0.3s ease;
`;
const FechaVisita = styled.span`font-size: 15px; white-space: nowrap; margin-left: auto;`;
const IconoBarra = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${({ $accent }) => $accent ? "#e4b000" : "#111"};
  font-size: 22px;
  flex-shrink: 0;
`;
const IconoEstatusTiempo = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${({ $color }) => $color};
  font-size: 22px;
  flex-shrink: 0;
`;
const IconoAlertaTiempo = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ef553f;
  font-size: 22px;
  flex-shrink: 0;
`;
const AlertaTiempo = styled(FaExclamationTriangle)`
  position: absolute;
  right: -6px;
  bottom: -5px;
  font-size: 12px;
  background: #fff;
  border-radius: 50%;
`;
const ResumenValuacion = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;
const ResumenDato = styled.div`
  padding: 12px 10px;
  border: 1px solid #d5dbe3;
  border-radius: 8px;
  background: #f8fbff;
  text-align: center;
`;
const ResumenEtiqueta = styled.div`
  color: #64748b;
  font-size: 12px;
  margin-bottom: 4px;
`;
const ResumenValor = styled.div`
  color: #02142a;
  font-size: 16px;
  font-weight: 700;
`;

export const VistaEspecificaGenerica = ({
  fila1,
  fila2,
  fila3,
  etapasConfiguradas,
  acordeonesAbiertos,
  progresoTiempo,
  onToggleAcordeon,
  onCheckClick,
  onTextClick
}) => {
  const esMovil = useMediaQuery("(max-width:768px)");
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const datoPorEtiqueta = (etiquetas, fallback = "No especificado") => {
    const filas = [...(fila1 || []), ...(fila2 || []), ...(fila3 || [])];
    const campo = filas.find(({ txt }) => etiquetas.includes(txt));
    return campo?.value ?? fallback;
  };
  return (
    <ContenedorVistaEspecifica>
      { !esMovil ? (
        <>
          {fila1?.length > 0 && (
            <ContenedorInfoProveedor $columnas={fila1.length}>
              {fila1.map((label, idx) => (
                <LabelMenuPrincipal
                  key={idx}
                  txt={label.txt}
                  value={label.value}
                  color={label.color}
                  colorSecundario={label.colorSecundario}
                />
              ))}
            </ContenedorInfoProveedor>
          )}
          {fila2?.length > 0 && (
            <ContenedorInfoProveedor $columnas={fila2.length}>
              {fila2.map((label, idx) => (
                <LabelMenuPrincipal
                  key={idx}
                  txt={label.txt}
                  value={label.value}
                  color={label.color}
                  colorSecundario={label.colorSecundario}
                />
              ))}
            </ContenedorInfoProveedor>
          )}
          {fila3?.length > 0 && (
            <ContenedorInfoProveedor $columnas={fila3.length}>
              {fila3.map((label, idx) => (
                <LabelMenuPrincipal
                  key={idx}
                  txt={label.txt}
                  value={label.value}
                  color={label.color}
                  colorSecundario={label.colorSecundario}
                />
              ))}
            </ContenedorInfoProveedor>
          )}
        </>
      ) : (
        <BarraInfoVal>
          {progresoTiempo ? (
            <>
              <FolioVisita aria-label="Días transcurridos">
                {progresoTiempo.diasTranscurridos}
              </FolioVisita>
              <ProgresoTiempo
                role="progressbar"
                aria-label="Progreso hasta la fecha meta"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round(progresoTiempo.porcentaje)}
              >
                <ProgresoTiempoRelleno
                  $porcentaje={progresoTiempo.porcentaje}
                  $color={progresoTiempo.color}
                />
              </ProgresoTiempo>
            </>
          ) : (
            <>
              <FolioVisita>1</FolioVisita>
              <CampoVisita aria-label="Número de visita" />
            </>
          )}
          <FechaVisita>{fila3[0]?.value || "6 oct 2026"}</FechaVisita>
          <IconoEstatusTiempo $color={progresoTiempo?.color || "#e4b000"}>
            {progresoTiempo?.estado === "completado" ? <FaRegCheckCircle /> : null}
            {progresoTiempo?.estado === "atrasado" ? (
              <IconoAlertaTiempo>
                <FaClock />
                <AlertaTiempo />
              </IconoAlertaTiempo>
            ) : null}
            {!progresoTiempo?.estado || progresoTiempo.estado === "proceso" ? <FaHistory /> : null}
          </IconoEstatusTiempo>
          <IconoBarra
            as="button"
            type="button"
            aria-label="Ver resumen de la valuación"
            onClick={() => setMostrarResumen(true)}
            style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0 }}
          >
            <FaEllipsisV size={18} color="white" />
          </IconoBarra>
        </BarraInfoVal>
      ) }

      <ModalGenericoV2
        isOpen={mostrarResumen}
        onClose={() => setMostrarResumen(false)}
        titulo="Resumen de la valuación"
        icono={<FaArrowLeft size={24} color="#02142A" />}
        onClickIcono={() => setMostrarResumen(false)}
        ocultarCerrar
        centrarModal
        modalStyle={{ width: "min(420px, calc(100vw - 24px))", padding: "28px 18px 18px" }}
      >
        <ResumenValuacion>
          <ResumenDato><ResumenEtiqueta>Fecha meta</ResumenEtiqueta><ResumenValor>{datoPorEtiqueta(["Fecha Meta"])}</ResumenValor></ResumenDato>
          <ResumenDato><ResumenEtiqueta>Días en valuación</ResumenEtiqueta><ResumenValor>{datoPorEtiqueta(["Días en Valuación", "Días Transcurridos"], 0)}</ResumenValor></ResumenDato>
          <ResumenDato><ResumenEtiqueta>Atraso total</ResumenEtiqueta><ResumenValor>{datoPorEtiqueta(["Atraso Total", "Días de Atraso"], 0)}</ResumenValor></ResumenDato>
          <ResumenDato><ResumenEtiqueta>Estatus</ResumenEtiqueta><ResumenValor>{datoPorEtiqueta(["Estatus"])}</ResumenValor></ResumenDato>
        </ResumenValuacion>
      </ModalGenericoV2>
      
      <ContenedorEtapas>
        {etapasConfiguradas.map((etapa) => (
          <AcordeonItem
            key={etapa.key}
            titulo={etapa.titulo}
            etapa={etapa.etapa}
            etapaId={etapa.key}
            documentoId={etapa.documentoId}
            evaluacion={etapa.evaluacion}
            etapasFinalizadas={etapa.etapasFinalizadas}
            bloqueada={etapa.bloqueada}
            numeroSubEtapa={etapa.numeroSubEtapa}
            subEtapasCompletadas={etapa.subEtapasCompletadas}
            abierto={acordeonesAbiertos[etapa.key] || false}
            onToggle={() => onToggleAcordeon(etapa.key)}
          >
            {etapa.items.map((item) => (
              <CheckRow key={item.id}>
                <CheckListItem
                  handleClick={() => onCheckClick(etapa.key, item.id, item.estado, etapa.itemsOriginales)}
                  activo={item.estado}
                  disabled={item.bloqueado} // Usamos el estado calculado arriba
                  fullWidth={false}
                />
                <TextoCheck onClick={() => onTextClick(item.seccion)}>
                  {item.nombre}
                </TextoCheck>
              </CheckRow>
            ))}
          </AcordeonItem>
        ))}
      </ContenedorEtapas>
    </ContenedorVistaEspecifica>
  );
};
