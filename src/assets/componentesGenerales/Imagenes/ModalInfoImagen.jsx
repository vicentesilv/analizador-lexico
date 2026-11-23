import styled from "styled-components";
import { ModalGenerico } from "../Genericos/ModalGenerico";
import { H1Generico } from "../Genericos/Textos";
import { BtnSecundario } from "../Formularios/FormulariosV1";
import { FaArrowLeft, FaEdit, FaPencilAlt, FaSave, FaTrashAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { ContenedorModalMedianoGenerico, TituloModal } from "../Genericos/estilosModal";
import { HeaderGenerico, IconoGuardar } from "../Genericos/headerGenerico";
import { useMediaQuery } from "@mui/material";
import { BotonAgregar, Header, Titulo } from "./estilosCelular";


const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap; 
  gap: 10px;

`;
const BtnEditar = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  @media(max-width:426px){
    width: 45%;
  }
  

  @media (min-width: 768px) {
    position: absolute;
    top: 10px;
    right: 50px;
    
  }
`;

const BtnCancelar = styled.button`
  background: #D27619;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  @media(max-width:426px){
    width: 45%;
  }

  @media (min-width: 768px) {
    position: absolute;
    top: 10px;
    right: 150px;
  }
`;
const BodyModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* height: 70vh; 👈 no es clave */

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;
const ImagenWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1; 

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden; 

  @media (min-width: 768px) {
    height: 100%;
  }
`;
const ImagenModal = styled.img`
  width: 100%;
  height: auto;
  max-height: 50vh;
  object-fit: contain;
  background: var(--neutro-100);
  border-radius: 8px;
  border: 1px solid #ddd;

  @media (min-width: 768px) {
    max-height: 80vh;
  }
`;
const Punto = styled.button`
  position: absolute;
  width: 36px;
  height: 36px;
  background: rgba(255, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  padding: 0;

  svg {
    color: white;
    font-size: 16px;
  }
`;
const PanelInfo = styled.div`
  width: 100%;
  background: #f9f9f9;
  border-top: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  max-height: 30vh;
  overflow-y: auto;
  justify-content: center;

  @media (min-width: 768px) {
    width: 300px;
    min-width: 250px;
    border-top: none;
    border-left: 1px solid #eee;
    max-height: 80vh;
  }
`;
const BtnFijar = styled.button`
  background: #2e7d32;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  @media(max-width:426px){
    width: 45%;
  }

  @media (min-width: 768px) {
    position: absolute;
    top: 10px;
    right: 260px;
  }
`;
export const ModalInfoImagen = ({
  abrirModal,
  setAbrirModal,
  imagenActiva,
  imagenSeleccionada,
  imagenes,
  setImagenes,
  guardar,
  soloLectura = false
}) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const imagenRef = useRef(null);
  const [pinned, setPinned] = useState(null);
  const pinTopRef = useRef(null);
  const pinScrollRef = useRef(false);

  const pinFromPoint = (idx, isPin) => {
    if (isPin) { setPinned(null); return; }
    pinScrollRef.current = true;
    setPinned(idx);
  };

  useEffect(() => {
    if (pinned !== null && pinned !== undefined && pinScrollRef.current) {
      pinScrollRef.current = false;
      pinTopRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
    }
  }, [pinned]);

  useEffect(() => {
    const onDown = (e) => { if (!e.target.closest?.(".pin-zone")) setPinned(null); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => { setPinned(null); }, [imagenActiva]);


  const closeModal = () => {
    setModoEdicion(false);
    setPinned(null);
    setAbrirModal(false);
  }
  const handleClickImagen = (e) => {
    setPinned(null);
    if (!modoEdicion || imagenActiva === null) return;

    const img = imagenRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const rect2 = e.currentTarget.getBoundingClientRect();

    // 🔴 Validar que el click esté dentro de la imagen real
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      return; // 🚫 click fuera de la imagen
    }

    const x = ((e.clientX - rect2.left) / rect2.width) * 100;
    const y = ((e.clientY - rect2.top) / rect2.height) * 100;

    setImagenes(prev => {
      const copia = [...prev];

      copia[imagenActiva] = {
        ...copia[imagenActiva],
        puntos: [
          ...(copia[imagenActiva].puntos || []),
          { x, y, texto: "" }
        ]
      };

      return copia;
    });
  };
  const eliminarPunto = (indexPunto) => {
    if (imagenActiva === null) return;

    setImagenes(prev => {

      const copia = [...prev];

      copia[imagenActiva] = {
        ...copia[imagenActiva],
        puntos: copia[imagenActiva].puntos.filter(
          (_, i) => i !== indexPunto
        )
      };

      return copia

    });
    setPinned(null);
  };
  const handleEditar = () => {
    if (soloLectura) return;

    setModoEdicion(!modoEdicion);

    if (modoEdicion) {
      guardar();
    }
  };
  const puntosActuales =
    imagenActiva !== null ? imagenes[imagenActiva]?.puntos || [] : [];
  const pinnedNota = (pinned !== null && pinned !== undefined && puntosActuales[pinned])
    ? { ...puntosActuales[pinned], idx: pinned }
    : null;
  const mobil = useMediaQuery("(max-width:600px)");
  return (<ModalGenerico
    isOpen={abrirModal}
    onClose={closeModal}
    noBtnCerrar  >
    <ContenedorModalMedianoGenerico>
      {!mobil ? (
        <>
          <TituloModal activo>Evidencia Fotográfica</TituloModal>

          <HeaderGenerico
            onRegresar={closeModal}
            onGuardar={() => {
              if (soloLectura) return;
              guardar();
            }}
            barraStyle={{ marginTop: "10px" }}
            childrenIzquierda={
              <FaPencilAlt
                size={25}
                onClick={() => setModoEdicion(!modoEdicion)}
              />
            }
          />
        </>
      ) : <><Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white"
        }}
      >
        {/* Botón atrás */}
        <div
          style={{ cursor: "pointer", fontSize: "25px" }}
          onClick={closeModal}
        >
          <FaArrowLeft />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginRight: "auto", marginLeft: "16px" }}>

          <Titulo
            style={{
              margin: 0,
              flex: 1,
              textAlign: "center"
            }}
          >
            Evidencia Fotográfica
          </Titulo>
        </div>
      </Header><BotonAgregar onClick={handleEditar} style={{ background: modoEdicion ? "#cfd8dc" : undefined ,margin:"10px 0"}}>
          {modoEdicion ? <FaSave /> : < FaEdit/>}
        </BotonAgregar></>}


      <BodyModal>

        {/* IZQUIERDA - IMAGEN */}
        <ImagenWrapper onClick={handleClickImagen}>
          <ImagenModal
            ref={imagenRef}
            src={imagenSeleccionada?.url}
          />

          
          {puntosActuales.map((punto, index) => {
            const isPin = pinned === index;
            return (
              <Punto
                key={index}
                className="pin-zone"
                title={punto.texto || `Punto ${index + 1}`}
                onClick={(e) => { e.stopPropagation(); pinFromPoint(index, isPin); }}
                style={{
                  left: `${punto.x}%`,
                  top: `${punto.y}%`,
                  background: isPin ? "#1d4ed8" : undefined,
                  transform: isPin ? "translate(-50%,-50%) scale(1.15)" : "translate(-50%,-50%)",
                  boxShadow: isPin ? "0 0 0 3px #bfdbfe, 0 3px 10px rgba(0,0,0,0.35)" : undefined,
                }}
              >
                {index + 1}
              </Punto>
            );
          })}

        </ImagenWrapper>

        {/* DERECHA - PANEL */}
        <PanelInfo className="pin-zone">
          <h3 style={{ margin: "auto 0", fontSize: 20, textAlign: "center" }} >Información {modoEdicion ? "( editando )" : ""}</h3>
          {imagenes[imagenActiva]?.fijada && (
            <div
              style={{
                background: "#2e7d32",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                textAlign: "center",
                marginBottom: "15px",
                fontWeight: "bold"
              }}
            >
              Imagen seleccionada para reporte
            </div>
          )}

          {imagenActiva !== null && puntosActuales.length === 0 && (
            <p>No hay puntos creados</p>
          )}

          {pinnedNota && (
            <div
              key={`pin-${pinnedNota.idx}`}
              ref={pinTopRef}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: 10,
                border: "2px solid var(--colorPrincipal, #b91c1c)",
                borderRadius: 8,
                background: "#eff6ff",
                marginBottom: 10
              }}
            >
              <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: "#1d4ed8", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{pinnedNota.idx + 1}</div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 11, color: "#1d4ed8", fontWeight: 800 }}>
                  <button type="button" onClick={() => setPinned(null)} title="Desanclar" style={{ marginLeft: 8, padding: "2px 8px", fontSize: 11, borderRadius: 6, border: "1px solid #bfdbfe", background: "white", cursor: "pointer", color: "#1d4ed8", fontWeight: 800 }}>✕</button>
                </span>
                {modoEdicion ? (
                  <input
                    type="text"
                    placeholder="Agregar descripción..."
                    value={pinnedNota.texto}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const nuevoTexto = e.target.value;
                      setImagenes(prev => {
                        const copia = [...prev];
                        copia[imagenActiva] = {
                          ...copia[imagenActiva],
                          puntos: copia[imagenActiva].puntos.map((p, i) =>
                            i === pinnedNota.idx ? { ...p, texto: nuevoTexto } : p
                          )
                        };
                        return copia;
                      });
                    }}
                    style={{ width: "100%", padding: "6px 8px", border: "1px solid #93c5fd", borderRadius: 6, fontSize: 13 }}
                  />
                ) : (
                  <p style={{ margin: 0 }}>{pinnedNota.texto}</p>
                )}
              </div>
            </div>
          )}

          {imagenActiva !== null &&
            puntosActuales.map((punto, index) => {
              const isPin = pinned === index;
              return (
                <div
                  key={index}
                  onClick={() => setPinned(isPin ? null : index)}
                  style={{
                    marginBottom: "15px",
                    cursor: "pointer",
                    padding: 10,
                    border: isPin ? "2px solid #1d4ed8" : "1px solid transparent",
                    borderRadius: 6,
                    background: isPin ? "#eff6ff" : "transparent"
                  }}
                >
                  <div
                    style={{ marginBottom: "15px", cursor: "pointer", display: "flex", justifyContent: "space-between" }}

                  >
                    <strong style={{ margin: "auto 0", fontSize: 16 }}>Botón {index + 1}</strong>
                    {modoEdicion &&
                      <IconoGuardar

                        onClick={(e) => { e.stopPropagation(); eliminarPunto(index); }}>
                        <FaTrashAlt />
                      </IconoGuardar>}
                  </div>
                  {modoEdicion ? <input
                    type="text"
                    placeholder="Agregar descripción..."
                    value={punto.texto}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const nuevoTexto = e.target.value;

                      setImagenes(prev => {

                        const copia = [...prev];

                        copia[imagenActiva] = {
                          ...copia[imagenActiva],
                          puntos: copia[imagenActiva].puntos.map((p, i) =>
                            i === index ? { ...p, texto: nuevoTexto } : p
                          )
                        };

                        return copia;

                      });
                    }}
                    style={{
                      marginTop: "5px",
                      width: "100%",
                      padding: "5px",
                      fontSize: "14px"
                    }}
                  /> :
                    <p >{punto.texto}</p>}
                </div>
              );
            })}

        </PanelInfo>

      </BodyModal>
    </ContenedorModalMedianoGenerico>
  </ModalGenerico>)
}