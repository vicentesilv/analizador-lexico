import styled from "styled-components";

// Bloques de métricas (ícono, valor y etiqueta) usados en tarjetas de varias vistas

export const ContenedorMetricas = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #f3f4f6;
  gap: 8px;
`;

export const IconoMetrica = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const LabelMetrica = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: var(--gris-500);
  line-height: 1.3;
`;

export const MetricaColumna = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: -4px;
    top: 15%;
    height: 70%;
    width: 1px;
    background-color: var(--gris-200);
  }
`;

export const ValorMetrica = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: var(--gris-900);
  margin-bottom: 4px;
`;
