// componentesGenerales/Genericos/ReproductorAudio.jsx

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import { IconoGuardar } from "./headerGenerico";

const Contenedor = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Boton = styled.button`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid black;
    background: white;
    color: var(--colorPrincipal);
    cursor: pointer;

    &:hover{
        background: var(--colorPrincipal);
        color:white;
    }
`;

const Barra = styled.input`
    width: ${({ width }) => width || "180px"};
`;

const Tiempo = styled.span`
    font-size: 13px;
    min-width: 90px;
`;
const formatear = (segundos = 0) => {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);

    return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
};
export const ReproductorAudio = ({
    url,
    width = "180px"
}) => {

    const audioRef = useRef(null);

    const [reproduciendo, setReproduciendo] = useState(false);
    const [duracion, setDuracion] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [, setArrastrando] = useState(false);
    useEffect(() => {

        const audio = audioRef.current;

        if (!audio) return;

        const cargar = () => setDuracion(audio.duration || 0);

        const actualizar = () => setTiempo(audio.currentTime);

        const terminar = () => {
            setReproduciendo(false);
            setTiempo(0);
        };

        audio.addEventListener("loadedmetadata", cargar);
        audio.addEventListener("timeupdate", actualizar);
        audio.addEventListener("ended", terminar);
        const pausar = () => setReproduciendo(false);
        const reproducir = () => setReproduciendo(true);

        audio.addEventListener("pause", pausar);
        audio.addEventListener("play", reproducir);

        return () => {
            audio.removeEventListener("loadedmetadata", cargar);
            audio.removeEventListener("timeupdate", actualizar);
            audio.removeEventListener("ended", terminar);
            audio.removeEventListener("pause", pausar);
            audio.removeEventListener("play", reproducir);
        };

    }, [url]);
    useEffect(() => {
        setReproduciendo(false);
        setTiempo(0);
        setDuracion(0);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [url]);
    const playPause = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const cambiarTiempo = (e) => {

        audioRef.current.currentTime = Number(e.target.value);

        setTiempo(Number(e.target.value));
    };
    return (
        <Contenedor>

            <IconoGuardar
                onClick={playPause}
                disabled={!url}
            >
                {reproduciendo ? <FaPause size={30} /> : <FaPlay size={30} />}
            </IconoGuardar>

            {reproduciendo && (
                <>
                    <Barra
                        width={width}
                        type="range"
                        min={0}
                        max={duracion}
                        step={0.01}
                        value={tiempo}
                        onMouseDown={() => setArrastrando(true)}
                        onMouseUp={(e) => {
                            audioRef.current.currentTime = Number(e.target.value);
                            setTiempo(Number(e.target.value));
                            setArrastrando(false);
                        }}
                        onChange={(e) => {
                            setTiempo(Number(e.target.value));
                        }}
                    />

                    <Tiempo>
                        {formatear(tiempo)} / {formatear(duracion)}
                    </Tiempo>
                </>
            )}

            <audio
                ref={audioRef}
                src={url}
                preload="metadata"
                style={{ display: "none" }}
            />

        </Contenedor>
    );
};