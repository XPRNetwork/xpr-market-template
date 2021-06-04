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
  },
} = customizationJson;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 50vh;
  margin-left: ${imagePlacement === 'left' ? '48px' : '0'};
  margin-right: ${imagePlacement === 'left' ? '0' : '48px'};

  ${breakpoint.laptop`
    width: 60%;
    margin-left: ${imagePlacement === 'left' ? '24px' : '0'};
    margin-right: ${imagePlacement === 'left' ? '0' : '24px'};
  `}

  ${breakpoint.tablet`
    width: 100%;
    height: 100%;
    margin: 24px 0 0;
  `}
`;

export const Title = styled.h1`
  color: ${cardTitleFont.color};
  font-family: ${typography[cardTitleFont.type].font};
  font-size: ${typography[cardTitleFont.type].size};
  font-weight: ${typography[cardTitleFont.type].fontWeight};
  line-height: 80px;

  ${breakpoint.tablet`
    font-size: 32px;
    line-height: 40px;
  `}
`;

export const CollectionName = styled.h3`
  color: ${collectionNameFont.color};
  font-family: ${typography[collectionNameFont.type].font};
  font-size: ${typography[collectionNameFont.type].size};
  font-weight: ${typography[collectionNameFont.type].fontWeight};
  line-height: 24px;
  margin: 0 0 24px;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;

export const PriceEditionLabel = styled.label`
  color: ${priceEditionLabelFont.color};
  font-family: ${typography[priceEditionLabelFont.type].font};
  font-size: ${typography[priceEditionLabelFont.type].size};
  font-weight: ${typography[priceEditionLabelFont.type].fontWeight};
  line-height: 24px;

  ${breakpoint.tablet`
    font-size: 10px;
    line-height: 16px;
  `}
`;

export const Price = styled.h2`
  color: ${priceFont.color};
  font-family: ${typography[priceFont.type].font};
  font-size: ${typography[priceFont.type].size};
  font-weight: ${typography[priceFont.type].fontWeight};
  line-height: 40px;

  ${breakpoint.tablet`
    font-size: 22px;
    line-height: 32px;
  `}
`;

export const Edition = styled.h2`
  color: ${editionFont.color};
  font-family: ${typography[editionFont.type].font};
  font-size: ${typography[editionFont.type].size};
  font-weight: ${typography[editionFont.type].fontWeight};
  line-height: 40px;

  ${breakpoint.tablet`
    font-size: 22px;
    line-height: 32px;
  `}
`;

export const Description = styled.p`
  color: ${cardDescriptionFont.color};
  font-family: ${typography[cardDescriptionFont.type].font};
  font-size: ${typography[cardDescriptionFont.type].size};
  font-weight: ${typography[cardDescriptionFont.type].fontWeight};
  margin-top: 24px;
  line-height: 24px;

  ${breakpoint.tablet`
    font-size: 14px;
  `}
`;
