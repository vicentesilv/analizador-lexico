import React from "react";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import styled from "styled-components";
export const BarraSuperior = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;
export const IconoGuardar = styled.div`
    cursor: pointer;
    padding-right: 20px;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;
export const AccionesDerecha = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;

  ${({ $centrar }) => $centrar && `
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 0;
  `}
 

  svg {
    cursor: pointer;
    transition: transform 0.2s ease;
    transform: scale(.90);
  }

  svg:hover {
    transform: scale(1);
  }
`;
export const BtnRegresar = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  svg{transition: transform 0.2s ease;}

  &:hover {
    svg{
        transform: translateX(-4px);
    }
    
  }
`;
export const TituloHeader = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #374151;

  ${({ $debajo }) => $debajo && `
    position: absolute;
    top: 46px;
    left: 50%;
    width: max-content;
    margin-left: 0;
    transform: translateX(-50%);
  `}
`;
export const ContenedorHeader = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: white;
`;
export const HeaderGenerico = ({
    onRegresar,
    onAyuda,
    onGuardar,

    titulo,

    isSubmitting = false,

    childrenIzquierda,
    childrenDerecha,

    barraStyle,
    ocultarRegresar = false,
    centrarAccionDerecha = false,
    tituloDebajo = false,
}) => {
    return (
        <ContenedorHeader>
            <BarraSuperior style={barraStyle}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 0px",
                        flex: 1
                    }}
                >
                    {!ocultarRegresar && (
                        <BtnRegresar type="button" onClick={onRegresar}>
                            <FaArrowLeft size={35} title="Regresar" />
                        </BtnRegresar>
                    )}

                    {titulo && (
                        <TituloHeader $debajo={tituloDebajo}>
                            {titulo}
                        </TituloHeader>
                    )}
                </div>

                <AccionesDerecha $centrar={centrarAccionDerecha}>
                    {childrenIzquierda}

                    {onAyuda && (
                        <FaInfoCircle
                            size={32}
                            title="Ver instrucciones"
                            onClick={onAyuda}
                        />
                    )}

                    {onGuardar && (
                        <IconoGuardar
                            style={{
                                marginRight: "-20px",
                                opacity: isSubmitting ? 0.5 : 1,
                                pointerEvents: isSubmitting ? "none" : "auto",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                            }}
                            onClick={() => {
                                if (!isSubmitting) {
                                    onGuardar();
                                }
                            }}
                        >
                            <IoIosSave
                                size={35}
                                title={isSubmitting ? "Guardando..." : "Guardar"}
                            />
                        </IconoGuardar>
                    )}

                    {childrenDerecha}
                </AccionesDerecha>
            </BarraSuperior>
        </ContenedorHeader>
    );
};
