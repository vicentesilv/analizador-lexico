import React, { useState } from 'react';
import { ModalGenerico } from '../Genericos/ModalGenerico';
import { CheckboxV1 } from '../Genericos/CheckboxV1';
import { FaChevronRight } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { AyudaInformativa } from '../Genericos/ayuda';
import { HeaderGenerico } from '../Genericos/headerGenerico';
import { ContenedorModalMedianoGenerico, TituloModal } from '../Genericos/estilosModal';


export const ModalSeleccionPDF = ({
    isOpen,
    onClose,
    seccionesSeleccionadas,
    setSeccionesSeleccionadas,
    onGenerarPDF,
    folio,
    etapasConfig
}) => {
    const [ayuda, setAyuda] = useState(false);

    const toggleSeccion = (etapa) => {
        const idsEtapa = etapa.items.map(item => item.id);
        const todasSeleccionadas = idsEtapa.every(id => seccionesSeleccionadas.includes(id));

        if (todasSeleccionadas) {
            // Deseleccionar todas de esta etapa
            setSeccionesSeleccionadas(prev => prev.filter(id => !idsEtapa.includes(id)));
        } else {
            // Seleccionar todas de esta etapa (evitando duplicados)
            setSeccionesSeleccionadas(prev => {
                const nuevas = [...prev];
                idsEtapa.forEach(id => {
                    if (!nuevas.includes(id)) nuevas.push(id);
                });
                return nuevas;
            });
        }
    };

    return (
        <ModalGenerico
            key="modal-seleccion-pdf"
            isOpen={isOpen}
            onClose={onClose}
            noBtnCerrar
        >
            <ContenedorModalMedianoGenerico >

                <div style={{
                    maxHeight: "70vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <HeaderGenerico
                        onRegresar={onClose}
                        titulo={<>{folio} <FaChevronRight size={12} /> CONFIGURACIÓN DEL REPORTE</>}
                        onAyuda={() => setAyuda(!ayuda)}
                        childrenDerecha={<IoMdDownload size={35} onClick={() => {
                            onGenerarPDF();
                            onClose();
                        }} title='Descargar PDF' />}
                    />
                    <AyudaInformativa ayuda={ayuda}>
                        <p>
                            Selecciona las secciones que deseas incluir en el documento PDF.
                        </p>
                    </AyudaInformativa>
                    {etapasConfig.map(etapa => {
                        const idsEtapa = etapa.items.map(item => item.id);
                        const todasSeleccionadas = idsEtapa.every(id => seccionesSeleccionadas.includes(id));

                        return (
                            <div key={etapa.key} style={{
                                borderRadius: "var(--bordeRadiusGenerico)",
                                padding: " 10px 20px",
                                border: "1px solid #e9ecef",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                                transition: "all 0.4s ease-in-out"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: todasSeleccionadas ? "0px" : "15px",

                                    transition: "all 0.3s ease-in-out"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <CheckboxV1
                                            checked={todasSeleccionadas}
                                            onChange={() => toggleSeccion(etapa)}
                                        />
                                        <h3 style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "700",
                                            margin: 0,
                                            color: "#212529",
                                            textTransform: "uppercase"
                                        }}>
                                            {etapa.titulo}
                                        </h3>
                                    </div>
                                    <span style={{
                                        fontSize: "0.85rem",
                                        color: "#6c757d",
                                        fontWeight: "600",
                                        padding: "4px 10px",
                                        borderRadius: "var(--bordeRadiusGenerico)"
                                    }}>
                                        {etapa.items.length} Secciones
                                    </span>
                                </div>

                                <div style={{
                                    maxHeight: todasSeleccionadas ? "0px" : "1000px",
                                    opacity: todasSeleccionadas ? 0 : 1,
                                    overflow: "hidden",
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    transition: "all 0.4s ease-in-out",
                                    marginTop: todasSeleccionadas ? "0px" : "10px",
                                    borderTop: "1px solid #dee2e6",
                                    paddingTop: todasSeleccionadas ? "0px" : "10px",

                                }}>
                                    {etapa.items.map(item => {
                                        const checked = seccionesSeleccionadas.includes(item.id);

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    if (checked) {
                                                        setSeccionesSeleccionadas(prev => prev.filter(id => id !== item.id));
                                                    } else {
                                                        setSeccionesSeleccionadas(prev => [...prev, item.id]);
                                                    }
                                                }}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    cursor: "pointer",
                                                    padding: "5px 15px",
                                                    borderRadius: "var(--bordeRadiusGenerico)",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!checked) e.currentTarget.style.backgroundColor = "#f8f9fa";
                                                    if (!checked) e.currentTarget.style.borderColor = "#dee2e6";
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!checked) e.currentTarget.style.backgroundColor = "transparent";
                                                    if (!checked) e.currentTarget.style.borderColor = "transparent";
                                                }}
                                            >
                                                <CheckboxV1
                                                    checked={checked}
                                                    onChange={(val) => {
                                                        if (val) {
                                                            setSeccionesSeleccionadas(prev => [...prev, item.id]);
                                                        } else {
                                                            setSeccionesSeleccionadas(prev => prev.filter(id => id !== item.id));
                                                        }
                                                    }}
                                                />
                                                <span style={{
                                                    fontSize: "0.95rem",
                                                    fontWeight: checked ? "600" : "500"
                                                }}>
                                                    {item.nombre}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </ContenedorModalMedianoGenerico>
        </ModalGenerico>
    );
};
