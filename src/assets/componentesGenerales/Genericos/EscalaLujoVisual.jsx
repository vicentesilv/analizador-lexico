import React from "react";
import { EscalaLujoVisualGenerico } from "@/assets/componentesGenerales/Genericos/EscalaLujoVisualGenerico";
import { PESOS_VALUACION } from "../../src/constantes/pesosValuacion";

const categoriasMapeo = [
    { label: "UBICACIÓN", field: "gradoLujoUbicacion", itemKey: "cuestionarioUbicacion" },
    { label: "ENTORNO", field: "gradoLujoEntorno", itemKey: "cuestionarioEntorno" },
    { label: "EXCLUSIVIDAD", field: "gradoLujoExclusividad", itemKey: "cuestionarioExclusividad" },
    { label: "SERVICIOS", field: "gradoLujoServicio", itemKey: "cuestionarioServicio" },
    { label: "DISEÑO INTERIOR", field: "gradoLujoInterior", itemKey: "cuestionarioInterior" },
    { label: "DISEÑO EXTERIOR", field: "gradoLujoExterior", itemKey: "cuestionarioExterior" },
];

export const EscalaLujoVisual = ({ valuacionData }) => {
    if (!valuacionData) {
        return <div style={{ textAlign: "center", padding: "20px" }}>No hay datos de valuación disponibles sobre el nivel de lujo de la propiedad.</div>;
    }

    const diagnosticoSection = valuacionData?.secciones?.diagnostico?.etapas || {};
    const categoriasProcesadas = categoriasMapeo.map(cat => {
        let rawPuntaje = valuacionData[cat.field]; 
        
        if (rawPuntaje === undefined || rawPuntaje === null) { 
            rawPuntaje = diagnosticoSection[cat.itemKey]?.data?.puntaje || 0;
        }
        const valorEscala = rawPuntaje > 5 ? (rawPuntaje / 20) : rawPuntaje; 
        return {
            label: cat.label,
            score: valorEscala,
        };
    });
        
    let finalScore = valuacionData.gradoLujoFinal; 
    if (finalScore === undefined || finalScore === null) {
        let calculoAlVuelo = 0;
        
        Object.keys(PESOS_VALUACION).forEach(idEtapa => {
            const puntaje = diagnosticoSection[idEtapa]?.data?.puntaje || 0; 
            const peso = PESOS_VALUACION[idEtapa]; 
            calculoAlVuelo += (puntaje * peso); 
        });
        finalScore = calculoAlVuelo / 20; 
    }
    
    const scoreFinal = finalScore > 5 ? (finalScore / 20) : finalScore;
    return <EscalaLujoVisualGenerico categorias={categoriasProcesadas} scoreFinal={scoreFinal} mensajeVacio="No hay datos de valuación disponibles sobre el nivel de lujo de la propiedad." />;
}
