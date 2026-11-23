import styled from "styled-components";

export const ModalFormParent = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const ModalFormContainer = styled.div`
  width: min(700px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  background-color: white;
  padding: 40px;

  @media (max-width: 768px) {
    width: min(700px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: 20px 16px;
    gap: 14px;
  }
`;

export const ModalFormFields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  flex: 1;
  gap: 15px;
  overflow-y: auto;
`;
