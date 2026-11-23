import styled from "styled-components"
import { DiccionarioFotoPerfil } from "../../src/Images/perfil/DiccionarioPerfil"
import imgPerfilDefecto from "../../src/Images/perfil/imgPerfil1.webp"
import { PictureGenerico } from "../Genericos/Picture"
import { TxtGenerico } from "../Genericos/Textos"
import { capitalizarNombres } from "../../funciones/utilidades"
import { BtnGenerico } from "../Btns/BtnsGenericos"
import { ModalModificarEmpleado } from "./ModalModificarEmpleado"
import { useState } from "react"
import { useContextoGeneral } from "../../contextos/ContextoGeneral"
import { ModalDescargarInformacion } from "./ModalDescargarInformacion"
import { IoIosArrowBack } from "react-icons/io"


const ContenedorCard = styled.div`
    width: 100%;
    min-width: 400px;
    height: 80px;
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 10px;
    background-color: var(--colorPrincipal);
    transition: .2s ease transform;
    border: solid 2px var(--colorPrincipal);
    cursor: ${({ noHover }) => noHover ? "" : "pointer"} ;
    &:hover{
        
        transform: ${({ noHover }) => noHover ? "" : "translateX(25px)"} ;
        transition: .2s ease transform;
    }
    p{
        color: white;
    }

  
`
const ContenedorIzquierdo = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    @media (max-width: 400px) {
        img{
            object-fit: contain;
        }
    }
`
const ContenedorInformacionUsuario = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    min-height: 200px;
    max-height: 300px;
    border-radius: var(--bordeRadiusGenerico);
    background-color: var(--colorPrincipal);
    padding: 15px;
    gap: 10px;
    @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
    }
`
const ContenedorDerecho = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`
const ContenedorDerechoInformacionCliente = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
    width: 100%;
    height: 100%;
    gap: 10px;
    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }
    @media (max-width: 500px) {
        height: auto;
    }
`
const ContenedorCampo = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    gap: 10px;
    max-height: 30px;
    p{
        color: white;
    }
    
`
export const CardClienteHorizontal = ({ usuario, handleClick = () => console.log(), noHover }) => {
    const obtenerImagenPerfil = () => {
        if (usuario?.imgPerfil) {
            return DiccionarioFotoPerfil[usuario.imgPerfil].src;
        }
        // Si no, devuelve la imagen por defecto
        return imgPerfilDefecto;
    };


    const imagenPerfil = imgPerfilDefecto;


    return (
        <ContenedorCard noHover={noHover} onClick={() => handleClick()}>
            <ContenedorIzquierdo>
                <PictureGenerico src={imagenPerfil} alt="Imagen de perfil" />
            </ContenedorIzquierdo>
            <ContenedorDerecho>
                <TxtGenerico weight="normal" size="18px" >Colaborador: </TxtGenerico>
                <TxtGenerico weight="normal" size="18px" >id: {usuario?.id}</TxtGenerico>
                <TxtGenerico weight="normal" size="18px" >Rol: {(usuario?.rol || "").toUpperCase()}</TxtGenerico>
            </ContenedorDerecho>
        </ContenedorCard>
    )
}

export const CardColaboradorHorizontal = ({ usuario, handleClick = () => console.log(), noHover }) => {
    const obtenerImagenPerfil = () => {
        if (usuario?.imgPerfil) {
            return DiccionarioFotoPerfil[usuario.imgPerfil].src;
        }
        // Si no, devuelve la imagen por defecto
        return imgPerfilDefecto;
    };


    const imagenPerfil = imgPerfilDefecto;

    return (
        <ContenedorCard noHover={noHover} onClick={() => handleClick()}>
            <ContenedorIzquierdo>
                <PictureGenerico src={imagenPerfil} alt="Imagen de perfil" />
            </ContenedorIzquierdo>
            <ContenedorDerecho>
                <TxtGenerico weight="normal" size="18px" >Colaborador: {capitalizarNombres(usuario?.nombres)} {capitalizarNombres(usuario?.apellidos)}</TxtGenerico>
                <TxtGenerico weight="normal" size="18px" >id: {usuario?.id}</TxtGenerico>
                <TxtGenerico weight="normal" size="18px" >Rol: {(usuario?.rol || "").toUpperCase()}</TxtGenerico>
            </ContenedorDerecho>
        </ContenedorCard>
    )
}
const ContenedorBoton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;


    button {
        background-color: white;
        color: var(--colorPrincipal);
        display: flex;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: var(--bordeRadiusGenerico);
        font-size: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, border .1s;
        border: solid 2px var(--colorPrincipal);
        
        &:hover {
            transition: background-color 0.3s, border .1s;
            background-color: var(--colorPrincipal);
            color: white;
            border: solid 2px white;
        }
    }
`
const ContenedorCardEvaluacion =styled(ContenedorCard)`
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 0;
    margin: 0;
    border: 0;
`
export const CardColaboradorHorizontalEvaluacionProovedores = ({ usuario, handleClick = () => console.log(), noHover }) => {
    const obtenerImagenPerfil = () => {
        if (usuario?.imgPerfil) {
            return DiccionarioFotoPerfil[usuario.imgPerfil].src;
        }
        // Si no, devuelve la imagen por defecto
        return imgPerfilDefecto;
    };


    const imagenPerfil = imgPerfilDefecto;

    return (

        <ContenedorCardEvaluacion noHover={noHover} >
            <ContenedorCard noHover={noHover}  >


                <ContenedorIzquierdo>
                    <PictureGenerico src={imagenPerfil} alt="Imagen de perfil" />
                </ContenedorIzquierdo>
                <ContenedorDerecho>
                    <TxtGenerico weight="normal" size="18px" >Colaborador: {capitalizarNombres(usuario?.nombres)} {capitalizarNombres(usuario?.apellidos)}</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >id: {usuario?.id}</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >Rol: {(usuario?.rol || "").toUpperCase()}</TxtGenerico>
                </ContenedorDerecho>
            </ContenedorCard>
            {handleClick
                ? (
                    < ContenedorBoton >
                        <button onClick={handleClick}>
                            <IoIosArrowBack />
                        </button>
                    </ContenedorBoton>
                ) : <></>
            }
        </ContenedorCardEvaluacion>

    )
}

