import styled from "styled-components";
import { ContenedorGenerico } from "./LayoutGeneral";

// Contenedor de las vistas con tabla principal (Valuación, Inventarios, Embudo, Prospección...)

export const ContenedorVistaTabla = styled(ContenedorGenerico)`
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    height: fit-content;
    max-width: 100%;
`;
