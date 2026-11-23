import styled from "styled-components";
import { IoRibbon, IoRibbonOutline } from "react-icons/io5";
const ListaCategorias = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const FilaCategoria = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;
`;

const FilaEstrellas = styled.div`
  display: flex;
  gap: 8px;
`;

const EscalaContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

export const EscalaLujoVisualGenerico = ({ categorias, scoreFinal, mensajeVacio }) => {
    if (!categorias || categorias.length === 0) return <div style={{ textAlign: "center", padding: "20px" }}>{mensajeVacio || "No hay datos de valuación disponibles sobre el nivel de lujo de la propiedad."}</div>;
    
    const monosFinales = Math.floor(scoreFinal);
    const scoreMostrar = scoreFinal % 1 === 0 ? scoreFinal : scoreFinal.toFixed(1);

    return (
        <EscalaContainer>
            <ListaCategorias>
                {categorias.map((cat, index) => (
                    <FilaCategoria key={index}>
                        <div style={{ fontWeight: "500", fontSize: "14px" }}>{cat.label}</div> 
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "end" }}>
                            <FilaEstrellas>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <div key={n}>
                                        {n <= Math.floor(cat.score) ? (
                                            <IoRibbon size={25} style={{ color: "var(--colorPrincipal, #b48c5d)" }} />
                                        ) : (
                                            <IoRibbonOutline size={25} color="#ccc" />
                                        )}
                                    </div>
                                ))}
                            </FilaEstrellas>
                            <span style={{ fontWeight: "bold", minWidth: "30px", fontSize: "14px" }}>
                                {cat.score % 1 === 0 ? cat.score : cat.score.toFixed(1)}
                            </span>
                        </div>
                    </FilaCategoria>
                ))}

                <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                        <div>
                            <div style={{ fontSize: "14px", fontWeight: "bold" }}>ATRACTIVO GLOBAL</div>
                            <div style={{
                                marginTop: "5px", fontSize: "13px", fontWeight: "600",
                                color: scoreFinal >= 4 ? "#2e7d32" : scoreFinal >= 3 ? "#f9a825" : "#d32f2f"
                            }}>
                                {scoreFinal >= 4 ? "Atractivo de lujo" : scoreFinal >= 3 ? "Atractivo alto" : "Atractivo básico"}
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <FilaEstrellas>
                                {[1, 2, 3, 4, 5].map((n) =>
                                    n <= monosFinales ? (
                                        <IoRibbon key={n} size={25} style={{ color: scoreFinal >= 4 ? "#2e7d32" : scoreFinal >= 3 ? "#f9a825" : "#d32f2f" }} />
                                    ) : (
                                        <IoRibbonOutline key={n} size={25} color="#ccc" />
                                    )
                                )}
                            </FilaEstrellas>
                            <span style={{
                                fontWeight: "bold", minWidth: "30px", fontSize: "14px", textAlign: "center",
                                color: scoreFinal >= 4 ? "#2e7d32" : scoreFinal >= 3 ? "#f9a825" : "#d32f2f"
                            }}>
                                {scoreMostrar}
                            </span>
                        </div>
                    </div>
                </div>
            </ListaCategorias>
        </EscalaContainer>
    );
};