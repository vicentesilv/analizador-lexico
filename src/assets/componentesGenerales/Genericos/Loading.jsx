import React from "react";
import styled, { keyframes } from "styled-components";

// Definimos la animación de rotación
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100vh; 
  width: 100vw;  
`;


const SpinningWheel = styled.div`
  animation: ${spin} 1s linear infinite;
  border: 4px solid var(--pizarra-200);
  border-left-color: var(--colorPrincipal, #3b82f6);
  border-radius: 50%;
  height: ${(props) => props.height || "32px"}; 
  width: ${(props) => props.width || "32px"};  
`;


const LoadingInlineContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: auto;
  height: auto;
  padding: 0;
  background: transparent;
  border-radius: 8px;
  flex-shrink: 0;
`;


export const Loading = ({ src = "", height, width, fullscreen = true }) => {
  if (fullscreen) {
    return (
      <LoadingContainer>
        <SpinningWheel height={height} width={width} />
      </LoadingContainer>
    );
  }
  return (
    <LoadingInlineContainer>
      <SpinningWheel height={height} width={width} />
    </LoadingInlineContainer>
  );
};
