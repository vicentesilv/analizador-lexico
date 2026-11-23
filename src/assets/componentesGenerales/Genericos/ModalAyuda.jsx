import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { ModalGenerico } from "./ModalGenerico";
import { subPatologias } from "../../src/constantes/subPatologias";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import { ContenedorBuscador, IconoBuscador, InputBuscador } from "../../paginas/Home/HomeUx";
import { TituloModal } from "./estilosModal";
import { HeaderGenerico } from "./headerGenerico";
const Contenedor = styled.div`
  width: ${({ esCelular }) => (esCelular ? "95vw" : "900px")};
  height: ${({ esCelular }) => (esCelular ? "90vh" : "560px")};

  display: flex;
  flex-direction: column;

  overflow: hidden;

  padding: ${({ esCelular }) => (esCelular ? "15px" : "40px")};
`;

const Header = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 10px;
`;

const Buscador = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  color: var(--colorPrincipal);
  height: 60px;
  padding: 5px 10px;
  width: 100%;
  border: solid 2px #232121;
  border-radius: var(--bordeRadiusGenerico);
  font-size: 18px;

  input{
    border:none;
    outline:none;
    margin-left:8px;
    flex:1;
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;

  flex-direction: ${({ esCelular }) =>
    esCelular ? "column" : "row"};

  gap: 15px;

  overflow: hidden;
`;

const Lista = styled.div`
  width: ${({ esCelular }) => (esCelular ? "100%" : "280px")};

  flex-shrink: 0;

  overflow-y: auto;

  border-right: ${({ esCelular }) =>
    esCelular ? "none" : "1px solid #ddd"};

  border-bottom: ${({ esCelular }) =>
    esCelular ? "1px solid #ddd" : "none"};

  padding-right: 10px;

  max-height: ${({ esCelular }) => (esCelular ? "220px" : "100%")};
`;

const Item = styled.div`
  font-weight:600;
  text-decoration: underline;
  color:#2b5fad;
  margin-bottom:6px;
  cursor:pointer;
`;

const Preview = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f8f8f8;
  border-radius: var(--bordeRadiusGenerico);
  border: 1px solid #ddd;

  overflow: hidden;

  min-height: ${({ esCelular }) => (esCelular ? "250px" : "0")};
`;
const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  border-radius: var(--bordeRadiusGenerico);
`;
export const ModalAyuda = ({ modalAyuda, setModalAyuda }) => {


  const [esCelular, setEsCelular] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setEsCelular(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [busqueda, setBusqueda] = useState("");
  const [ayuda, setAyuda] = useState(false);
  const [imagen, setImagen] = useState(null);
  const listaPatologias = useMemo(() => {
    return Object.entries(subPatologias).flatMap(([categoria, items]) =>
      items
        .filter(i => i.label !== "Pendiente")
        .map(i => ({
          ...i,
          categoria
        }))
    );
  }, []);

  if (!modalAyuda) return null;

  // 🔹 convertir objeto en lista plana


  // 🔹 filtrar por buscador
  const filtradas = listaPatologias.filter(p =>
    `${p.categoria} ${p.label}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <ModalGenerico isOpen={modalAyuda} onClose={() => setModalAyuda(false)} noBtnCerrar>

      <Contenedor esCelular={esCelular}>

        <HeaderGenerico
          onRegresar={() => setModalAyuda(false)}
          titulo={<>AYUDA</>}
          childrenDerecha={<>
            <InputBuscador
              style={{
                width: esCelular ? "100%" : "320px"
              }}
              type="text"
              placeholder="¿Qué patología deseas buscar?"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <IconoBuscador>
              <FaSearch />
            </IconoBuscador>
          </>}
        />

        <Body esCelular={esCelular}>

          <Lista esCelular={esCelular}>

            {filtradas.map((p, i) => (
              <Item
                key={i}
                onClick={() => setImagen(p.img)}
              >
                {p.categoria.toUpperCase()} - {p.label.toUpperCase()}
              </Item>
            ))}

          </Lista>

          <Preview esCelular={esCelular}>
            {imagen ? (
              <Imagen
                src={imagen.src}
                alt={imagen.alt} />
            ) : (
              <div
                style={{
                  color: "#888",
                  textAlign: "center",
                  padding: 20
                }}
              >
                Selecciona una patología valida para ver su imagen
              </div>
            )}
          </Preview>

        </Body>

      </Contenedor>

    </ModalGenerico>
  );
};