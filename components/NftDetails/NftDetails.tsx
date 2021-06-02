import { FC, ReactNode } from 'react';
import {
  Container,
  Title,
  CollectionName,
  PriceEditionLabel,
  Price,
  Edition,
  Description,
} from './NftDetails.styled';
import { Row, Box } from '../../styles/index.styled';
import { Template } from '../../services/templates';

export const NftDetails: FC<{
  children: ReactNode;
  template: Template;
  detailPageText: {
    priceLabelText: string;
    editionLabelText: string;
  };
}> = ({
  children,
  template: { lowestPrice, max_supply, collection, immutable_data },
  detailPageText: { priceLabelText, editionLabelText },
}) => (
  <Container>
    <Box>
      <Title>{immutable_data.name}</Title>
      <CollectionName>{collection.name}</CollectionName>
      <Row>
        <PriceEditionLabel>{priceLabelText}</PriceEditionLabel>
        <PriceEditionLabel>{editionLabelText}</PriceEditionLabel>
      </Row>
      <Row>
        <Price>{lowestPrice}</Price>
        <Edition>{max_supply}</Edition>
      </Row>
      <Description>{immutable_data.desc}</Description>
    </Box>
    <Box>{children}</Box>
  </Container>
);
