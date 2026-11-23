import styled from "styled-components";
import { PictureGenerico } from "./Picture"
import { IoIosArrowBack } from "react-icons/io";
import { imagenes } from "../../src/Images/Diccionario";


const ContenedorTopStyled = styled.div`
    display: grid;
    grid-template-columns: ${({contieneRegresar}) => contieneRegresar ?  "1fr 3fr 1fr" :  "1fr 3fr"};
    
    width: 100%;
    height: 120px;
    margin-bottom: ${({margin}) => margin || "10px" };
    background-color: white;
    border-radius: 0px;
    overflow: hidden;
    align-items: center;

`

const ContenedorTopTxt = styled.div`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    color: var(--colorPrincipal);
    font-size: 30px;
`

const ContenedorPicture = styled.div`
    width: 100%;
    height:40%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        
        height: 100%;
       
    }
`

const ContenedorBoton = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    margin-right: 20px ;


    button {
        background-color: var(--colorPrincipal);
        color: white;
        display: flex;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: var(--bordeRadiusGenerico);
        font-size: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, border .3s;
        
        &:hover {
            transition: background-color 0.3s, border .3s;
            background-color: white;
            color: var(--colorPrincipal);
            border: solid 2px var(--colorPrincipal);
        }
    }
`

export const LayoutTopGenerico = ({ srcImg = imagenes.whc.src, handleClickRegresar, titulo="Ingresar Titulo" }) => {
    return (
        <ContenedorTopStyled contieneRegresar={handleClickRegresar}>
            <ContenedorPicture>
                <PictureGenerico alt="Seccion img" src={srcImg} />
            </ContenedorPicture>

            <ContenedorTopTxt>
                {titulo.toUpperCase() || "Sin sección seleccionada"}
            </ContenedorTopTxt>
            {handleClickRegresar
                ? (
                    < ContenedorBoton >
                        <button onClick={handleClickRegresar}>
                            <IoIosArrowBack />
                        </button>
                    </ContenedorBoton>
                ) : <></>
            }
        </ContenedorTopStyled >
    )
}
