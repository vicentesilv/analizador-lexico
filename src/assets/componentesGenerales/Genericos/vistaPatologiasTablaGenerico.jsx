import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InterfazTablaGenerica } from "../../ui/interfazTablaGenerica1/interfazTablaGenericaUx";
import { BtnGenericoV2 } from "../Btns/BtnsGenericos";
import { useValuacionesStore } from "../../store/useValuacionStore";
import { useContextoGeneral } from "../../contextos/ContextoGeneral";
import { escucharValuacion, eliminarObjetoDeEtapaAPI } from "../../funciones/firebase/v2/valuaciones";
import { Alert } from "@/assets/ui/Alert";
import { FaEllipsisV } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { BuscadorTabla } from "../../ui/interfazTablaGenerica1/buscadorTabla";
import { normalizarColeccionConId } from "../../funciones/normalizarColeccion";
import { GlobalStylesSweetAlert } from "./GlobalStylesGenericos";
import {
  Campo,
  Card,
  Contenedor,
  Header,
  Info,
  Label,
  Lista,
  Nombre,
  Subtitulo,
  Titulo,
} from "../Imagenes/estilosCelular";
import {
  MobileActionButton as BotonAccionMovil,
  MobileCard as TarjetaPatologia,
  MobileCardActions as AccionesTarjeta,
  MobileCardActionButton as BotonTarjeta,
  MobileCardGrid as DatosTarjeta,
  MobileCardHeader as EncabezadoTarjeta,
} from "../Imagenes/componentesCelular";

