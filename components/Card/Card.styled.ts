import styled from 'styled-components';
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
