import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BtnGenerico } from "../Btns/BtnsGenericos";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: ${({ $centrar }) => $centrar ? "center" : "start"};
  z-index: 10000;

  @media (max-width: 768px) {
    align-items: flex-end;
    overflow: hidden;
  }
`;

const ModalContainer = styled(motion.div)`
  background: white;
  width: 860px;
  max-width: 95vw;
  max-height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 45px 50px;
  border-radius: 16px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10001;
  margin-top: 2.5% !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    width: 100% !important;
    max-width: 100% !important;
    max-height: 92dvh;
    margin-top: 0 !important;
    padding: 20px 16px calc(20px + env(safe-area-inset-bottom, 0px));
    border-radius: 22px 22px 0 0;
    gap: 16px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: ${({ $centrar }) => $centrar ? "center" : "space-between"};
  align-items: flex-start;
  gap: 20px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  flex: 1;
`;

const FilaSuperior = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const IconoContenedor = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.7rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -1px;
  line-height: 1.1;

  @media (max-width: 480px) {
    font-size: 1.25rem;
    letter-spacing: -0.5px;
  }
`;

const Subtitle = styled.div`
  margin: 0;
  font-size: 1.05rem;
  color: #666;
  line-height: 1.6;
`;

const Body = styled.div`
  min-width: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

`;

const estilosBotonPorVariante = {
  principal: {
    backgroundColor: "#b48c5d",
    color: "white",
    width: "200px",
    height: "52px",
    fontWeight: "700",
    borderRadius: "8px",
    border: "none",
    fontSize: "0.95rem",
    padding: "0",
  },
  secundario: {
    backgroundColor: "#02142A",
    color: "white",
    width: "200px",
    height: "52px",
    fontWeight: "700",
    borderRadius: "8px",
    border: "none",
    fontSize: "0.95rem",
    padding: "0",
  },
};

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;

  &:hover {
    color: red;
  }
`;

export const ContenedorModalV2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalGenericoV2 = ({
  isOpen,
  onClose,
  onCerrar,
  children,
  noBtnCerrar,
  titulo,
  subtitulo,
  icono,
  botones,
  modalStyle,
  ocultarCerrar = false,
  onClickIcono,
  centrarModal = false,
}) => {
  const mostrarHeader = Boolean(titulo || subtitulo || icono);
  const mostrarBotones = Array.isArray(botones) && botones.length > 0;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay
          $centrar={centrarModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          onClick={onClose}
        >
          <ModalContainer
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {!noBtnCerrar && !ocultarCerrar && (
              <CloseButton onClick={onCerrar ?? onClose}>
                <IoClose />
              </CloseButton>
            )}

            {mostrarHeader && (
              <Header>
                <HeaderInfo>
                  <FilaSuperior>
                    <IconoContenedor
                      as={onClickIcono ? "button" : "div"}
                      onClick={onClickIcono}
                      style={onClickIcono ? { border: "none", background: "transparent", cursor: "pointer", padding: 0 } : undefined}
                    >
                      {icono}
                    </IconoContenedor>
                    {titulo && <Title>{titulo}</Title>}
                  </FilaSuperior>

                  {subtitulo && (
                    <Subtitle>{subtitulo}</Subtitle>
                  )}
                </HeaderInfo>
              </Header>
            )}

            <Body>{children}</Body>

            {mostrarBotones && (
              <Footer>
                {botones.map((boton, index) => (
                  <BtnGenerico
                    key={boton.key ?? boton.texto ?? index}
                    txt={boton.texto}
                    onClick={boton.onClick}
                    style={estilosBotonPorVariante[boton.variante] ?? estilosBotonPorVariante.principal}
                  />
                ))}
              </Footer>
            )}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};
