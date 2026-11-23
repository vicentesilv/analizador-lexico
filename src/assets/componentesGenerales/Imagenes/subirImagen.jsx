import { Formik } from "formik";
import { useRef, useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaFileAlt, FaList } from "react-icons/fa";
import { ContenedorModalV2 } from "../Genericos/ModalGenericoV2";
import { HeaderGenerico } from "../Genericos/headerGenerico";
import { SelectForm } from "../Formularios/FormulariosV1";
import { TxtGenerico } from "../Genericos/Textos";
import {
  ContenedorModalMovil,
  BotonCerrarModalMovil,
  obtenerEstilosModalMovil,
} from "../moviles/modalMovil";

const estilosPanelMovil = {
  ...obtenerEstilosModalMovil(true),
  margin: 0,
};

const ContenedorOpciones = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
`;

const BotonOpcion = styled.button`
  flex: 1 1 0;
  width: 50%;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: var(--bordeRadiusGenerico);
  background: #f9f9f9;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    border-color: var(--azul-enlace);
    background: #f0f7ff;
  }

  svg {
    width: 32px;
    height: 32px;
    color: #555;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
`;

const SelectorOrientacion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1px solid #dbe4ef;
  border-radius: 14px;
  background: #f8fafc;
`;

const TituloOrientacion = styled.div`
  color: #0b1f3a;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const BotonOrientacion = styled.button`
  flex: 1 1 0;
  min-height: 64px;
  border: 1px solid #dbe4ef;
  border-radius: 12px;
  background: #ffffff;
  color: #0b1f3a;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    border-color: var(--azul-enlace);
    background: #f0f7ff;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #1e3a5f;
  }
