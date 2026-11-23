import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useSubHeaderStore } from "../../store/useSubHeaderStore";
import { useEffect, useRef, useState } from "react";
const SubHeaderStyled = styled.div`
    height: ${({ $compacto }) => $compacto ? "64px" : "54px"};
    background-color: white;
    border-bottom: 1px solid var(--gris-200);
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: ${({ $compacto }) => $compacto ? "0px" : "64px"};
    left: ${({ $colapsado }) => $colapsado ? "64px" : "174px"};
    right: 0;
    z-index: 99;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s ease, height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    ${({ $compacto }) => $compacto && `
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    `}

    @media (max-width: 1100px) {
        top: 64px;
        left: 0;
        height: 44px;
        padding: 0 12px;
    }
`;

const BtnRegresarSubHeader = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--colorPrincipal);
    padding: 0;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateX(-4px);
    }
`;

const AccionesDerecha = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;

    @media (max-width: 1100px) {
        gap: 12px;
    }

    svg,
    img {
        cursor: pointer;
        transition: transform 0.2s ease;
        transform: scale(0.9);
    }

    svg:hover,
    img:hover {
        transform: scale(1);
    }
`;

const AccionItem = styled.span`
    display: flex;
    align-items: center;
`;
const DetalleSubHeader = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 12px 0 20px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #374151;
`;
export const SubHeader = ({ colapsado, compacto, detalle }) => {
    const onRegresar = useSubHeaderStore((state) => state.onRegresar);
    const accionesDerecha = useSubHeaderStore((state) => state.accionesDerecha);
    const scrollContainerRef = useSubHeaderStore((state) => state.scrollContainerRef);
    const subHeaderRef = useRef(null);
    const botonRef = useRef(null);
    const accionesRef = useRef(null);
    const ocultarDetalle = useSubHeaderStore((state) => state.ocultarDetalle);
    const [mostrarDetalle, setMostrarDetalle] = useState(true);

    const [esPantallaPequena, setEsPantallaPequena] = useState(
        window.innerWidth <= 1100
    );
    useEffect(() => {
        const handleResize = () => {
            setEsPantallaPequena(window.innerWidth <= 1100);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleRegresar = () => {
        if (scrollContainerRef?.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        setTimeout(() => {
            onRegresar();
        }, 300);
    };
    if (!onRegresar) return null;
    return (
        <SubHeaderStyled
            ref={subHeaderRef}
            $colapsado={colapsado}
            $compacto={compacto}
        >
            <BtnRegresarSubHeader
                ref={botonRef}
                onClick={handleRegresar}
            >
                <FaArrowLeft size={35} title="Regresar" />
            </BtnRegresarSubHeader>

            {!(esPantallaPequena && ocultarDetalle) && (
                <DetalleSubHeader>
                    {detalle}
                </DetalleSubHeader>
            )}
            {accionesDerecha.length > 0 && (
                <AccionesDerecha ref={accionesRef}>
                    {accionesDerecha.map((accion, index) => (
                        <AccionItem key={index} onClick={accion.onClick} title={accion.title}>
                            {accion.icono}
                        </AccionItem>
                    ))}
                </AccionesDerecha>
            )}
        </SubHeaderStyled>
    );
};
