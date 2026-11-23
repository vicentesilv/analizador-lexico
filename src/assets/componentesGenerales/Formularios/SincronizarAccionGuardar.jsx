import { useEffect } from "react";

// Expone el submitForm de Formik al padre (por ejemplo, para un botón "Guardar" del encabezado).
// Va dentro del render-prop de <Formik>, donde no se pueden llamar hooks directamente.
export const SincronizarAccionGuardar = ({ submitForm, setAccionGuardar }) => {
    useEffect(() => {
        if (!setAccionGuardar) return;
        setAccionGuardar(() => submitForm);
        return () => setAccionGuardar(null);
    }, [submitForm, setAccionGuardar]);

    return null;
};