`;

const normalizarOrientacionImagen = async (file, orientacionObjetivo, rotar180Grados = false) => {
  if (!file?.type?.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }

  try {
    if (typeof createImageBitmap !== "function") return file;

    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const debeRotar = orientacionObjetivo === "horizontal"
      ? bitmap.width < bitmap.height
      : orientacionObjetivo === "vertical" && bitmap.width > bitmap.height;
    const ancho = debeRotar ? bitmap.height : bitmap.width;
    const alto = debeRotar ? bitmap.width : bitmap.height;
    const canvas = document.createElement("canvas");
    canvas.width = ancho;
    canvas.height = alto;
    const contexto = canvas.getContext("2d");

    if (debeRotar || rotar180Grados) {
      contexto.translate(ancho / 2, alto / 2);
      contexto.rotate((debeRotar ? Math.PI / 2 : 0) + (rotar180Grados ? Math.PI : 0));
      contexto.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
    } else {
      contexto.drawImage(bitmap, 0, 0);
    }

    bitmap.close?.();

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, file.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.92);
    });

    return blob
      ? new File([blob], file.name, { type: blob.type, lastModified: Date.now() })
      : file;
  } catch {
    return file;
  }
};

export const FormularioSubirImagen = ({
  children = () => null,
  onSubir,
  onValidacionFallida,
  inputRef,
  tipoDocUpload,
  setTipoDocUpload,
  tiposDoc,
  checklistPorTipo,
  slugSubtipo,
  idSufijo = "",
  mostrarCamara = false,
}) => {
  const inputCamaraRef = useRef(null);
  const [mostrarSeleccionOrientacion, setMostrarSeleccionOrientacion] = useState(false);
  const [orientacionCamara, setOrientacionCamara] = useState(null);

  return (
    <Formik
      initialValues={{ tipoDocUpload: tipoDocUpload || "", segundoSelect: "" }}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ setFieldValue, values }) => {
        const opcionesSegundo = checklistPorTipo[values.tipoDocUpload] || [];
        const requiereSegundo = opcionesSegundo.length > 0;
        const puedeSubir = !!(values.tipoDocUpload && values.segundoSelect);
        const validarPuedeSubir = () => {
          if (puedeSubir) return true;
          onValidacionFallida?.();
          return false;
        };
        const seleccionarArchivo = () => {
          if (!validarPuedeSubir()) return;
          inputRef.current?.click();
        };
        const tomarFotografia = () => {
          if (!validarPuedeSubir()) return;
          setMostrarSeleccionOrientacion(true);
        };
        const abrirCamara = (orientacion) => {
          if (!validarPuedeSubir()) return;
          setOrientacionCamara(orientacion);
          setMostrarSeleccionOrientacion(false);

          const orientacionPantalla = orientacion === "horizontal" ? "landscape" : "portrait";
          if (typeof screen !== "undefined" && screen.orientation?.lock) {
            try {
              void screen.orientation.lock(orientacionPantalla).catch(() => {});
            } catch {
              // Algunos navegadores móviles no permiten bloquear la orientación.
            }
          }

          inputCamaraRef.current?.click();
        };
        const cancelarCamara = () => {
          if (typeof screen !== "undefined" && screen.orientation?.unlock) {
            screen.orientation.unlock();
          }
          setOrientacionCamara(null);
        };
        const manejarArchivoSeleccionado = async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file || !validarPuedeSubir()) return;
          try {
            const archivoOrientado = await normalizarOrientacionImagen(
              file,
              orientacionCamara,
              orientacionCamara === "horizontal",
            );
            await onSubir(archivoOrientado, values.tipoDocUpload, values.segundoSelect);
          } finally {
            if (typeof screen !== "undefined" && screen.orientation?.unlock) {
              screen.orientation.unlock();
            }
            setOrientacionCamara(null);
          }
        };
        const campos = (
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <SelectForm
              id={`tipoDocUpload${idSufijo}`}
              name="tipoDocUpload"
              placeholder="TIPO DE DOCUMENTO..."
              options={tiposDoc.map((opcion) => ({ ...opcion, label: opcion.label.toUpperCase() }))}
              icon={<FaFileAlt />}
              onChangeCustom={(event) => {
                setTipoDocUpload(event.target.value);
                setFieldValue("tipoDocUpload", event.target.value);
                setFieldValue("segundoSelect", "");
              }}
            />

            {requiereSegundo && (
              <SelectForm
                id={`segundoSelect${idSufijo}`}
                name="segundoSelect"
                placeholder="OPCIÓN DE REVISIÓN..."
                options={opcionesSegundo.map((opcion) => ({ value: slugSubtipo(opcion), label: opcion.toUpperCase() }))}
                icon={<FaList />}
                onChangeCustom={(event) => setFieldValue("segundoSelect", event.target.value)}
              />
            )}
          </div>
        );

        return (
          <>
            {children({
              campos,
              puedeSubir,
              seleccionarArchivo,
              tomarFotografia,
              mostrarSeleccionOrientacion,
              abrirCamara,
            })}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/*,.pdf,.png,.jpg,.jpeg,.webp,.gif,.bmp,.svg"
              style={{ display: "none" }}
              onChange={manejarArchivoSeleccionado}
            />
            {mostrarCamara && (
              <input
                ref={inputCamaraRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: "none" }}
                onChange={manejarArchivoSeleccionado}
                onCancel={cancelarCamara}
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export const SubirImagen = ({
  onCerrar,
  onSubir,
  inputRef,
  tipoDocUpload,
  setTipoDocUpload,
  tiposDoc,
  checklistPorTipo,
  slugSubtipo,
}) => {
  const contenedorSubirImagenRef = useRef(null);
  const [estaDesplazado, setEstaDesplazado] = useState(false);

  const manejarScroll = (event) => {
    setEstaDesplazado(event.currentTarget.scrollTop > 0);
  };

  return (
    <ContenedorModalMovil
      onClose={onCerrar}
      ref={contenedorSubirImagenRef}
      onScroll={manejarScroll}
      style={estilosPanelMovil}
    >
      <ContenedorModalV2>
        <FormularioSubirImagen
          onSubir={onSubir}
          inputRef={inputRef}
          tipoDocUpload={tipoDocUpload}
          setTipoDocUpload={setTipoDocUpload}
          tiposDoc={tiposDoc}
          checklistPorTipo={checklistPorTipo}
          slugSubtipo={slugSubtipo}
          idSufijo="Movil"
          mostrarCamara
        >
          {({ campos, puedeSubir, seleccionarArchivo, tomarFotografia, mostrarSeleccionOrientacion, abrirCamara }) => (
            <>
              <HeaderGenerico
                titulo={estaDesplazado ? "" : "REVISION DOCUMENTO"}
                ocultarRegresar
                centrarAccionDerecha
                tituloDebajo
                barraStyle={{ paddingBottom: estaDesplazado ? 0 : 28 }}
                childrenDerecha={(
                  <BotonCerrarModalMovil
                    type="button"
                    aria-label="Cerrar revisión de documento"
                    title="Cerrar"
                    onClick={onCerrar}
                  >
                    <FaChevronDown />
                  </BotonCerrarModalMovil>
                )}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 15, minHeight: 0 }}>
                {campos}

                {!puedeSubir && (
                  <TxtGenerico size="12px" weight="400" color="#94a3b8" align="center" style={{ margin: 0 }}>
                    Selecciona el tipo de documento y la opción de revisión para continuar.
                  </TxtGenerico>
                )}

                <ContenedorOpciones>
                  <BotonOpcion type="button" onClick={tomarFotografia} disabled={!puedeSubir}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span>Tomar fotografía</span>
                  </BotonOpcion>

                  <BotonOpcion type="button" onClick={seleccionarArchivo} disabled={!puedeSubir}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span>Seleccionar archivo</span>
                  </BotonOpcion>
                </ContenedorOpciones>

                {mostrarSeleccionOrientacion && (
                  <SelectorOrientacion>
                    <TituloOrientacion>¿Cómo tomarás la foto?</TituloOrientacion>
                    <ContenedorOpciones>
                      <BotonOrientacion type="button" onClick={() => abrirCamara("vertical")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="7" y="2" width="10" height="20" rx="2" />
                        </svg>
                        <span>Vertical</span>
                      </BotonOrientacion>
                      <BotonOrientacion type="button" onClick={() => abrirCamara("horizontal")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="10" rx="2" />
                        </svg>
                        <span>Horizontal</span>
                      </BotonOrientacion>
                    </ContenedorOpciones>
                  </SelectorOrientacion>
                )}
              </div>
            </>
          )}
        </FormularioSubirImagen>
      </ContenedorModalV2>
    </ContenedorModalMovil>
  );
};
