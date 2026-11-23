import { useState } from "react";
import styled from "styled-components";
import { BtnSecundario, BtnSubmit } from "../Formularios/FormulariosV1";
import { subirImagen } from "../../funciones/services/cargaArchivos";
import { createGlobalStyle } from "styled-components";
import { Alert } from "../../ui/Alert";
import { ModalGenerico } from "../Genericos/ModalGenerico";

const GlobalStyles = createGlobalStyle`
  .swal2-container {
    z-index: 99999 !important;
  }
  .swal2-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ModalContenido = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  background: white;
  padding: 24px;
  border-radius: var(--bordeRadiusGenerico);
  overflow-y: auto;
  box-sizing: border-box;
`;
const Titulo = styled.h2`
  text-align: center;
  margin: 0 0 16px 0;
  font-weight: 600;
  font-size: 18px;
`;
const ContenedorBtns = styled.div`
  display: flex;
  gap: 12px;
  margin:  0 auto;
  margin-top: 20px;
  justify-content: center;
`;
const ContenedorOpciones = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;
const BotonOpcion = styled.button`
  flex: 1;
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
    font-size: 32px;
    color: #555;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
`;
const InputOculto = styled.input`
  display: none;
`;
const TextoWrapper = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;
const TextoSecundario = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;
const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`;
const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
`;
const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--bordeRadiusGenerico);
`;
const BotonRemover = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: #1D1D1B;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;
const BotonAgregar = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #1D1D1B;
  color: white;
  cursor: pointer;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin: 0 auto;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;
export const ModalSubirImagen = ({
  setModalSubir,
  setImagenes,
  setGuardar,
  folio,
  maxImagenes = 6,
  imagenesActuales = 0
}) => {
  const MAX_FILE_SIZE = 4 * 1024 * 1024;
  const [imagenesPreview, setImagenesPreview] = useState([]);
  const [archivosImagenes, setArchivosImagenes] = useState([]);
  const [mostrarPreview, setMostrarPreview] = useState(false);
  const [ultimoOrigen, setUltimoOrigen] = useState(null);

  const calcularEspaciosDisponibles = () => maxImagenes - imagenesActuales;

  const procesarArchivos = (files, origen) => {
    const archivosArray = Array.from(files);
    const disponibles = calcularEspaciosDisponibles();

    if (archivosArray.length > disponibles) {
      Alert.warning(
        "Limite excedido",
        `Solo puedes agregar ${disponibles} imagen(es) mas. Ya tienes ${imagenesActuales} de ${maxImagenes}.`
      );
      return;
    }

    const archivosValidos = archivosArray.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        Alert.error("Archivo muy grande", `${file.name} excede los 4MB permitidos.`);
        return false;
      }
      return true;
    });

    if (archivosValidos.length > 0) {
      setArchivosImagenes(prev => [...prev, ...archivosValidos]);
      const previews = archivosValidos.map(file => URL.createObjectURL(file));
      setImagenesPreview(prev => [...prev, ...previews]);
      setMostrarPreview(true);
      setUltimoOrigen(origen);
    }
  };

  const seleccionarDeGaleria = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      procesarArchivos(files, "galeria");
    }
    e.target.value = "";
  };

  const tomarFoto = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      procesarArchivos(files, "camara");
    }
    e.target.value = "";
  };

  const handleAgregarMas = () => {
    if (ultimoOrigen === "camara") {
      document.getElementById("inputCamara").click();
    } else {
      document.getElementById("inputGaleriaMultiple").click();
    }
  };

  const removerImagenPreview = (index) => {
    URL.revokeObjectURL(imagenesPreview[index]);
    setArchivosImagenes(prev => prev.filter((_, i) => i !== index));
    setImagenesPreview(prev => prev.filter((_, i) => i !== index));
  };

  const cancelarSubida = () => {
    imagenesPreview.forEach(url => URL.revokeObjectURL(url));
    setImagenesPreview([]);
    setArchivosImagenes([]);
    setMostrarPreview(false);
    setModalSubir(false);
  };

  const [subiendo, setSubiendo] = useState(false);

  const guardarImagenes = async () => {
    if (archivosImagenes.length === 0) {
      Alert.warning(
        "Sin imagen",
        "Debes seleccionar al menos una imagen antes de guardar."
      );
      return;
    }

    setSubiendo(true);

    Alert.fire({
      title: "Subiendo imágenes...",
      text: "Por favor espera",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Alert.showLoading();
      }
    });

    try {
      const nuevasImagenes = [];

      for (const archivo of archivosImagenes) {
        const res = await subirImagen(archivo, {
          ruta: `patologias/${folio}`,
          rutaAbsoluta: true,
        });

        if (res.success) {
          nuevasImagenes.push({
            tamano: res.data.tamanio,
            ruta: res.data.ruta,
            url: res.data.url,
            puntos: []
          });
        }
      }

      if (nuevasImagenes.length > 0) {
        setImagenes(prev => [
          ...nuevasImagenes,
          ...prev
        ]);

        setGuardar(true);
      }

      imagenesPreview.forEach(url => URL.revokeObjectURL(url));

      setImagenesPreview([]);
      setArchivosImagenes([]);
      setMostrarPreview(false);

      Alert.close();

      setModalSubir(false);

    } catch (error) {
      console.error(error);

      Alert.close();

      Alert.error(
        "Error",
        "Ocurrió un error al subir las imágenes"
      );
    } finally {
      setSubiendo(false);
    }
  };


  return (
    <ModalGenerico
      isOpen
      onClose={() => {
        if (!subiendo) {
          setModalSubir(false);
        }
      }}
      noBtnCerrar
    >
      <GlobalStyles />
      <ModalContenido>
        <Titulo>Agregar Imagenes</Titulo>

        <TextoWrapper>
          <TextoSecundario>
            Espacios disponibles: {calcularEspaciosDisponibles()} de {maxImagenes}
          </TextoSecundario>
        </TextoWrapper>

        {mostrarPreview ? (
          <>
            <PreviewGrid>
              {imagenesPreview.map((preview, index) => (
                <PreviewItem key={index}>
                  <PreviewImg src={preview} alt={`Preview ${index + 1}`} />
                  <BotonRemover onClick={() => removerImagenPreview(index)}>
                    x
                  </BotonRemover>
                </PreviewItem>
              ))}
            </PreviewGrid>

            {(imagenesActuales + imagenesPreview.length) < maxImagenes && (
              <BotonAgregar onClick={handleAgregarMas}>
                +
              </BotonAgregar>
            )}

            <ContenedorBtns >
              <BtnSubmit
                onClick={guardarImagenes}
                disabled={subiendo}
              >
                {subiendo
                  ? "Subiendo..."
                  : `Guardar`}
              </BtnSubmit>
              <BtnSecundario
                onClick={cancelarSubida}
                disabled={subiendo}
              >
                Cancelar
              </BtnSecundario>
            </ContenedorBtns>
          </>
        ) : (
          <>
            <ContenedorOpciones>
              <BotonOpcion onClick={() => document.getElementById("inputCamara").click()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>Tomar foto</span>
              </BotonOpcion>

              <BotonOpcion onClick={() => document.getElementById("inputGaleriaMultiple").click()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Cargar imagen</span>
              </BotonOpcion>
            </ContenedorOpciones>

            <ContenedorBtns>
              <BtnSecundario onClick={cancelarSubida} style={{ width: "100%" }}>Cancelar</BtnSecundario>
            </ContenedorBtns>
          </>
        )}

        <InputOculto
          id="inputCamara"
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={tomarFoto}
        />

        <InputOculto
          id="inputGaleriaMultiple"
          type="file"
          accept="image/*"
          multiple
          onChange={seleccionarDeGaleria}
        />
      </ModalContenido>
    </ModalGenerico>
  );
}
