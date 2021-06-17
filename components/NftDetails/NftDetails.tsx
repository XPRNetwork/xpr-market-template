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
import { NftMeta } from '../';
import { Template } from '../../services/templates';
import { DetailPageProps } from '../../custom/customization';

export const NftDetails: FC<{
  children: ReactNode;
  template: Template;
  detailPageStyles: DetailPageProps;
  detailPageText: {
    priceLabelText: string;
    editionLabelText: string;
    placeholderPriceText: string;
  };
}> = ({
  children,
  template: { lowestPrice, max_supply, collection, immutable_data },
  detailPageStyles: {
    imagePlacement,
    cardTitleFont,
    collectionNameFont,
    priceEditionLabelFont,
    priceFont,
    editionFont,
    cardDescriptionFont,
  },
  detailPageText: { priceLabelText, editionLabelText, placeholderPriceText },
}) => (
  <Container imagePlacement={imagePlacement}>
    <NftMeta
      templateName={immutable_data.name}
      collectionName={collection.collection_name}
      collectionDisplayName={collection.name}
      collectionAuthor={collection.author}
      image={immutable_data.image}
      video={immutable_data.video}
    />
    <Box>
      <Title {...cardTitleFont}>{immutable_data.name}</Title>
      <CollectionName {...collectionNameFont}>{collection.name}</CollectionName>
      <Row>
        <PriceEditionLabel {...priceEditionLabelFont}>
          {priceLabelText}
        </PriceEditionLabel>
        <PriceEditionLabel {...priceEditionLabelFont}>
          {editionLabelText}
        </PriceEditionLabel>
      </Row>
      <Row>
        <Price {...priceFont}>{lowestPrice || placeholderPriceText}</Price>
        <Edition {...editionFont}>{max_supply}</Edition>
      </Row>
      <Description {...cardDescriptionFont}>{immutable_data.desc}</Description>
    </Box>
    <Box>{children}</Box>
  </Container>
);
