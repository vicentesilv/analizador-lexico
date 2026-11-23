import styled from "styled-components";
import GaugeComponent from "react-gauge-component";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { ModalGenerico } from "./ModalGenerico";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { TituloModal } from "./estilosModal";
import { HeaderGenerico } from "./headerGenerico";
import { AyudaInformativa } from "./ayuda";
import { useMediaQuery } from "@mui/material";
import { ContenedorModalMovil } from "../moviles/modalMovil";

export const ModalNivel = ({ isOpen, onClose, patologia, subircambios, bloqueado }) => {

  const [ayuda, setAyuda] = useState(false);
  const [nivelTemp, setNivelTemp] = useState(5);
  const [nivel, setNivel] = useState(5);
  const esMovil = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (isOpen) {
      const valor = patologia?.gradoAtractivo || 5;
      setNivel(valor);
      setNivelTemp(valor);
    }
  }, [isOpen, patologia]);

  if (!isOpen || !patologia) return null;

  const handleChange = (e, value) => {
    setNivelTemp(value);
  };

  const handleChangeCommitted = (e, value) => {
    setNivel(value);
  };

  const descripciones = {
    1: "Sin impacto",
    2: "Muy bajo Impacto",
    3: "Bajo impacto",
    4: "Impacto medio bajo",
    5: "Impacto medio",
    6: "Impacto medio alto",
    7: "Impacto alto",
    8: "Impacto alto no urgente",
    9: "Impacto alto urgente",
    10: "Impacto letal",
  };

  const close = async () => {

    if ((patologia.gradoAtractivo !== nivel) && !bloqueado) {

      const patologiaFinal = {
        ...patologia,
        gradoAtractivo: nivel
      };

      await subircambios(patologiaFinal);
    }

    onClose();
  };
  const guardar = async () => {
    if ((patologia.gradoAtractivo !== nivelTemp) && !bloqueado) {
      const patologiaFinal = {
        ...patologia,
        gradoAtractivo: nivelTemp,
      };

      await subircambios(patologiaFinal);
    }

  };
  const contenido = (
      <Contenedor>
        <HeaderGenerico
          onRegresar={onClose}
          titulo={< >NIVEL DE IMPACTO</>}
          onAyuda={() => setAyuda(!ayuda)}
          onGuardar={guardar} />
        <AyudaInformativa ayuda={ayuda}>
          <p>
            Selecciona el nivel de impacto de la patología, siendo 10 el de mayor imapcto a la propiedad.
          </p>
        </AyudaInformativa>

        <GaugeContainer>
          <GaugeComponent
            value={nivelTemp}
            minValue={0}
            maxValue={10}
            type="semicircle"
            arc={{
              subArcs: [
                { limit: 2, color: "#73d13d" },
                { limit: 4, color: "#36cfc9" },
                { limit: 6, color: "#fadb14" },
                { limit: 8, color: "#ffa940" },
                { limit: 10, color: "#ff4d4f" },

              ]
            }}
            labels={{
              valueLabel: {
                hide: true
              }
            }}
          />
        </GaugeContainer>


        <Numero>
          {nivelTemp} : {descripciones[nivelTemp]}
        </Numero>

        <Slider
          value={nivelTemp}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          step={1}
          marks
          min={1}
          max={10}
          valueLabelDisplay="auto"
          sx={{ color: "#02142A", width: "80%" }}
        />

      </Contenedor>
  );

  return esMovil ? (
    <ContenedorModalMovil isOpen={isOpen} onClose={close}>{contenido}</ContenedorModalMovil>
  ) : (
    <ModalGenerico isOpen={isOpen} onClose={close} noBtnCerrar>{contenido}</ModalGenerico>
  );
};

const Contenedor = styled.div`
  width:500px;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  padding:40px;
  gap:20px
`;

const GaugeContainer = styled.div`
  width:100%;
  height:70%;
`;

const Titulo = styled.h3`
  margin-top:10px;
`;

const Numero = styled.div`
  font-size:32px;
  font-weight:700;
`;
