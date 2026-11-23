import { useState } from "react";
import { FaCheckSquare, FaExclamationTriangle, FaMinus, FaPlus, FaRegSquare } from "react-icons/fa";
import styled from "styled-components";
import { useEffect } from "react";
export const ContenedorVistaEspecifica = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 60dvh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-bottom: calc(90px + env(safe-area-inset-bottom));
  }
 
`;




export const ContenedorPuntaje = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

export const TarjetaPuntaje = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border-radius: var(--bordeRadiusGenerico);
  text-align: center;
`;

//posible cambio a dinamico en el futuro
const EncabezadoAcordeon = styled.div`
  width: 100%;
  height: 60px;
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ completada }) => completada ? "#4CAF50" : "var(--colorPrincipal)"};
  color: var(--colorBlanco);
  font-size: 20px;
  cursor: pointer;
  border-radius: var(--bordeRadiusGenerico);
  position: relative;
`;

const IndicadorEtapa = styled.div`
  position: absolute;
  right: 50px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: var(--bordeRadiusGenerico);
  font-size: 12px;
  font-weight: bold;
`;

const ContenidoAcordeon = styled.div`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-top: none;
  animation: fadeIn 0.3s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const AcordeonItem = ({
  titulo,
  children,
  numeroSubEtapa,
  subEtapasCompletadas = 0,
  etapaId,
  documentoId,
  bloqueada = false,
  etapasFinalizadas = [],
  simpleMode = false,
  abierto: abiertoProp,
  onToggle,
}) => {
  const [abiertoInterno, setAbiertoInterno] = useState(false);
  const esControlado = abiertoProp !== undefined;
  const abierto = esControlado ? abiertoProp : abiertoInterno;


  useEffect(() => {
    setCompletada(etapasFinalizadas.includes(etapaId));
  }, [etapasFinalizadas, etapaId]);

  const handleToggle = () => {
    if (bloqueada) return;
    if (esControlado && onToggle) {
      onToggle(!abierto);
    } else {
      setAbiertoInterno(!abiertoInterno);
    }
  };

  const [completada, setCompletada] = useState(etapasFinalizadas.includes(etapaId));



  return (
    <div>
      <EncabezadoAcordeon
        onClick={handleToggle}
        completada={completada}
        style={{ opacity: bloqueada ? 0.6 : 1, cursor: bloqueada ? "not-allowed" : "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!simpleMode && (
            <span  style={{ cursor: "pointer" }}>
              {completada ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
            </span>
          )}
          {bloqueada && <FaExclamationTriangle size={20} />}
          {titulo}
        </div>
        {!simpleMode && (
          <IndicadorEtapa>{subEtapasCompletadas}/{numeroSubEtapa}</IndicadorEtapa>
        )}
        <span>{!bloqueada && (abierto ? <FaMinus/> : <FaPlus/>)}</span>
      </EncabezadoAcordeon>

      {abierto && !bloqueada && <ContenidoAcordeon>{children}</ContenidoAcordeon>}
    </div>
  );
};
