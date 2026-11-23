import styled from "styled-components";
import { BtnIconoCuadrado } from "./BtnsGenericos";
import { TxtGenerico } from "/src/assets/componentesGenerales/Genericos/Textos.jsx";
import { capitalizarNombres } from "../../funciones/utilidades";

const ContenedorTop = styled.div`
    height: 80px;
    width: 100%;
    gap:10px;
    display: grid;
    grid-template-columns: 1fr  80px;
    gap: 20px;
`
const ContenedorIzquierdo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80px;
    padding: 10px;
    background-color: var(--colorPrincipal);
    p{
        color: white;
    }
`

export const SeccionTopGenerica = ({usuarioSeleccionado,handleClick, txt = "Visualiza la información del socio, actualiza o agrega documentación"}) => {

    return (
        <ContenedorTop>
            <ContenedorIzquierdo>
                <TxtGenerico color="var(--colorNegro)">{capitalizarNombres(usuarioSeleccionado.nombres) } {capitalizarNombres(usuarioSeleccionado.apellidos) } </TxtGenerico>
                <TxtGenerico weight="normal" color="var(--colorNegro)">{txt}</TxtGenerico>
            </ContenedorIzquierdo>
            
            <BtnIconoCuadrado onClick={() => handleClick()} />
        </ContenedorTop>
    )
}

export const MenuTopGenerico = ({titulo,handleClick, txt = "Visualiza la información del socio, actualiza o agrega documentación"}) => {

    return (
        <ContenedorTop>
            <ContenedorIzquierdo>
                <TxtGenerico color="var(--colorNegro)">{titulo} </TxtGenerico>
                <TxtGenerico weight="normal" color="var(--colorNegro)">{txt}</TxtGenerico>
            </ContenedorIzquierdo>
            
            <BtnIconoCuadrado onClick={() => handleClick()} />
        </ContenedorTop>
    )
}