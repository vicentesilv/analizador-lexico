import { useState } from "react";
import { renderToString } from "react-dom/server";
import styled from "styled-components";
import { IoRibbon, IoRibbonOutline } from "react-icons/io5";
import { Alert } from "../../ui/Alert";
import { catalogoRoles } from "../../src/constantes/catalogos";
import CheckboxV1 from "../Genericos/CheckboxV1";
import { ModalSeleccionCalificacion } from "./modalSeleccionCalificacion";
import { ModalSeleccionRoles } from "./modalSeleccionRoles";

const CardPropiedad = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  background: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  border-radius: var(--bordeRadiusGenerico);
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--colorPrincipal, var(--azul-enlace));
  }
`;

const ContenidoInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const WrapperCheck = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 100; /* Aseguramos que esté arriba de todo en la card */
`;

const ControlesInferiores = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const BtnCalificacion = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: var(--bordeRadiusGenerico);
  background: #f9f9f9;
  border: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
    color: var(--colorPrincipal, #b48c5d);
  }
`;

const BtnRoles = styled.button`
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  padding: 4px 10px;
  border-radius: var(--bordeRadiusGenerico);
  font-size: 11px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const ContenedorRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const InfoPropiedad = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #333;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: black;
  text-transform: uppercase;
  margin-right: 4px;
`;

/**
 * Componente ServicioCard optimizado para la configuración de servicios en asignación.
 */
export const ServicioCard = ({
  servicio,
  configuracion,
  onChangeConfig,
  seleccionado,
  rol,
  hayCambiosLocales
}) => {
  const [openCalificacion, setOpenCalificacion] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  if (!servicio) return null;

  const { habilitado, roles } = configuracion;



  const renderCalificacion = () => {
    const valor = configuracion.calificacion || 0;
    return (
      <BtnCalificacion
        onClick={() => { if (servicio.deshabilitado) { return }; setOpenCalificacion(true) }}
        style={{
          opacity:
            servicio.deshabilitado
              ? .4
              : habilitado
                ? 1
                : .5
        }}
      >
        <IoRibbon size={16} color={valor > 0 ? "var(--colorPrincipal, #b48c5d)" : "#ccc"} />
        <span>{valor > 0 ? `${valor}/5` : "Calificar"}</span>
      </BtnCalificacion>

    );
  };

  return (
    <CardPropiedad style={{ borderColor: habilitado ? "var(--colorPrincipal, #007bff)" : "#ccc" }}>
      <ModalSeleccionCalificacion
        isOpen={openCalificacion}
        onClose={() => setOpenCalificacion(false)}
        calificacion={configuracion.calificacion || 0}
        onGuardar={(valor) =>
          onChangeConfig({ calificacion: valor })
        }
      />
      <ModalSeleccionRoles
        isOpen={openRoles}
        onClose={() => setOpenRoles(false)}
        rolesSeleccionados={configuracion.roles || []}
        onGuardar={(roles) =>
          onChangeConfig({ roles })
        }
      />
      <WrapperCheck>
        {!servicio.deshabilitado && <CheckboxV1
          checked={habilitado || seleccionado}
          onChange={(val) => onChangeConfig({ habilitado: val })}
        />}
        {servicio.deshabilitado && (
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid #333",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
              backgroundColor:  "#f0f0f0" ,
            }}
          >
            ✕
          </div>
        )}
      </WrapperCheck>

      <ContenidoInfo style={{ opacity: habilitado ? 1 : 0.6 }}>
        <ContenedorRating>
          <IoRibbon size={40} color={habilitado ? "var(--colorPrincipal, #007bff)" : "#ccc"} />
        </ContenedorRating>

        <InfoPropiedad>
          <div>
            <Label>SKU:</Label> {servicio.sku || "N/A"}
          </div>
          <div>
            <Label>NOMBRE:</Label>
            {servicio.nombre}
          </div>

          {servicio.deshabilitado && (
            <div
              style={{
                color: "#dc2626",
                fontWeight: 700,
                marginTop: 6
              }}
            >
              SERVICIO DESHABILITADO
            </div>
          )}
          <div style={{ marginTop: "4px", fontSize: "14px", fontWeight: "600", color: "var(--colorPrincipal, #333)" }}>
            {servicio.precio ? `$${servicio.precio}` : "$0.00"} {servicio.moneda || ""}
          </div>
        </InfoPropiedad>
      </ContenidoInfo>

      <ControlesInferiores>
        {renderCalificacion()}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {!rol && (
            <BtnRoles onClick={()=>setOpenRoles(true)} disabled={servicio.deshabilitado} style={{opacity: servicio.deshabilitado?0.5:1}}>
              Roles ({roles.length})
            </BtnRoles>
          )}

          {rol?.length > 0 ? (
            rol.map((r, index) => (
              <div key={index} style={{ fontSize: "11px", fontWeight: "bold", color: "#666" }}>{r}</div>
            ))
          ) : (rol &&
            <span style={{ fontSize: "11px", color: "#999" }}>Sin rol</span>
          )}
        </div>
      </ControlesInferiores>
      {hayCambiosLocales && (
        <div
          style={{
            marginTop: 8,
            textAlign: "right",
            fontSize: 11,
            color: "#ff9800",
            fontWeight: 600
          }}
        >
          (sin guardar)
        </div>
      )}
    </CardPropiedad>
  );
};
