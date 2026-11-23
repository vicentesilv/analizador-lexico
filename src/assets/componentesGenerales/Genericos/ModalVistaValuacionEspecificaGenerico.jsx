// Ruta sugerida: src/componentesGenerales/Genericos/LayoutVistaModalGenerico.jsx
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

// Los estilos globales se quedan aquí
const GlobalStyles = createGlobalStyle`
  .swal2-container {
    z-index: 99999 !important;
  }
`;

const ContenedorModal = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 10px;
`;

const ContenedorVistaSeccion = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

export const LayoutVistaModalGenerico = ({ modalesAdicionales, vistaActiva }) => {
  return (
    <ContenedorModal>
      <GlobalStyles />
      {modalesAdicionales}
      <ContenedorVistaSeccion>
        {vistaActiva}
      </ContenedorVistaSeccion>
      
    </ContenedorModal>
  );
};