const ContenedorPatologias = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 10px;
`;

const columnasBase = [
  {
    field: "ubicacion-planta",
    headerName: "Planta-ubicación",
    flex: 2,
    minWidth: 200,
    valueGetter: (params) =>
      `${params.row.nivelDePlanta || "Sin nivel"} - ${params.row.ubicacion || "Sin ubicación"}`,
  },
  {
    field: "NoZona",
    headerName: "No. Zona",
    flex: 2,
    minWidth: 150,
    valueGetter: (params) =>
      `${params.row.NoZona || "Sin no. zona"} - ${params.row.zona || "Sin zona"}`,
  },
  {
    field: "area",
    headerName: "Área",
    flex: 2,
    minWidth: 150,
    valueGetter: (params) => params.row.area || "Sin área",
  },
  {
    field: "patologia",
    headerName: "Patología - Sub Patología",
    flex: 2,
    minWidth: 250,
    valueGetter: (params) =>
      `${params.row.patologia || "Sin patología"} - ${params.row.subPatologia || "Sin subpatología"}`,
  },
];

export const VistaPatologiasTablaGenerica = ({
  data,
  folio,
  idSeccion,
  idEtapa,
  bloqueado = false,
  columnas: columnasProp,
  btns = [],
  menuItems = [],
  renderModals,
  vistaDetalle: VistaDetalle,
  tituloDetalle,
  setOverrideRegresar,
  setTituloOverride,
  setAccionGuardar,
  setAccionGuardar2,
  setAccionGuardar3,
  setAccionGuardar4,
  onRegresarMobile,
  mobileTitle = "ANÁLISIS DE SOLUCIONES",
  onAgregarMobile,
}) => {
  const { usuario } = useContextoGeneral();
  const agregarPatologia = useValuacionesStore((state) => state.agregarPatologia);
  const actualizarPatologia = useValuacionesStore((state) => state.actualizarPatologia);


  const [filas, setFilas] = useState([]);
  const [filasVista, setFilasVista] = useState([]);
  const [patologiaSeleccionada, setPatologiaSeleccionada] = useState(null);
  const [patologiaSeleccionada2, setPatologiaSeleccionada2] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filaSeleccionadaMenu, setFilaSeleccionadaMenu] = useState(null);
  const esMobile = useMediaQuery("(max-width:768px)");

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setFilaSeleccionadaMenu(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setFilaSeleccionadaMenu(null);
  };

  const ejecutarMenuItem = (item, fila) => {
    setPatologiaSeleccionada2(fila);
    item.onClick(fila);
    handleCloseMenu();
  };

  useEffect(() => {
    const patologiasRaw =
      data?.secciones?.valuacionPatologia?.etapas?.inspeccionVisual?.data;
    if (!patologiasRaw) {
      setFilas([]);
      setFilasVista([]);
      return;
    }

    const filasValidas = normalizarColeccionConId(patologiasRaw, "patologia");

    setFilas(filasValidas);
    setFilasVista(filasValidas);
  }, [data]);

  useEffect(() => {
    if (!data?.id) return;
    const unsub = escucharValuacion(data.id, (res) => {
      if (!res.success || !res.data) return;
      const raw = res.data?.secciones?.valuacionPatologia?.etapas?.inspeccionVisual?.data;
      if (raw === undefined) return;
       const validas = normalizarColeccionConId(raw, "patologia");
      setFilas(validas);
      setFilasVista(validas);
    });
    return () => unsub?.();
  }, [data?.id]);

  // Nuevo: borrado vía API LNAPI (Firestore + Storage en servidor, solo administradores)
  const handleEliminarPatologia = async (idl) => {
    if (bloqueado) {
      Alert.fire({
        icon: "info",
        title: "Bloqueado",
        text: "La valuación está finalizada y no se puede modificar.",
      });
      return { success: false };
    }
    const resultado = await eliminarObjetoDeEtapaAPI({
      idValuacion: data.id,
      idSeccion,
      idEtapa,
      idObjeto: idl,
    });
    if (!resultado.success) {
      Alert.fire({
        icon: "error",
        title: "Error",
        text: resultado.error || "No se pudo eliminar la patología",
      });
      return resultado;
    }
    setFilas((prev) => prev.filter((fila) => fila.id !== idl));
    setFilasVista((prev) => prev.filter((fila) => fila.id !== idl));
    // El registro se borró; si algún archivo quedó en Storage se avisa (antes era silencioso)
    const pendientes = resultado.archivosPendientes;
    if (pendientes.length > 0) {
      console.warn("Archivos no eliminados en Storage:", pendientes);
      Alert.fire({
        icon: "warning",
        title: "Registro eliminado, archivos pendientes",
        text: `${pendientes.length} archivo(s) no se pudieron borrar del servidor: ${pendientes.map((p) => p.ruta).join(", ")}`,
      });
    }
    return resultado;
  };



  const handleActualizarPatologia = async (patologiaActualizada) => {
    const previo = [...filas];
    const previoVista = [...filasVista];
    const optimista = filas.map((fila) =>
      fila.id === patologiaActualizada.id ? { ...fila, ...patologiaActualizada } : fila
    );
    setFilas(optimista);
    setFilasVista((prev) =>
      prev.map((fila) =>
        fila.id === patologiaActualizada.id ? { ...fila, ...patologiaActualizada } : fila
      )
    );
    if (patologiaSeleccionada2?.id === patologiaActualizada.id) {
      setPatologiaSeleccionada2((prev) => ({ ...prev, ...patologiaActualizada }));
    }
    const resultado = await actualizarPatologia({
      idValuacion: data.id,
      idSeccion,
      idEtapa,
      patologiaActualizada,
      usuario,
    });
    if (!resultado.success) {
       setFilas(previo);
       setFilasVista(previoVista);
      if (patologiaSeleccionada2?.id === patologiaActualizada.id) {
        setPatologiaSeleccionada2(previo.find(p => p.id === patologiaActualizada.id) || null);
      }
      Alert.fire({ icon: "error", title: "Error", text: resultado.error?.message || "No se pudo actualizar" });
    }
  };

  const handleGuardarPatologia = async (nuevaPatologia) => {
    const resultado = await agregarPatologia({
      idValuacion: data.id,
      idSeccion,
      idEtapa,
      nuevaPatologia,
      usuario,
    });
    if (!resultado.success) {
      Alert.fire({ icon: "error", title: "Error", text: resultado.error?.message || "No se pudo guardar" });
    }
  };

  const patologiasRaw =
    data?.secciones?.valuacionPatologia?.etapas?.inspeccionVisual?.data;

  const buscadorConsulta = (texto) => {
    if (!patologiasRaw) return [];

    const patologias = normalizarColeccionConId(patologiasRaw, "patologia");

    const t = texto?.toLowerCase().trim();

    if (!t) {
      setFilasVista(patologias);
      return [];
    }

    const filtradas = patologias.filter((p) => {
      return (
        p.patologia?.toLowerCase().includes(t) ||
        p.subPatologia?.toLowerCase().includes(t) ||
        p.area?.toLowerCase().includes(t) ||
        p.zona?.toLowerCase().includes(t)
      );
    });

    return filtradas;
  };

  const buscadorHandleClick = (patologia) => {
    setFilasVista([patologia]);
  };

  const buscadorRender = (p) => {
    return `${p.patologia} - ${p.subPatologia}  - ${p.zona}  - ${p.area}`;
  };

  useEffect(() => {
    if (patologiaSeleccionada) {
      if (setOverrideRegresar)
        setOverrideRegresar(() => () => setPatologiaSeleccionada(null));
      if (setTituloOverride)
        setTituloOverride(tituloDetalle || "DETALLE PATOLOGÍA");
    } else {
      if (setOverrideRegresar) setOverrideRegresar(null);
      if (setTituloOverride) setTituloOverride(null);
    }
    return () => {
      if (setOverrideRegresar) setOverrideRegresar(null);
      if (setTituloOverride) setTituloOverride(null);
    };
  }, [patologiaSeleccionada, setOverrideRegresar, setTituloOverride]);

  useEffect(() => {
    if (setAccionGuardar2) {
      setAccionGuardar2(() => ({
        buscadorConsulta,
        buscadorHandleClick,
        buscadorRenderResultado: buscadorRender,
        buscadorPlaceHolder: "Buscar por patologia",
      }));
    }
  }, [patologiasRaw]);

  if (patologiaSeleccionada && VistaDetalle) {
    return (
      <VistaDetalle
        onClose={() => setPatologiaSeleccionada(null)}
        patologia={patologiaSeleccionada}
        setPatologia={(p) => {
          setPatologiaSeleccionada(p);
          handleActualizarPatologia(p);
        }}
        bloqueado={bloqueado}
        folio={data.folio}
        handleRegresar={() => {
          setPatologiaSeleccionada(null);
          if (setAccionGuardar2) {
            setAccionGuardar2(() => ({
              buscadorConsulta,
              buscadorHandleClick,
              buscadorRenderResultado: buscadorRender,
              buscadorPlaceHolder: "Buscar por patologia",
            }));
          }
        }}
      />
    );
  }

  const modales = renderModals
    ? renderModals({
        handleActualizarPatologia,
        handleGuardarPatologia,
        handleEliminarPatologia,
        patologiaSeleccionada2,
        setPatologiaSeleccionada2,
        bloqueado,
        filas,
        setFilas,
      })
    : null;

  if (esMobile && onRegresarMobile) {
    return (
      <>
        <GlobalStylesSweetAlert />
        {modales}
        <Contenedor>
          <Header>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <BotonAccionMovil
                type="button"
                aria-label="Regresar"
                onClick={onRegresarMobile}
              >
                <FaArrowLeft />
              </BotonAccionMovil>
              <div style={{ minWidth: 0, flex: 1 }}>
                <Titulo>{mobileTitle}</Titulo>
                <Subtitulo>Folio: {folio || "Sin folio"}</Subtitulo>
              </div>
              <BuscadorTabla
                consulta={buscadorConsulta}
                handleClick={buscadorHandleClick}
                renderResultado={buscadorRender}
                placeholder="Buscar patología..."
              />
              {onAgregarMobile && !bloqueado && (
                <BotonAccionMovil
                  type="button"
                  aria-label="Agregar patología"
                  title="Agregar"
                  onClick={onAgregarMobile}
                >
                  <FaPlus />
                </BotonAccionMovil>
              )}
            </div>
          </Header>

          <Lista>
            {filasVista.length > 0 ? (
              filasVista.map((fila, index) => (
                <TarjetaPatologia
                  key={fila.id || `${fila.patologia}-${index}`}
                  $clickable
                  onClick={() => setPatologiaSeleccionada(fila)}
                >
                  <EncabezadoTarjeta>
                    <div>
                      <Nombre style={{ fontWeight: 700, color: "#172b4d" }}>
                        {fila.patologia || "Patología sin nombre"}
                      </Nombre>
                      <Subtitulo>{fila.subPatologia || "Sin subpatología"}</Subtitulo>
                    </div>
                  </EncabezadoTarjeta>

                  <DatosTarjeta>
                    <Campo>
                      <Label>Ubicación</Label>
                      <Info>{fila.ubicacion || "Sin ubicación"}</Info>
                    </Campo>
                    <Campo>
                      <Label>Zona</Label>
                      <Info>{fila.zona || "Sin zona"}</Info>
                    </Campo>
                    <Campo>
                      <Label>Área</Label>
                      <Info>{fila.area || "Sin área"}</Info>
                    </Campo>
                    <Campo>
                      <Label>Nivel / no. zona</Label>
                      <Info>
                        {fila.nivelDePlanta || "Sin nivel"} / {fila.NoZona || "Sin número"}
                      </Info>
                    </Campo>
                  </DatosTarjeta>

                  <AccionesTarjeta>
                    {menuItems.map((item, actionIndex) => (
                      <BotonTarjeta
                        key={`${item.label}-${actionIndex}`}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          ejecutarMenuItem(item, fila);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </BotonTarjeta>
                    ))}
                  </AccionesTarjeta>
                </TarjetaPatologia>
              ))
            ) : (
              <Card style={{ cursor: "default", justifyContent: "center" }}>
                <Info style={{ justifyContent: "center", color: "#667085" }}>
                  No hay patologías para mostrar.
                </Info>
              </Card>
            )}
          </Lista>
        </Contenedor>
      </>
    );
  }

  const columnasFinales = columnasProp || [
    ...columnasBase,
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <BtnGenericoV2
            icono={<FaEllipsisV />}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenMenu(e, params.row);
            }}
          />
          <Menu
            anchorEl={anchorEl}
            open={
              Boolean(anchorEl) && filaSeleccionadaMenu?.id === params.row.id
            }
            onClose={handleCloseMenu}
            slotProps={{
              root: {
                sx: { zIndex: 99999 },
              },
              paper: {
                sx: {
                  borderRadius: "12px",
                  overflow: "hidden",
                },
              },
            }}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                style={{ gap: "8px" }}
                onClick={() => ejecutarMenuItem(item, params.row)}
              >
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      ),
    },
  ];

  return (
    <>
      <GlobalStylesSweetAlert />
      <ContenedorPatologias>
        {modales}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <InterfazTablaGenerica
            descripcion=" "
            filas={filasVista}
            columnas={columnasFinales}
            handleClickFila={(params) => {
              setPatologiaSeleccionada(params.row);
            }}
            botonesDeAccionTabla={btns}
          />
        </div>
      </ContenedorPatologias>
    </>
  );
};
