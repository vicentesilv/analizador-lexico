import styled from "styled-components";
import { TxtGenerico } from "./Textos";


export const ContenedorHeaderTablaStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
    align-items: center;
`

export const ContenedorHeaderTablaGenerico = ({ txt, btns }) => {
    return (
        <ContenedorHeaderTablaStyled>
            <TxtGenerico size="24px">{txt}</TxtGenerico>

            {btns.map((btn, index) => (
                <div key={index}>{btn}</div>
            ))}

        </ContenedorHeaderTablaStyled>
    )
}
export const ContenedorMediano = styled.div`
  width: 100%;
  padding:  0;
    padding-top: 0px;
  align-items: center;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContenedorIconosAccion = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 0;
`;

export const IconoAccion = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;
