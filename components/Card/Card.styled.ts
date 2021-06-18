import styled, { keyframes } from 'styled-components';
import { FontProps } from '../../custom/customization';

const minWidth = '300px';

type ShimmerBlockProps = {
  width?: string;
  position?: string;
};

interface NameProps extends FontProps {
  isCarousel: boolean;
  carouselHeight: string;
}

export const CardContainer = styled.div<{
  borderRadius: string;
  borderColor: string;
  mainBackgroundColor: string;
}>`
  min-width: ${minWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ mainBackgroundColor }) => mainBackgroundColor};
  padding: 0 24px 24px;
  cursor: pointer;
`;

export const QuantityText = styled.div<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  margin: 16px 0;
  line-height: 1.71;
`;

export const Name = styled.div<NameProps>`
  width: calc(${minWidth} - 48px);
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  ${({ isCarousel }) =>
    isCarousel
      ? `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: ${(props) => props.carouselHeight};
    `
      : 'line-height: 1.78;'}
  align-self: flex-start;
`;

export const CollectionName = styled.p<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  align-self: flex-start;
  line-height: 1.71;
  margin-bottom: 16px;
`;

export const Price = styled.p<FontProps>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.typography[props.type].font};
  font-size: ${(props) => props.typography[props.type].size};
  font-weight: ${(props) => props.typography[props.type].fontWeight};
  align-self: flex-start;
  line-height: 1.78;
`;

const placeHolderShimmer = keyframes`
  \ 0% {
    background-position: -500px 0
  }
  \ 100% {
    background-position: 500px 0
  }
`;

const loadingAsset = keyframes`
  \ 0% {
    background-color: #ffffff;
  }
  \ 50% {
    background-color: #eaeaea;
  }
  \ 100% {
    background-color: #ffffff;
  }
`;

export const ShimmerBlock = styled.div<ShimmerBlockProps>`
  animation: ${placeHolderShimmer} 1s linear infinite;
  background: linear-gradient(to right, #eeeeee 8%, #e7e7e7 18%, #eeeeee 33%);
  background-size: 1000px 18px;
  width: ${({ width }) => (width ? width : '100px')};
  height: 14px;
  align-self: ${({ position }) => (position ? position : 'center')};
`;

export const PlaceholderAsset = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAsset} 1s infinite;
`;
