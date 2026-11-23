import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const Boton = styled.button`
  position: relative;
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #02142A;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.08);
  }
  img,
  svg {
    width: ${({ iconWidth }) => iconWidth || '120%'};
    height: ${({ iconHeight }) => iconHeight || '100%'};
  }



`;


export const BotonIcono = ({
  icono = <FaPlus />,
  size = '40px',
  iconWidth,
  iconHeight,
  handleClick,
  descripcion
}) => {

  const isURL = typeof icono === 'string';

  return (
    <Boton
      size={size}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      onClick={handleClick}
      title={descripcion}
    >
      {
        isURL ? (
          <img
            src={icono}
            alt="icono botón"
          />
        ) : (
          <icono.type {...icono.props} />
        )
      }
    </Boton>
  );
};
