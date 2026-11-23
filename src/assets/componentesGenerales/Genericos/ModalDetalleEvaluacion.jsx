import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { ModalGenericoV2 } from "./ModalGenericoV2";

const DetalleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px 12px;
  padding: 8px 0 4px;

  @media (max-width: 768px) {
    gap: 18px 6px;
    padding-top: 6px;
  }
`;

const DetalleCampo = styled.div`
  min-height: 72px;
  border: 2px solid #27313d;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 10px 8px;
  position: relative;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
  background: #f8fbff;
  overflow-wrap: anywhere;
  box-shadow: 0 1px 2px rgba(2, 20, 42, 0.08);

  @media (max-width: 768px) {
    min-height: 58px;
    padding: 15px 3px 6px;
    font-size: 0.72rem;
  }
`;

const DetalleEtiqueta = styled.span`
  position: absolute;
  top: -16px;
  left: 18px;
  padding: 4px 9px;
  background: white;
  border: 2px solid #27313d;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  line-height: 1;

  @media (max-width: 768px) {
    left: 5px;
    padding: 3px 5px;
    font-size: 0.6rem;
  }
`;

const mostrarValor = (valor) => {
  if (valor === null || valor === undefined || valor === "") {
    return "No especificado";
  }

  return String(valor);
};

export const ModalDetalleEvaluacion = ({
  isOpen,
  onClose,
  titulo,
  datos = [],
}) => (
  <ModalGenericoV2
    isOpen={isOpen}
    onClose={onClose}
    titulo={titulo}
    icono={<FaArrowLeft size={28} color="#02142A" />}
    onClickIcono={onClose}
    ocultarCerrar
    centrarModal
    modalStyle={{
      width: "min(470px, calc(100vw - 16px))",
      maxWidth: "calc(100vw - 16px)",
      maxHeight: "calc(100vh - 16px)",
      padding: "24px 12px 12px",
      borderRadius: "10px",
      gap: "8px",
    }}
  >
    <DetalleGrid>
      {datos.map(({ etiqueta, valor }, index) => (
        <DetalleCampo key={`${etiqueta}-${index}`}>
          <DetalleEtiqueta>{etiqueta}</DetalleEtiqueta>
          {mostrarValor(valor)}
        </DetalleCampo>
      ))}
    </DetalleGrid>
  </ModalGenericoV2>
);
