import styled from 'styled-components';
import customizationJson from '../../custom/customization';
import { breakpoint } from '../../styles/Breakpoints';

const {
  typography,
  detailPage: {
    imagePlacement,
    cardTitleFont,
    collectionNameFont,
    priceEditionLabelFont,
    priceFont,
    editionFont,
    cardDescriptionFont,
    button,
  },
} = customizationJson;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 50%;
  height: 3000%;
  margin-left: ${imagePlacement === 'left' ? '48px' : '0'};
  margin-right: ${imagePlacement === 'left' ? '0' : '48px'};
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: ${cardTitleFont.color};
  font-family: ${typography[cardTitleFont.type].font};
  font-size: ${typography[cardTitleFont.type].size};
  font-weight: ${typography[cardTitleFont.type].fontWeight};
`;

export const CollectionName = styled.h3`
  color: ${collectionNameFont.color};
  font-family: ${typography[collectionNameFont.type].font};
  font-size: ${typography[collectionNameFont.type].size};
  font-weight: ${typography[collectionNameFont.type].fontWeight};
  margin: 12px 0 24px;
`;

export const PriceEditionLabel = styled.label`
  color: ${priceEditionLabelFont.color};
  font-family: ${typography[priceEditionLabelFont.type].font};
  font-size: ${typography[priceEditionLabelFont.type].size};
  font-weight: ${typography[priceEditionLabelFont.type].fontWeight};
  margin-bottom: 12px;
`;

export const Price = styled.h2`
  color: ${priceFont.color};
  font-family: ${typography[priceFont.type].font};
  font-size: ${typography[priceFont.type].size};
  font-weight: ${typography[priceFont.type].fontWeight};
`;

export const Edition = styled.h2`
  color: ${editionFont.color};
  font-family: ${typography[editionFont.type].font};
  font-size: ${typography[editionFont.type].size};
  font-weight: ${typography[editionFont.type].fontWeight};
`;

export const Description = styled.p`
  color: ${cardDescriptionFont.color};
  font-family: ${typography[cardDescriptionFont.type].font};
  font-size: ${typography[cardDescriptionFont.type].size};
  font-weight: ${typography[cardDescriptionFont.type].fontWeight};
  margin: 24px 0 64px;
`;

export const Button = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 32px;
  padding: 0;
  background-color: ${button.backgroundColor};
  font-family: ${typography[button.textFont].font};
  color: ${button.textColor};
  border: none;
  cursor: pointer;

  ${breakpoint.mobile`
    height: 32px;
    margin-top: 25px;
  `}
`;
