import styled from 'styled-components';

type ImgProps = {
  width?: string;
  height?: string;
  objectFit?: string;
};

export const Image = styled.img<ImgProps>`
  width: ${({ width }) => width || '270px'};
  height: ${({ height }) => height || '270px'};
  object-fit: ${({ objectFit }) => objectFit || ''};
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
