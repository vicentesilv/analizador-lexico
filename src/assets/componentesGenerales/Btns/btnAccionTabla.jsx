import styled from "styled-components";

const StyledBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-principal);
  }
`;

export const BtnAccionTabla = ({ onClick, Icon, size = "20px", title }) => {
  return (
    <StyledBtn onClick={onClick} title={title}>
      <Icon size={size} />
    </StyledBtn>
  );
};
