import styled from 'styled-components';
import customizationJson from '../../custom/customization';

const { typography, header } = customizationJson;
const { highlightFont } = header;

export const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.header.backgroundColor || 'blue'};
  display: flex;
  flex-direction: ${({ theme }) =>
    theme.header.imagePlacement === 'right' ? 'row' : 'row-reverse'};
  height: 640px;
`;

export const TextContainer = styled.div`
  flex: 1;
`;

export const ImageContainer = styled.div`
  flex: 1;
  background-image: url('/header-image.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const HighlightText = styled.h3`
  display: ${({ theme }) =>
    theme.header.highlightFont.isShown ? 'block' : 'none'};
  color: ${({ theme }) => theme.header.highlightFont.color};
  font-family: ${({ theme }) => {
    const chosenFont = theme.header.highlightFont.type;
    return typography[chosenFont].font;
  }};
  font-size: ${({ theme }) => {
    const chosenFont = theme.header.highlightFont.type;
    return typography[chosenFont].size;
  }};
  font-weight: ${({ theme }) => {
    const chosenFont = theme.header.highlightFont.type;
    return typography[chosenFont].fontWeight;
  }};
`;

export const HeaderText = styled.h1``;

export const SubHeaderText = styled.h2``;

export const Button = styled.button``;

export const ButtonText = styled.span``;
