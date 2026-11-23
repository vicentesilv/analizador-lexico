import { ModalGenerico } from "../Genericos/ModalGenerico";
import { Formik, Form } from "formik";
import { useState } from "react";
import { SelectForm } from "../Formularios/FormulariosV1";
import styled from "styled-components";
import { FaArrowLeft, FaCalendarAlt, FaDownload } from "react-icons/fa";

const ContenedorFormulario = styled.div`
    width: 500px;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    border-radius: var(--bordeRadiusGenerico);
    background-color: white;
    padding: 20px;
`;

const HeaderModal = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin-bottom: 20px;
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

const BtnDescargar = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: var(--bordeRadiusGenerico);
    background-color: var(--colorPrincipal);
    color: white;
    cursor: pointer;
`;

export const ModalDescargarInformacion = ({ onClose, isOpen, usuarioSeleccionado }) => {
    return (
        <ModalGenerico isOpen={isOpen} onClose={onClose} noBtnCerrar>
            <FormularioDescargarInformacion onClose={onClose} usuarioSeleccionado={usuarioSeleccionado} />
        </ModalGenerico>
    );
};

const FormularioDescargarInformacion = ({ onClose, usuarioSeleccionado }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentYear = new Date().getFullYear();

    const generarOpcionesAnios = () => {
        const options = [];
        for (let year = currentYear; year >= 2025; year--) {
            options.push({ label: year.toString(), value: year });
        }
        return options;
    };

    const initialValues = {
        anio: currentYear,
    };


    const onSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
            descargarCSVInformacion(usuarioSeleccionado, values.anio);
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error al descargar:', error);
        }
        setIsSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            >
            {({ values, handleSubmit, setFieldValue }) => (
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

                            <TituloModal>
                                DESCARGAR INFORMACIÓN
                            </TituloModal>

                            <BtnDescargar
                                disabled={isSubmitting}
                                type="submit"
                                title={isSubmitting ? "Enviando..." : "Descargar"}
                                aria-label={isSubmitting ? "Enviando..." : "Descargar"}
                            >
                                <FaDownload size={20} />
                            </BtnDescargar>
                        </HeaderModal>

                        <SelectForm
                            id="anio"
                            name="anio"
                            placeholder="Selecciona el año"
                            options={generarOpcionesAnios()}
                            value={values.anio}
                            onChange={(e) => setFieldValue("anio", Number(e.target.value))}
                            icon={<FaCalendarAlt />}
                        />
                    </ContenedorFormulario>
                </Form>
            )}
        </Formik>
    );
};


const descargarCSVInformacion = (empleado, anio) => {
    if (!empleado) return;

    // Encabezados generales del empleado
    const encabezadosEmpleado = [
        "Nombre", "Apellidos", "Correo", "Rol", "ID", "Deshabilitado", "UID Empleado"
    ];

    const filaEmpleado = [
        empleado.nombres || "",
        empleado.apellidos || "",
        empleado.correo || "",
        empleado.rol || "",
        empleado.id || "",
        empleado.deshabilitado ? "Sí" : "No",
        empleado.uid || "",
    ];

    // Convertir a CSV
    let csvContent = '';
    csvContent += encabezadosEmpleado.join(',') + '\n';
    csvContent += filaEmpleado.join(',') + '\n\n';

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_${empleado.nombres}_${empleado.id}_${anio}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
