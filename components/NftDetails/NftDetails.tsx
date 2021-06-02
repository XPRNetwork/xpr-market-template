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

export const NftDetails: FC<{ template: Template; children: ReactNode }> = ({
  template: { lowestPrice, max_supply, collection, immutable_data },
  children,
}) => (
  <Container>
    <Box>
      <Title>{immutable_data.name}</Title>
      <CollectionName>{collection.name}</CollectionName>
      <Row>
        <PriceEditionLabel>PRICE</PriceEditionLabel>
        <PriceEditionLabel>EDITION SIZE</PriceEditionLabel>
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
