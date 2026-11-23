import styled from "styled-components";
import { Card } from "./estilosCelular";

export const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MobileActionButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: #02142a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }
`;

export const MobileCard = styled(Card)`
  display: block;
  padding: 16px;
  cursor: ${({ $clickable }) => $clickable ? "pointer" : "default"};
`;

export const MobileCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const MobileCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 10px;
`;

export const MobileCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e8eaed;
`;

export const MobileCardActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 10px;
  padding: 9px 11px;
  background: ${({ $danger }) => $danger ? "#fff0f0" : "#edf2f7"};
  color: ${({ $danger }) => $danger ? "#b42318" : "#172b4d"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;
