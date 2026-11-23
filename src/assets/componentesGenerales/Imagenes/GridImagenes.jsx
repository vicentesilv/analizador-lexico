import styled from "styled-components";

const Contenedor = styled.div`
  flex: 1;
  padding: ${props => props.$padding || "0px 0"};
`;

const Grid = styled.div`
  column-count: ${props => props.$columns || 3};
  column-gap: ${props => props.$gap || "16px"};

  @media (max-width: 900px) {
    column-count: 2;
  }

  @media (max-width: 500px) {
    column-count: 1;
  }
`;

const Item = styled.div`
  break-inside: avoid;
  margin-bottom: ${props => props.$gap || "16px"};
  border-radius: var(--bordeRadiusGenerico);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--bordeRadiusGenerico);
  border: 1px solid #ddd;
`;

const Footer = styled.div`
  margin-top: ${props => props.$gap || "16px"};
`;

const GridImagenes = ({
  images = [],
  columns = 3,
  gap,
  padding,
  renderFooter,
  onImageClick,
  getUrl = (img) => (typeof img === "string" ? img : img?.url),
  getAlt = (img, i) => `Evidencia ${i + 1}`,
}) => {
  return (
    <Contenedor $padding={padding}>
      {images.length > 0 && (
        <Grid $columns={columns} $gap={gap}>
          {images.map((img, index) => (
            <Item key={index} $gap={gap} onClick={() => onImageClick?.(img, index)}>
              <Img
                src={getUrl(img)}
                alt={getAlt(img, index)}
              />
            </Item>
          ))}
        </Grid>
      )}
      {renderFooter && (
        <Footer $gap={gap}>
          {renderFooter()}
        </Footer>
      )}
    </Contenedor>
  );
};

export default GridImagenes;
