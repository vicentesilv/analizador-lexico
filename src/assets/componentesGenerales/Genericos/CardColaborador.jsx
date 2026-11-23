import styled from "styled-components";

export const CardColaborador = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  background: white;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;

  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--colorPrincipal, var(--azul-enlace));
  }

  
`;
