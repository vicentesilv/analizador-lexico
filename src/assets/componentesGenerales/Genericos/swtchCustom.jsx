import styled from "styled-components";

const StyledSwitch = styled.div`
  width: 44px;
  height: 22px;
  background: ${({ activo }) => (activo ? "var(--colorPrincipal, #02142A)" : "#ccc")};
  border-radius: 12px;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  display: inline-block;

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background: #fff;
    transition: 0.3s;
    transform: ${({ activo }) => (activo ? "translateX(22px)" : "translateX(0)")};
  }
`;

/**
 * Componente Switch Custom con diseño premium
 * @param {boolean} estado - Estado del switch (true/false)
 * @param {function} onClick - Función al hacer click, recibe el nuevo estado
 * @param {boolean} disabled - Si está deshabilitado
 * @param {string} title - Tooltip
 */
export const SwitchCustom = ({ onClick, estado, disabled = false, title = "" }) => {

  const handleClick = (e) => {
    e.stopPropagation(); // Evitamos que el click afecte a elementos superiores (como filas de tablas)

    if (disabled) return;

    if (onClick) {
      onClick(!estado);
    }
  };

  return (
    <StyledSwitch
      activo={estado}
      onClick={handleClick}
      disabled={disabled}
      title={title}
    />
  );
};