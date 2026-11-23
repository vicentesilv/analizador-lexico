import styled from "styled-components";

export const Contenedor = styled.div`
  padding: 0 16px 20px;
  background: #f5f6f8;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
`;


export const Header = styled.div`
 
  padding-bottom: 8px;
  border-bottom: 3px solid #c5c7cb;

  background: #f5f6f8;
 
  
`;


export const Titulo = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`;


export const Subtitulo = styled.p`
  margin: 4px 0 0;
  color: #555;
`;


export const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;


export const Card = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.06);
  cursor: pointer;

  transition: 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;


export const Numero = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-right: 16px;
`;


export const Nombre = styled.div`
  flex: 1;
  font-size: 14px;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.2;
`;


export const Badge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2f5d50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1; /* hace que todos ocupen el mismo ancho */
  min-width: 0;
  overflow: hidden;
`;

export const Label = styled.span`
  font-size: 10px;
  font-weight: 400;
  color: #777;
  text-transform: uppercase;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.1;
`;

export const BtnAtras = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #02142A;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const BotonAgregar = styled.div`
  margin-bottom: 0px;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: right;
  cursor: pointer;
`;
export const BotonFiltro = styled.div`
  margin-bottom: 0px;
  background: black;
  border-radius: var(--bordeRadiusGenerico);
  width: 25%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;
export const CardButton = styled.div`
  background: black;
  color: white;
  border-radius: 18px;
  aspect-ratio: 1 / 1; /* 👈 las hace cuadradas */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: 0.2s;

  &:active {
    transform: scale(0.97);
  }
`;

export const Texto = styled.span`
  font-size: 18px;
`;
export const ContenedorButton = styled.div`
  padding: 24px;
  background: #e9ecef;
  min-height: 100vh;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;
export const Item = styled.div`
  background: #e9ecef;
  border-radius: var(--bordeRadiusGenerico);
  padding: 18px;
  margin-bottom: 10px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: 0.2s;
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LadoIzquierdo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
`;

export const NumeroCombobox = styled.div`
  width: 32px;
  height: 32px;
  background: #1f3b64;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const TituloCombobox = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.35;
  min-width: 0;
`;

export const Contenido = styled.div`
  color: #555;
  gap: 10px;
`;
export const BotonGuardar = styled.button`
  width: 100%;
  background-color: #02142A;
  color: white;
  border: none;
  padding: 14px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;
