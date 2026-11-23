import React, { useState } from 'react';
import styled from 'styled-components';

// Mapa de colores por área
const coloresPorArea = {
  comercial: '#3498db',     // azul
  asesores: '#6B8D40',      // verde
  laboratorios: '#4F4898',   // morado
  taller: '#525250',        // gris
};

// Función para limpiar área: elimina "iNNCi " y pasa a minúsculas
const limpiarArea = (area) =>
  area ? area.toLowerCase().replace(/^innci\s*/, '') : '';

const AcordeonContainer = styled.div`
  width: 100%;
`;

const AreaHeader = styled.div`
  background-color: ${({ area }) => coloresPorArea[limpiarArea(area)] || 'var(--neutro-100)'};
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: var(--bordeRadiusGenerico);
  margin-bottom: 5px;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ServiciosContainer = styled.div`
  padding: 10px 15px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-radius: 0 0 5px 5px;
  background-color: var(--neutro-50);
`;

const ServicioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  gap: 8px;
  cursor: pointer;
`;

export const ServiciosAcordeon = ({
  servicios = [],
  serviciosSeleccionados = [],
  onToggleServicio = () => {},
}) => {
  const [openArea, setOpenArea] = useState(null);

  // Agrupa servicios por área
  const serviciosPorArea = servicios.reduce((acc, servicio) => {
    const { area } = servicio;
    if (!area) return acc;
    if (!acc[area]) acc[area] = [];
    acc[area].push(servicio);
    return acc;
  }, {});

  // Orden deseado de áreas
  const ordenAreas = ['comercial', 'asesores', 'laboratorios', 'taller'];

  // Ordenar las áreas según ordenAreas
  const areasOrdenadas = Object.keys(serviciosPorArea).sort((a, b) => {
    const indexA = ordenAreas.indexOf(limpiarArea(a));
    const indexB = ordenAreas.indexOf(limpiarArea(b));
    return indexA - indexB;
  });

  const toggleArea = (area) => {
    setOpenArea((prev) => (prev === area ? null : area));
  };

  return (
    <AcordeonContainer>
      {areasOrdenadas.map((area) => {
        const serviciosArea = serviciosPorArea[area];
        return (
          <div key={area}>
            <AreaHeader area={area} onClick={() => toggleArea(area)}>
              {area}
            </AreaHeader>

            {openArea === area && (
              <ServiciosContainer>
                {serviciosArea.map(({ value, label }) => {
                  if (!value) return null;
                  const isChecked = serviciosSeleccionados.includes(value);

                  return (
                    <ServicioLabel key={`${area}-${value}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleServicio(value)}
                      />
                      {label}
                    </ServicioLabel>
                  );
                })}
              </ServiciosContainer>
            )}
          </div>
        );
      })}
    </AcordeonContainer>
  );
};
