import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { BotonIcono } from "../Btns/btnIcono";
import { IoMdSearch } from "react-icons/io";

const ContenedorBuscador = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContenedorTop = styled.div`
  height: 100%;
  width: 100%;
  gap: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const ContenedorResultados = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: var(--bordeRadiusGenerico);
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999999999999999999999;
`;

const Resultado = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const IconoBusqueda = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--colorPrincipal);
  font-size: 18px;
  pointer-events: none; /* importante */
`;
const InputStyled = styled.input`
  background-color: white;
  width: 100%;
  padding: 0 20px 0 40px; /* espacio para icono */
  border: solid 2px var(--colorPrincipal);
  border-radius: var(--bordeRadiusGenerico);
  color: var(--colorPrincipal);
  font-size: 18px;
  height: 40px;

  &::placeholder {
    color: var(--colorPrincipal);
  }
   &:focus {
    outline: none;
    border: 2px solid var(--colorPrincipal);
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1); /* opcional bonito */
  }
`;
export const Search = ({
  consulta,
  onSelect = () => { },
  placeholder = "Buscar...",
  renderResultado = (item) => item.folio || JSON.stringify(item),
}) => {
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const inputRef = useRef(null);

  const ejecutarBusqueda = async (valor) => {
    if (!valor.trim()) {
      setResultados([]);
      setBuscado(false);
      return;
    }

    try {
      const data = await consulta(valor);
      const items = data?.success ? data.data : (Array.isArray(data) ? data : []);
      setResultados(items);
      setBuscado(true);
    } catch (error) {
      console.error("Error en Search:", error);
      setResultados([]);
      setBuscado(false);
    }
  };

  const handleInputChange = (e) => {
    let valor = e.target.value.toUpperCase();

    e.target.value = valor; // 

    if (valor.trim() === "") {
      setResultados([]);
      setBuscado(false);
    } else {
      ejecutarBusqueda(valor);
    }
  };


  return (
    <ContenedorBuscador>
      <InputWrapper>
        <IconoBusqueda>
          <IoMdSearch />
        </IconoBusqueda>

        <InputStyled
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </InputWrapper>

      {buscado && (
        <ContenedorResultados>
          {resultados.length > 0 ? (
            resultados.map((item, index) => (
              <Resultado
                key={item.id || index}
                onClick={() => {
                  onSelect(item);
                  setResultados([]);
                  setBuscado(false);
                }}
              >
                {renderResultado(item)}
              </Resultado>
            ))
          ) : (
            <Resultado>No se encontraron resultados</Resultado>
          )}
        </ContenedorResultados>
      )}
    </ContenedorBuscador>
  );
};