const ContenedorBtn = styled.div`
    height: 60px; 
    width: 100%;
    gap: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 1/3;
`
export const CardInformacionEmpleado = ({ usuarioSeleccionado, actualizarData }) => {
    const { usuario } = useContextoGeneral();
    const [isOpenModalModificar, setIsOpenModalModificar] = useState(false);
    const [isOpenModalDescargar, setIsOpenModalDescargar] = useState(false);

    const obtenerImagenPerfil = () => {
        if (usuarioSeleccionado?.imgPerfil) {
            return DiccionarioFotoPerfil[usuarioSeleccionado.imgPerfil].src;
        }
        // Si no, devuelve la imagen por defecto
        return imgPerfilDefecto;
    };

    const imagenPerfil = imgPerfilDefecto;
    return (
        <ContenedorInformacionUsuario>
            <ContenedorIzquierdo>
                <PictureGenerico src={imagenPerfil} alt="Imagen de perfil" />
            </ContenedorIzquierdo>

            <ContenedorDerechoInformacionCliente>
                <ContenedorCampo>
                    <TxtGenerico weight="bold" size="18px" >Nombre:</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >{capitalizarNombres(usuarioSeleccionado?.nombres)}</TxtGenerico>
                </ContenedorCampo>
                <ContenedorCampo>
                    <TxtGenerico weight="bold" size="18px" >Apellido:</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >{capitalizarNombres(usuarioSeleccionado?.apellidos)}</TxtGenerico>
                </ContenedorCampo>
                <ContenedorCampo>
                    <TxtGenerico weight="bold" size="18px" >Correo:</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >{usuarioSeleccionado?.correo}</TxtGenerico>
                </ContenedorCampo>
                <ContenedorCampo>
                    <TxtGenerico weight="bold" size="18px" >Id:</TxtGenerico>
                    <TxtGenerico weight="normal" size="18px" >{usuarioSeleccionado?.id}</TxtGenerico>
                </ContenedorCampo>
                {usuario.rol === "administrador" ?
                    <ContenedorBtn>
                        <BtnGenerico txt="Des. Información" onClick={() => setIsOpenModalDescargar(true)} />
                        <ModalDescargarInformacion onClose={() => setIsOpenModalDescargar(false)} isOpen={isOpenModalDescargar} usuarioSeleccionado={usuarioSeleccionado} />


                        <BtnGenerico txt="Modificar" onClick={() => setIsOpenModalModificar(true)} />
                        <ModalModificarEmpleado onClose={() => setIsOpenModalModificar(false)} isOpen={isOpenModalModificar} usuarioSeleccionado={usuarioSeleccionado} actualizarData={actualizarData} />



                    </ContenedorBtn> :
                    <></>

                }
            </ContenedorDerechoInformacionCliente>

        </ContenedorInformacionUsuario>
    )
}