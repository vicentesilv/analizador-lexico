import { forwardRef } from "react";
import styled from "styled-components";
import { Drawer } from "vaul";

export const obtenerEstilosModalMovil = (esMovil) => ({
  width: esMovil ? "100vw" : "700px",
  maxWidth: esMovil ? "100vw" : "95vw",
  height: esMovil ? "50vh" : "370px",
  maxHeight: esMovil ? "50vh" : "calc(100vh - 60px)",
  padding: esMovil ? "10px 12px 16px" : "40px",
  borderRadius: esMovil ? "22px 22px 0 0" : "12px",
  gap: esMovil ? "10px" : "20px",
  margin: esMovil ? "50vh 0 0" : "164px auto auto",
  boxSizing: "border-box",
});

export const obtenerOverlayModalMovil = (esMovil) =>
  (esMovil ? { padding: 0 } : undefined);

export const BotonCerrarModalMovil = styled.button`
  border: 0;
  background: transparent;
  color: #1e3a5f;
  font-size: 22px;
  cursor: pointer;
  padding: 4px;
  text-align: center;
`;

const OverlayModalMovil = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.6);
`;

const ContenidoModalMovil = styled(Drawer.Content)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
  width: 100%;
  min-height: 0;
  height: auto;
  max-height: calc(100dvh - env(safe-area-inset-top, 0px));
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.18);
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  border-radius: 22px 22px 0 0;

  > * {
    min-height: 0;
    max-width: 100%;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
    background: transparent;
  }
`;

const AsaModalMovil = styled(Drawer.Handle)`
  flex-shrink: 0;
  width: 42px;
  height: 5px;
  margin: 8px auto 4px;
  border-radius: 999px;
  background: #cbd5e1;
`;

const TituloAccesible = styled(Drawer.Title)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const DescripcionAccesible = styled(Drawer.Description)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const ContenedorModalMovil = forwardRef(function ContenedorModalMovil(
  {
    isOpen = true,
    onClose,
    children,
    tituloAccesible = "Modal",
    descripcionAccesible,
    soloAsa = false,
    ...props
  },
  ref,
) {
  const manejarCambioApertura = (abierto) => {
    if (!abierto) onClose?.();
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={manejarCambioApertura}
      direction="bottom"
      handleOnly={soloAsa}
    >
      <Drawer.Portal>
        <OverlayModalMovil />
        <ContenidoModalMovil ref={ref} {...props}>
          <TituloAccesible>{tituloAccesible}</TituloAccesible>
          {descripcionAccesible && (
            <DescripcionAccesible>
              {descripcionAccesible}
            </DescripcionAccesible>
          )}
          <AsaModalMovil />
          {children}
        </ContenidoModalMovil>
      </Drawer.Portal>
    </Drawer.Root>
  );
});
