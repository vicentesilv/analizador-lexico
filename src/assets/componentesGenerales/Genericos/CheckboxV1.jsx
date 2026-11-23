
import styled from "@emotion/styled";


const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  user-select: none;
  
  &:hover .checkbox-box {
    background-color: ${props => props.checked ? "var(--colorPrincipal, var(--azul-enlace))" : "rgba(0,0,0,0.05)"};
    border-color: var(--colorPrincipal, var(--azul-enlace));
    transform: scale(1.05);
  }
  
  &:active .checkbox-box {
    transform: scale(0.95);
  }
`;


const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;
`;


const StyledBox = styled.div`
  width: 22px;
  height: 22px;
  border-radius: var(--bordeRadiusGenerico);
  border: 2px solid ${props => props.checked ? "var(--colorPrincipal, var(--azul-enlace))" : "var(--gris-300)"};
  background-color: ${props => props.checked ? "var(--colorPrincipal, var(--azul-enlace))" : "white"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.checked ? "0 2px 4px rgba(0, 123, 255, 0.2)" : "none"};
  
  svg {
    fill: none;
    stroke: white;
    stroke-width: 3.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 20;
    stroke-dashoffset: ${props => props.checked ? 0 : 20};
    transition: all 0.3s ease-in-out;
    width: 14px;
    height: 14px;
  }
`;

/**
 * Componente Checkbox Genérico V1 construido desde cero con Emotion
 * @param {boolean} checked - Estado del checkbox
 * @param {function} onChange - Función que recibe el nuevo estado booleano
 * @param {object} style - Estilos en línea adicionales
 */
export const CheckboxV1 = ({ checked, onChange, style, ...props }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <CheckboxContainer
      style={style}
      onClick={handleClick}
      checked={checked}
    >
      <HiddenCheckbox
        type="checkbox"
        checked={!!checked}
        onChange={() => { }}
        {...props}
      />
      <StyledBox className="checkbox-box" checked={checked}>
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </StyledBox>
    </CheckboxContainer>
  );
};

export default CheckboxV1;
