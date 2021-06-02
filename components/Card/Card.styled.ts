import styled, { keyframes } from 'styled-components';
import customizationJson from '../../custom/customization';

const { nftCard } = customizationJson;

export const CardContainer = styled.div`
  min-width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  // remove later, since all cards will be within a grid/carousel
  width: 300px;
`;

export const QuantityText = styled.span``;

export const AssetContainer = styled.div`
  width: 90%;
  height: 0px;
  padding-bottom: 90%;
  background-color: gray;
`;

const placeHolderShimmer = keyframes`
  \ 0% {
    background-position: -500px 0
  }
  \ 100% {
    background-position: 500px 0
  }
`;

export const ShimmerBlock = styled.div`
  animation: ${placeHolderShimmer} 1s linear infinite;
  background: linear-gradient(to right, #eeeeee 8%, #e7e7e7 18%, #eeeeee 33%);
  background-size: 1000px 18px;
  width: 200px;
  height: 14px;
`;
