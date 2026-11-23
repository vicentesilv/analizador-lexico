import styled from "styled-components";
import { IoRibbon, IoRibbonOutline } from "react-icons/io5";
import { ModalGenerico } from "../Genericos/ModalGenerico";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { TituloModal } from "../Genericos/estilosModal";
import { HeaderGenerico } from "../Genericos/headerGenerico";
import { AyudaInformativa } from "../Genericos/ayuda";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  min-height: 300px;
  gap: 20px;
  padding: 40px;
`;

const ContenedorEstrellas = styled.div`
  display: flex;
  gap: 10px;
`;

const BtnEstrella = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

export const ModalSeleccionCalificacion = ({
    isOpen,
    onClose,
    calificacion,
    onGuardar
}) => {
    const [ayuda, setAyuda] = useState(false);
    const [calificacionSeleccionada, setCalificacionSeleccionada] =
        useState(calificacion || 0);
    const seleccionar = (valor) => {
        onGuardar(valor);
        onClose();
    };

    return (
        <ModalGenerico isOpen={isOpen} onClose={onClose} noBtnCerrar>
            <Contenedor>
                <HeaderGenerico
                    titulo={"ASIGNAR CALIFICACIÓN"}
                    onRegresar={onClose}
                    onAyuda={() => setAyuda(!ayuda)}
                    onGuardar={() => {
                        onGuardar(calificacionSeleccionada);
                        onClose();
                    }}
                />
                <AyudaInformativa ayuda={ayuda}>
                    <p>
                        Asigna una calificación al servicio, siendo 5/5 la mejor puntuación. Si el Colaborador es nuevo, entonces asigna una calificación 3/5.
                    </p>
                </AyudaInformativa>


                <ContenedorEstrellas>
                    {[1, 2, 3, 4, 5].map((valor) => (
                        <BtnEstrella
                            key={valor}
                            onClick={() => setCalificacionSeleccionada(valor)}
                        >
                            {valor <= calificacionSeleccionada ? (
                                <IoRibbon
                                    size={50}
                                    color="var(--colorPrincipal)"
                                />
                            ) : (
                                <IoRibbonOutline
                                    size={50}
                                    color="#ccc"
                                />
                            )}
                        </BtnEstrella>
                    ))}
                </ContenedorEstrellas>

                <div
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "var(--colorPrincipal)"
                    }}
                >
                    {calificacionSeleccionada}/5
                </div>
            </Contenedor>
        </ModalGenerico>
    );
};