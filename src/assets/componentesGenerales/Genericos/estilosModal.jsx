import styled from "styled-components";

export const TituloModal = styled.span`
    font-size: 0.82rem;
    color: ${({ activo }) => activo ? "var(--colorPrincipal)" : "#9ca3af"};
    font-weight: ${({ activo }) => activo ? "700" : "400"};
    cursor: ${({ activo }) => activo ? "default" : "pointer"};
    white-space: normal;
    word-break: break-word;
    letter-spacing: ${({ activo }) => activo ? "0.02em" : "0"};
    transition: color 0.15s;

    &:hover {
        color: ${({ activo }) => activo ? "var(--colorPrincipal)" : "var(--colorSecundario)"};
    }
`
export const ContenedorModalMedianoGenerico = styled.div`
  width: 900px;
  max-width: 900px;
  padding: 40px;
  box-sizing: border-box;
  background: white;
  border-radius: var(--bordeRadiusGenerico);

  @media (max-width: 940px) {
    width: 95%;
    max-width: 95%;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    padding: 15px;
  }
`;
export const ContenedorModalPequanioGenerico = styled.div`
  width: 700px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  background-color: white;
  padding: 40px;
`;