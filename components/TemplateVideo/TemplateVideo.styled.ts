import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';
import { MediaContainerProps } from '../TemplateImage/TemplateImage.styled';

export const VideoContainer = styled(FadeInImageContainer)<MediaContainerProps>`
  position: relative;
  width: 100%;
  height: 270px;
  padding-bottom: 100%;
  border-radius: 8px;
  margin-bottom: 24px;
  background-color: ${({ secondaryBackgroundColor }) =>
    secondaryBackgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const CenterContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Video = styled.video`
  width: 100%;
  max-height: 100%;
  outline: none;
  z-index: 1;
`;

export const VideoError = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  line-height: 24px;
  z-index: 1;
  color: #808080;
  background: #e6e6e6;
`;
