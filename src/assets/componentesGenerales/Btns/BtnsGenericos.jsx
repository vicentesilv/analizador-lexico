import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
const BtnGenericoStyled = styled.button`
  padding: 12px 20px;
  background-color: white;
  color: var(--colorPrincipal, var(--azul-enlace));
  border: 2px solid var(--colorPrincipal, var(--azul-enlace));
  border-radius: var(--bordeRadiusGenerico);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s ease-in-out;



  &:active {
    transform: scale(0.95);
  }
  &:hover {
    transform: scale(0.95);
  }
`;

export const BtnGenerico = ({ onClick, txt, style, type = "button", disabled = false }) => {
  return (
    <BtnGenericoStyled type={type} style={style} onClick={onClick} disabled={disabled}>{txt}</BtnGenericoStyled>
  )
};

export const BtnGenericoS = ({ onClick, txt, type = "button", disabled }) => {
  return (
    <BtnGenericoStyled type={type} onClick={onClick} disabled={disabled}>
      {txt}
    </BtnGenericoStyled>
  )
};


const BtnIconoCuadradoStyled = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--bordeRadiusGenerico);
  background-color: white;
  border: solid 2px var(--colorPrincipal);
  cursor: pointer;
  color: var(--colorPrincipal);
  transition: .2s ease transform;

  &:hover{
    transform: scale(.95);
    transition: .2s ease transform;
  }
`
export const BtnIconoCuadrado = ({ onClick, icono = <IoArrowBack size={30} /> }) => {
  return (
    <BtnIconoCuadradoStyled onClick={() => onClick()}>{icono}</BtnIconoCuadradoStyled>
  )
};

const BotonFlotante = styled.button`
  background: white;
  border: 1px solid var(--pizarra-200);
  width: 42px;
  height: 42px;

  border-radius: ${({ borderRadius }) => borderRadius || "50%"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #4a5568;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  transform: scale(0.95);

  &:hover {
    transform: scale(1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    background-color: var(--colorPrincipal);
    color: var(--pizarra-50);
    border-color: var(--colorPrincipal);

    ${({ hoverAnimation }) => hoverAnimation}
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ styles }) => styles}
`;
export const BtnGenericoV2 = ({
  icono=<MdErrorOutline/>,
  borderRadius="50%",
  onClick,
  styles,
  hoverAnimation
}) => {
  return (
    <BotonFlotante
      styles={styles}
      onClick={onClick}
      hoverAnimation={hoverAnimation}
      borderRadius={borderRadius}

    >
      {icono}
    </BotonFlotante>
  )

}
