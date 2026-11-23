import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IoIosSave } from "react-icons/io";
import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaPlus } from "react-icons/fa";
import { ModalInfoImagen } from "../Imagenes/ModalInfoImagen";
import { ModalSubirImagen } from "../Imagenes/ModalSubirImagen";
import GridImagenes from "../Imagenes/GridImagenes";
import { IconoGuardar } from "./headerGenerico";
import { useSubHeaderStore } from "../../store/useSubHeaderStore";
import { ReproductorAudio } from "./ReproductorAudio";
import { eliminarArchivo, subirAudio } from "../../funciones/services/cargaArchivos";


const ContenedorDetalle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
  position: relative;
  overflow-x: hidden;
  padding-top: 20px;
`;

export const ImagenPreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--bordeRadiusGenerico);
  border: 1px solid #ddd;
`;

const ContenedorEditable = styled.div`
  position: relative;
  width: 100%;
`;

export const SlotAgregarImagen = styled.div`
  width: 100%;
  height: 200px;
  border-radius: var(--bordeRadiusGenerico);
  border: 2px dashed #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--neutro-50);
  gap: 8px;

  &:hover {
    border-color: var(--colorPrincipal);
    background-color: #f0f6ff;
  }
`;

export const TextoCantidad = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const InputEditable = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 20px;
  overflow: hidden;
`;

export const LabelMenuPrincipalStyled = styled.p`
  position: absolute;
  left: 20px;
  border-radius: var(--bordeRadiusGenerico);
  font-size: 12px;
  top: -15px;
  background-color: ${props => props.color || "white"};
  padding: 5px;
  border: solid 2px black;
`;

export const ContenedorField = styled.div`
  width: 100%;
  min-height: 120px;
  border: solid 2px black;
  border-radius: var(--bordeRadiusGenerico);
  position: relative;
  padding: 10px 20px;
  display: flex;
  background-color: ${props => props.color || "transparent"};
`;

const ContenedorNotas = styled.div`
  width: 100%;
  min-height: 160px;
  border-radius: var(--bordeRadiusGenerico);
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff, #f5f7fa);
  border: 1px solid #dbe3ec;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const InputNotas = styled.textarea`
  width: 100%;
  min-height: 160px;
  border: none;
  outline: none;
  resize: vertical;
  background: transparent;
  padding: 16px;
  font-size: 15px;
  line-height: 1.6;
  font-family: inherit;
  color: var(--colorPrincipal);

  &::placeholder {
    color: #9aa4b2;
  }
