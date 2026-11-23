import { ModalGenerico } from "../Genericos/ModalGenerico"
import { Formik, Form } from "formik";
import { ValidateCampoRequerido } from "../../Validaciones";
import { useState } from "react";
import { FieldForm, BtnSeleccionarImg } from "../../componentesGenerales/Formularios/FormulariosV1"
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import styled from "styled-components";
import { actualizarUsuario } from "../../funciones/firebase/usuarios";
import { Alert } from "../../ui/Alert";
import { valoresEdicionEmpleado } from "../../../tipos";

const ContenedorFormulario = styled.div`
    width: 650px;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: var(--bordeRadiusGenerico);
    background-color: white;
    padding: 20px;
`

const HeaderModal = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

const BtnRegresar = styled.button`
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
`;

const TituloModal = styled.h2`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #374151;
`;

const BtnGuardar = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border: none;
    border-radius: var(--bordeRadiusGenerico);
    background-color: var(--colorPrincipal);
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ContenidoModal = styled.div`
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: center;
    gap: 24px;
    width: 100%;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const PanelFoto = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorCampos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;

`;

export const ModalModificarEmpleado = ({ onClose, isOpen, usuarioSeleccionado, actualizarData }) => {
    return (
        <ModalGenerico
            isOpen={isOpen}
            onClose={onClose}
            noBtnCerrar
            overlayStyle={{ alignItems: "center", padding: "20px" }}
        >
            <ModificarEmpleado onClose={onClose} usuarioSeleccionado={usuarioSeleccionado} actualizarData={actualizarData} />
        </ModalGenerico>
    )
}






export const ModificarEmpleado = ({ onClose, usuarioSeleccionado, actualizarData = () => console.log("data actualizada") }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const validateForm = (values) => {
        const errors = {};
        const nombreError = ValidateCampoRequerido(values.nombres);
        if (nombreError) errors.nombres = nombreError;
        const apellidoError = ValidateCampoRequerido(values.apellidos);
        if (apellidoError) errors.apellidos = apellidoError;

        if (!values.imgPerfil) {
            errors.imgPerfil = "Debes seleccionar una imagen de perfil";
        }
        return errors;
    };

    const initialValues = valoresEdicionEmpleado(usuarioSeleccionado);

    const onSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        const valoresParaGuardar = {
            ...values,
            nombres: values.nombres.toLowerCase(),
            apellidos: values.apellidos.toLowerCase(),
        };



        try {



            await actualizarUsuario(usuarioSeleccionado.uid, valoresParaGuardar);
            actualizarData(valoresParaGuardar)

            onClose()
            resetForm();
            Alert.success('Datos Actualizados');
        } catch (error) {
            console.error('Error:', error);
            Alert.error('Error al actualizar los datos de usuario');
        }
        setIsSubmitting(false);
    };



    return (

        <Formik
            validate={validateForm}
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize 
        >
            {({ values, handleChange, handleSubmit, setFieldValue, handleBlur }) => (
                <Form onSubmit={handleSubmit}>
                    <ContenedorFormulario>
                        <HeaderModal>
                            <BtnRegresar
                                type="button"
                                onClick={onClose}
                                title="Regresar"
                            >
                                <FaArrowLeft size={30} />
                            </BtnRegresar>

                            <TituloModal>MODIFICAR INFORMACIÓN</TituloModal>

                            <BtnGuardar
                                disabled={isSubmitting}
                                type="submit"
                                title={isSubmitting ? "Guardando..." : "Guardar"}
                                aria-label={isSubmitting ? "Guardando..." : "Guardar"}
                            >
                                <IoIosSave size={24} />
                            </BtnGuardar>
                        </HeaderModal>

                        <ContenidoModal>
                            <PanelFoto>
                                <BtnSeleccionarImg
                                    id="imgPerfil"
                                    name="imgPerfil"
                                    value={values.imgPerfil}
                                    onChange={(e) => {
                                        setFieldValue("imgPerfil", e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </PanelFoto>

                            <ContenedorCampos>
                                <FieldForm
                                    id="nombres"
                                    name="nombres"
                                    type="text"
                                    placeholder="Ingresa los nombres"
                                    icon={<FaUser />}
                                    value={values.nombres}
                                    onChange={handleChange}
                                />
                                <FieldForm
                                    id="apellidos"
                                    name="apellidos"
                                    type="text"
                                    placeholder="Ingresa los apellidos"
                                    icon={<FaUser />}
                                    value={values.apellidos}
                                    onChange={handleChange}
                                />
                            </ContenedorCampos>
                        </ContenidoModal>
                    </ContenedorFormulario>
                </Form>
            )}
        </Formik>

    );
};




