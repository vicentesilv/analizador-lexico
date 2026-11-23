import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

const ContenedorMovil = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const TarjetaMovil = styled.div`
  width: 100%;
  min-height: 84px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px 16px 22px;
  box-sizing: border-box;
  background: #ffffff;
  border-left: 6px solid #242424;
  border-radius: 10px;
  box-shadow: 0 5px 14px rgba(26, 42, 48, 0.06);
`;

const ContenidoMovil = styled.div`
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(${({ $columnas }) => $columnas}, minmax(0, 1fr));
  gap: 8px;

  & > * {
    min-width: 0;
  }
`;

const AccionMovil = styled.button`
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #f0f4f8;
  color: #8ba0b5;
  cursor: pointer;

  &:hover {
    background: #e6edf3;
  }

  &:focus-visible {
    outline: 2px solid #8ba0b5;
    outline-offset: 2px;
  }
`;

export const ComponenteMovil = ({ children, onClick, mostrarAccion = true, ariaLabel = "Abrir", columnas = 3 }) => (
  <ContenedorMovil>
    <TarjetaMovil type="button" onClick={onClick} aria-label={ariaLabel}>
      <ContenidoMovil $columnas={columnas}>{children}</ContenidoMovil>
      {mostrarAccion && (
        <AccionMovil type="button" onClick={onClick} aria-label={ariaLabel}>
          <FaChevronRight size={22} />
        </AccionMovil>
      )}
    </TarjetaMovil>
  </ContenedorMovil>
);

