import { FC } from 'react';
import {
  Container,
  Details,
  Title,
  CollectionName,
  PriceEditionLabel,
  Price,
  Edition,
  Description,
  Button,
} from './NftDetails.styled';
import { Row } from '../../styles/index.styled';
import { Template } from '../../services/templates';

export const NftDetails: FC<{ template: Template }> = ({
  template: { lowestPrice, max_supply, collection, immutable_data },
}) => (
  <Container>
    <Details>
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
    </Details>
    <Button>BUY NOW</Button>
  </Container>
);