`;

export const MAX_IMAGENES = 6;
export const formatearTiempo = (totalSegundos) => {
  const minutos = Math.floor(totalSegundos / 60);
  const seg = Math.floor(totalSegundos % 60);

  return `${minutos.toString().padStart(2, "0")}:${seg
    .toString()
    .padStart(2, "0")}`;
};

export const VistaDetallePatologiaGenerico = ({patologia,setPatologia,bloqueado,folio,handleRegresar,soloLectura = false,mostrarFooterAgregar, 
}) => {
const [imagenes, setImagenes] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [modalSubir, setModalSubir] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(null);
  const [notas, setNotas] = useState("");
  const [guardar, setGuardar] = useState(false);
  const [grabando, setGrabando] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [segundos, setSegundos] = useState(0);
  const intervaloRef = useRef(null);
  const registrarSubHeader = useSubHeaderStore(
    (state) => state.registrarSubHeader
  );
  const limpiarSubHeader = useSubHeaderStore((state) => state.limpiarSubHeader);
  const handleClickRegresarRef = useRef(handleRegresar);

  const shouldShowFooter = mostrarFooterAgregar ?? !soloLectura;


  useEffect(() => {
    if(patologia){
        setNotas(patologia?.notas || "");
        setAudioURL(patologia?.audio || null);
        setImagenes(patologia?.imagenes || []);
    }
  }, [patologia]);
 useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream
            .getTracks()
            .forEach((track) => track.stop());
        }
      }
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  useEffect(() => {
    if (guardar) {
      guardarCambios();
      setGuardar(false);
    }
  }, [guardar]);

  const guardarCambios = (imagenesActualizadas = imagenes) => {
    const patologiaActualizada = {
      ...patologia,
      notas,
      audio: audioURL,
      imagenes: imagenesActualizadas,
    };
    setPatologia(patologiaActualizada);
  };

  const totalImagenes = () => imagenes.length;

  const subirImagen = () => {
    if (totalImagenes() < MAX_IMAGENES) {
      setModalSubir(true);
    } else {
      alert(`Solo puedes subir ${MAX_IMAGENES} imágenes.`);
    }
  };

  const iniciarGrabacion = async () => {
    if (bloqueado) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = "";
      if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("audio/webm")) {
        mimeType = "audio/webm";
      }

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });

        const extension = mimeType.includes("mp4") ? "mp4" : "webm";

        const archivoAudio = new File(
          [blob],
          `audio-${Date.now()}.${extension}`,
          { type: mimeType || "audio/webm" }
        );

        if (audioURL?.ruta) {
          try {
            await eliminarArchivo(audioURL.ruta);
          } catch (error) {
            console.error("Error eliminando audio:", error);
          }
        }

        const res = await subirAudio(archivoAudio, {
          ruta: "audios",
          optimizar: false,
        });

        if (res.success) {
          const audioNuevo = {
            ruta: res.data.ruta,
            url: res.data.url,
            duracion: segundos,
          };

          setAudioURL(audioNuevo);
          setPatologia({
            ...patologia,
            notas,
            audio: audioNuevo,
            imagenes,
          });
        }
      };

      mediaRecorder.start();
      setGrabando(true);
      setSegundos(0);

      intervaloRef.current = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("No se pudo acceder al micrófono");
    }
  };

  const detenerGrabacion = () => {
    if (bloqueado) return;
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
    setGrabando(false);
    clearInterval(intervaloRef.current);
  };

  const handleGuardar = useCallback(() => {
    if (bloqueado) return;
    guardarCambios();
  }, [bloqueado, notas, imagenes, audioURL]);

  const blink = {
    animation: "parpadeo 1s infinite",
  };

  const acciones = useMemo(() => {
    const base = [
      {
        icono: audioURL?.url ? (
          <ReproductorAudio url={audioURL.url} width="220px" />
        ) : null,
        title: "Audio",
      },
    ];

    if (!soloLectura) {
      base.push(
        {
          icono: !grabando ? (
            <IconoGuardar onClick={iniciarGrabacion}>
              <FaMicrophoneAlt size={35} />
            </IconoGuardar>
          ) : (
            <IconoGuardar onClick={detenerGrabacion}>
              <FaMicrophoneAltSlash size={35} />
            </IconoGuardar>
          ),
          title: "Grabar",
        },
        {
          icono: <IoIosSave size={40} />,
          onClick: handleGuardar,
          title: "Guardar",
        }
      );
    }

    return base;
  }, [audioURL, grabando, handleGuardar, soloLectura]);

  useEffect(() => {
    handleClickRegresarRef.current = handleRegresar;
  }, [handleRegresar]);

  useEffect(() => {
    registrarSubHeader({
      onRegresar: () => handleClickRegresarRef.current?.(),
      accionesDerecha: acciones,
    });
    return () => limpiarSubHeader();
  }, [registrarSubHeader, limpiarSubHeader, acciones]);

  return (
    <ContenedorDetalle>
      {modalSubir && (
        <ModalSubirImagen
          setModalSubir={setModalSubir}
          setImagenes={setImagenes}
          setGuardar={setGuardar}
          folio={folio}
        />
      )}
      <ModalInfoImagen
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        imagenActiva={imagenActiva}
        imagenSeleccionada={imagenSeleccionada}
        guardar={guardarCambios}
        imagenes={imagenes}
        setImagenes={setImagenes}
        soloLectura={soloLectura}
      />

      <ContenedorEditable>
        <ContenedorNotas>
          <InputNotas
            value={notas}
            placeholder="Escribe observaciones, comentarios o notas relevantes..."
            onChange={(e) => setNotas(e.target.value)}
            readOnly={soloLectura}
          />
        </ContenedorNotas>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "5px",
          }}
        >
          {grabando && (
            <>
              <FaMicrophoneAlt size={18} style={{ color: "red", ...blink }} />
              <span
                style={{
                  fontWeight: "bold",
                  color: "red",
                  fontSize: "16px",
                  fontFamily: "monospace",
                }}
              >
                {formatearTiempo(segundos)}
              </span>
            </>
          )}
        </div>
      </ContenedorEditable>

      <GridImagenes
        images={imagenes}
        onImageClick={(img, index) => {
          setAbrirModal(true);
          setImagenSeleccionada(img);
          setImagenActiva(index);
        }}
        renderFooter={
          shouldShowFooter
            ? () =>
                imagenes.length < MAX_IMAGENES && !bloqueado ? (
                  <SlotAgregarImagen onClick={subirImagen}>
                    <FaPlus size={30} color="#999" />
                    <TextoCantidad>
                      {imagenes.length} / {MAX_IMAGENES}
                    </TextoCantidad>
                  </SlotAgregarImagen>
                ) : null
            : undefined
        }
      />
    </ContenedorDetalle>
  );
};
