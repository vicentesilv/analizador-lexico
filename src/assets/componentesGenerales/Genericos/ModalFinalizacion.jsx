import React from 'react';
import styled from "styled-components";

import { ModalGenericoV2, ContenedorModalV2 } from './ModalGenericoV2';
import { diccionarioIconos } from '../../src/svg/iconos';

const Icono = styled.img`
    width: 30px;
    height: 30px;
    object-fit: contain;
`;

const TextoAviso = styled.div`
    margin: 0;

    font-size: 1rem;
    color: #666;

    line-height: 1.4;

    b {
        color: #666;
    }
`;

const Select = styled.select`
    width: 100%;
    height: 74px;

    border: 2px solid #d6d6d6;

    padding: 0 60px 0 20px;

    font-size: 1rem;

    color: #222;

    background-color: white;

    outline: none;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");

    background-repeat: no-repeat;

    background-position: right 18px center;

    background-size: 28px;
    border-radius: 10px;

    &:focus {
        border-color: var(--colorPrincipal);
    }
`;

export const ModalFinalizacion = ({
    isOpen,
    onClose,
    onFinalizar,
    motivo,
    setMotivo
}) => {

    return (
        <ModalGenericoV2
            key="modal-seleccion-finalizacion"
            isOpen={isOpen}
            onClose={onClose}
            noBtnCerrar
            titulo="FINALIZAR"
            subtitulo={
                <>
                    Selecciona el <b>motivo</b> y finaliza la evaluación:
                </>
            }
            icono={
                <Icono
                    src={diccionarioIconos.reset}
                />
            }
            botones={[
                {
                    texto: "SI, FINALIZAR",
                    onClick: onFinalizar,
                    variante: "principal"
                },
                {
                    texto: "NO, CANCELAR",
                    onClick: onClose,
                    variante: "secundario"
                }
            ]}
        >
                <ContenedorModalV2>
                    <Select
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    >
                        <option value="">
                            Motivo...
                        </option>

                        <option value="CANCELACIÓN A SOLICITUD ASPIRANTE">
                            CANCELACIÓN A SOLICITUD ASPIRANTE
                        </option>

                        <option value="CANCELACIÓN POR 90 O MÁS DÍAS DE ATRASO">
                            CANCELACIÓN POR 90 O MÁS DÍAS DE ATRASO
                        </option>

                        <option value="FINALIZACIÓN DEL PROCESO">
                            FINALIZACIÓN DEL PROCESO
                        </option>
                    </Select>

                    <TextoAviso>
                        Recuerda que al finalizar, el folio queda bloqueado ¿Deseas finalizar?
                    </TextoAviso>
                </ContenedorModalV2>
        </ModalGenericoV2>
    );
};
