import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { ModalGenerico } from "./ModalGenerico";
import { HeaderGenerico } from "./headerGenerico";
import { AyudaInformativa } from "./ayuda";
import { Alert } from "../../ui/Alert";
import { catalogoPaises } from "../../src/constantes/catalogos";
import { useMediaQuery } from "@mui/material";
import { ContenedorModalMovil } from "../moviles/modalMovil";

const Contenedor = styled.div`
  width: 500px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    gap: 14px;
  }
`;

const ContenedorSelect = styled.div`
  width: 100%;
  position: relative;
`;

const Icono = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 42px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  pointer-events: none;
  border-right: 1px solid #222;
`;

const Select = styled.select`
  width: 100%;
  height: 42px;
  border: 1px solid #222;
  border-radius: var(--bordeRadiusGenerico);
  padding: 0 10px 0 45px;
  font-size: 15px;
  background: white;
`;

// Modal de filtros: país y, una vez elegido, un segundo filtro configurable (estado, moneda...).
// `campo` = { clave, placeholder, opciones: [{ value, label }] }
export const ModalFiltroPais = ({
  isOpen,
  onClose,
  onAplicarFiltros,
  filtrosIniciales,
  campo,
  campoObligatorio = false,
  mensajeFaltante = "Debes seleccionar al menos el país",
  textoAyuda,
  usarModalMovil = false,
}) => {
  const [ayuda, setAyuda] = useState(false);
  const [pais, setPais] = useState("");
  const [valorCampo, setValorCampo] = useState("");
  const esMovil = useMediaQuery("(max-width: 768px)");

  // Sincronizar los selects con los filtros de la última consulta cada vez que se abre
  useEffect(() => {
    if (isOpen) {
      setPais(filtrosIniciales?.pais || "");
      setValorCampo(filtrosIniciales?.[campo.clave] || "");
    }
  }, [isOpen]);

  const aplicar = () => {
    if (!pais || (campoObligatorio && !valorCampo)) {
      Alert.warning(mensajeFaltante);
      return;
    }
    onAplicarFiltros({ pais, [campo.clave]: valorCampo });
    onClose();
  };

  const contenido = (
    <Contenedor>
        <HeaderGenerico
          onRegresar={onClose}
          titulo={<>FILTRAR LA BÚSQUEDA</>}
          onAyuda={() => setAyuda(!ayuda)}
          onGuardar={aplicar}
        />
        <AyudaInformativa ayuda={ayuda}>
          <p>{textoAyuda}</p>
        </AyudaInformativa>

        <ContenedorSelect>
          <Icono><FaFilter /></Icono>
          <Select value={pais} onChange={(e) => setPais(e.target.value)}>
            <option value="">País</option>
            {catalogoPaises.map((p, i) => (
              <option key={`pais-${p.value}-${i}`} value={p.value}>{p.label}</option>
            ))}
          </Select>
        </ContenedorSelect>

        {pais && (
          <ContenedorSelect>
            <Icono><FaFilter /></Icono>
            <Select value={valorCampo} onChange={(e) => setValorCampo(e.target.value)}>
              <option value="">{campo.placeholder}</option>
              {campo.opciones.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </ContenedorSelect>
        )}
    </Contenedor>
  );

  if (usarModalMovil && esMovil) {
    return (
      <ContenedorModalMovil
        isOpen={isOpen}
        onClose={onClose}
        tituloAccesible="Filtrar búsqueda"
      >
        {contenido}
      </ContenedorModalMovil>
    );
  }

  return (
    <ModalGenerico isOpen={isOpen} onClose={onClose} noBtnCerrar centerOnMobile>
      {contenido}
    </ModalGenerico>
  );
};
