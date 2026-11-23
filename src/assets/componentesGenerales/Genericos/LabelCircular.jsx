import styled from 'styled-components'
import { TxtGenerico } from './Textos'

const ContenedorField = styled.div`
  width: 100%;
  height: 60px;
  border: solid 2px black;
  border-radius: var(--bordeRadiusGenerico);
  position: relative;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color || 'transparent'};
`

const LabelMenuPrincipalStyled = styled.p`
  position: absolute;
  left: 20px;
  border-radius: var(--bordeRadiusGenerico);
  font-size: 12px;
  top: -15px;
  background-color: ${props => props.color || 'white'};
  color: ${props => props.colorSecundario || ''};
 
  padding: 5px;
  border: solid 2px black;
`
const SelectStyled = styled.select`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
`;

export const LabelMenuPrincipal = ({txt = "titular", value = "valor", color, colorSecundario="black"}) => {
  return(
    <ContenedorField color={color}>
      <LabelMenuPrincipalStyled color={color} colorSecundario={colorSecundario}> {txt} </LabelMenuPrincipalStyled>
      <TxtGenerico color={colorSecundario} size="14px"> {value} </TxtGenerico>
    </ContenedorField>
  )
}

export const ComboMenuPrincipal = ({
  txt,
  value,
  options = [],
  onChange,
  color
}) => {
  return (
    <ContenedorField color={color}>
      <LabelMenuPrincipalStyled color={color}>{txt}</LabelMenuPrincipalStyled>

      <SelectStyled
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Seleccionar...</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectStyled>
    </ContenedorField>
  );
};
const InputStyled = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
`;

export const InputMenuPrincipal = ({
  txt,
  value,
  onChange,
  color,
  type = "text",
  placeholder = ""
}) => {
  return (
    <ContenedorField color={color}>
      <LabelMenuPrincipalStyled color={color}>
        {txt}
      </LabelMenuPrincipalStyled>

      <InputStyled
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </ContenedorField>
  );
};