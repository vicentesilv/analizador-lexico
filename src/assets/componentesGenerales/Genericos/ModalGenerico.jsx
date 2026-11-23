import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

// ================== ESTILOS ==================

const Overlay = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== "centerOnMobile",
})`
  position: fixed;
  inset: 0;
  overflow-y: auto;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 30px 0;

  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;

  @media (max-width: 768px) {
    align-items: ${({ centerOnMobile }) => centerOnMobile ? "center" : "flex-start"};
    padding: ${({ centerOnMobile }) => centerOnMobile ? "16px" : "30px 0"};
  }
`;

const ModalContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["noBtnCerrar", "mobileFullWidth"].includes(prop),
})`
  background: white;
  width: auto;
  max-width: 95%;

  /* Antes era 95% */
  max-height: calc(100vh - 60px);

  overflow-y: auto;
  overflow-x: hidden;

  padding: ${(props) => props.noBtnCerrar ? "0" : "40px 0 0 0"};

  border-radius: 12px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0,0,0,.2);

  @media (max-width: 768px) {
    width: ${({ mobileFullWidth }) => mobileFullWidth ? "calc(100vw - 24px)" : "auto"};
    max-width: calc(100vw - 24px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;

  &:hover {
    color: red;
  }
`;

// ================== COMPONENTE ==================

export const ModalGenerico = ({ isOpen, onClose, onCerrar, children, noBtnCerrar, modalStyle, overlayStyle, centerOnMobile = false, mobileFullWidth = false, cerrarAlClickFuera = false }) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          centerOnMobile={centerOnMobile}
          style={overlayStyle}
          onClick={(event) => {
            if (cerrarAlClickFuera && event.target === event.currentTarget) {
              (onCerrar ?? onClose)?.();
            }
          }}
        >
          <ModalContainer
            noBtnCerrar={noBtnCerrar}
            mobileFullWidth={mobileFullWidth}
            style={modalStyle}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Renderiza el botón de cerrar solo si noBtnCerrar es falso */}
            {!noBtnCerrar && (
              <CloseButton onClick={onCerrar ?? onClose}>
                <IoClose />
              </CloseButton>
            )}

            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};
