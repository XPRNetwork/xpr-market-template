import styled, { keyframes } from 'styled-components';
import customizationJson from '../../custom/customization';

const { nftCard, typography } = customizationJson;
const {
  mainBackgroundColor,
  priceFont,
  countFont,
  titleFont,
  collectionNameFont,
  borderColor,
  borderRadius,
} = nftCard;

type ShimmerBlockProps = {
  width?: string;
  position?: string;
};

export const CardContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${borderRadius};
  border: 1px solid ${borderColor};
  background-color: ${mainBackgroundColor};
  padding: 0 24px 24px;

  // remove later, since all cards will be within a grid/carousel
  width: 300px;
`;

export const QuantityText = styled.p`
  color: ${countFont.color};
  font-family: ${typography[countFont.type].font};
  font-size: ${typography[countFont.type].size};
  font-weight: ${typography[countFont.type].fontWeight};
  margin: 16px 0;
  line-height: 1.71;
`;

export const Name = styled.p`
  color: ${titleFont.color};
  font-family: ${typography[titleFont.type].font};
  font-size: ${typography[titleFont.type].size};
  font-weight: ${typography[titleFont.type].fontWeight};
  align-self: flex-start;
  line-height: 1.78;
`;

export const CollectionName = styled.p`
  color: ${collectionNameFont.color};
  font-family: ${typography[collectionNameFont.type].font};
  font-size: ${typography[collectionNameFont.type].size};
  font-weight: ${typography[collectionNameFont.type].fontWeight};
  align-self: flex-start;
  line-height: 1.71;
  margin-bottom: 16px;
`;

export const Price = styled.p`
  color: ${priceFont.color};
  font-family: ${typography[priceFont.type].font};
  font-size: ${typography[priceFont.type].size};
  font-weight: ${typography[priceFont.type].fontWeight};
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
