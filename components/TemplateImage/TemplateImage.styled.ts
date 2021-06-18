import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

export type MediaContainerProps = {
  isAudio?: boolean;
  isVideo?: boolean;
  borderRadius: string;
  secondaryBackgroundColor: string;
};

export const ImageContainer = styled(FadeInImageContainer)<MediaContainerProps>`
  position: relative;
  height: 270px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background-color: ${({ secondaryBackgroundColor }) =>
    secondaryBackgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Image = styled.img`
  max-width: 270px;
  max-height: 270px;
`;
