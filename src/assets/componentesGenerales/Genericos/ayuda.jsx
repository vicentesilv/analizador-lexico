import styled from "styled-components";

const ContenedorAyuda = styled.div`
  margin: 0;
  padding: 18px 20px;
  border: 1px solid var(--gris-200);
  border-radius: var(--bordeRadiusGenerico);
  background: linear-gradient(180deg, #ffffff 0%, var(--pizarra-50) 100%);

  p {
    margin: 0 0 10px;
    color: #475569;
    font-size: 0.98rem;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--gris-900);
  }
`;

export const AyudaInformativa = ({ ayuda, children }) => {
    return (
        <>
            {ayuda && <ContenedorAyuda>
                {children}
            </ContenedorAyuda>}
        </>
    );
};
export const GraficaCard = styled.div`
  border: 1px solid var(--gris-200);
  border-radius: var(--bordeRadiusGenerico);
  padding: 10px;
  background: white;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.06);
  margin-bottom: 10px;
`;