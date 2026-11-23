import styled from "styled-components";

// Tarjetas de totales que acompañan a las gráficas

export const CardTotal = styled.div`
  background: #ffffff;
  border: 1px solid var(--gris-200);
  border-radius: var(--bordeRadiusGenerico);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
  }
`;

export const ComparacionTotal = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
`;

export const ContenedorIconoTotal = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--bordeRadiusGenerico);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${props => props.$bgColor};
  color: ${props => props.$color};
`;

export const ContenedorTextosTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

export const ContenedorTotales = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ $cantidad }) =>
        $cantidad === 1
            ? "1fr"
            : $cantidad === 2
                ? "1fr 1fr"
                : "1fr 1fr 1fr"
    };

  gap: 16px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

export const LabelTotal = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: var(--gris-500);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ValorTotal = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.$color};
`;

export const ValorTotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
