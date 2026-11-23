import { useState, useEffect } from "react";
import styled from "styled-components";
import { ModalGenerico } from "../Genericos/ModalGenerico";
import CheckboxV1 from "../Genericos/CheckboxV1";
import { catalogoRoles } from "../../src/constantes/catalogos";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { TituloModal } from "../Genericos/estilosModal";
import { HeaderGenerico } from "../Genericos/headerGenerico";
import { AyudaInformativa } from "../Genericos/ayuda";


const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px;
  width: 500px;
`;

const ItemRol = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--bordeRadiusGenerico);

  &:hover {
    background: var(--neutro-100);
  }
`;

export const ModalSeleccionRoles = ({
    isOpen,
    onClose,
    rolesSeleccionados = [],
    onGuardar
}) => {
    const [roles, setRoles] = useState([]);
    const [ayuda, setAyuda] = useState(false);

    useEffect(() => {
        setRoles(rolesSeleccionados);
    }, [rolesSeleccionados, isOpen]);

    const toggleRol = (rol) => {
        setRoles((prevRoles) => {
            if (prevRoles.includes(rol)) {
                return prevRoles.filter((r) => r !== rol);
            }

            return [...prevRoles, rol];
        });
    };

    const guardar = () => {
        onGuardar(roles);
        onClose();
    };

    return (
        <ModalGenerico
            isOpen={isOpen}
            onClose={onClose}
            noBtnCerrar
        >
            <Contenedor>

                <HeaderGenerico
                    onRegresar={onClose}
                    onAyuda={() => setAyuda(!ayuda)}
                    onGuardar={guardar}
                    titulo={"ASIGNAR ROLES"}
                />

                <AyudaInformativa ayuda={ayuda}>
                    <p>Asigna el Rol o los Roles que ejercerá el Colaborador en el servicio asignado.</p>
                </AyudaInformativa>



                {catalogoRoles.map((rol) => (
                    <ItemRol
                        key={rol.value}
                        onClick={() => toggleRol(rol.value)}
                    >
                        <CheckboxV1
                            checked={roles.includes(rol.value)}
                            onChange={() => toggleRol(rol.value)}
                        />

                        <span>{rol.label}</span>
                    </ItemRol>
                ))}

            </Contenedor>
        </ModalGenerico>
    );
};