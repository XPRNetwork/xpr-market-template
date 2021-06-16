import { FC } from 'react';
import { useRouter } from 'next/router';
import {
  CardContainer,
  QuantityText,
  Price,
  Name,
  CollectionName,
  ShimmerBlock,
} from './Card.styled';
import { Template } from '../../services/templates';
import { NftCardTextProps } from '../../custom/localization';
import { TemplateImage, TemplateVideo } from '../index';
import { IPFS_RESOLVER, RESIZER_IMAGE_SM } from '../../utils/constants';

type Props = {
  template: Template;
  type: 'user' | 'featured';
  nftCardText: NftCardTextProps;
};

export const Card: FC<Props> = ({ template, type, nftCardText }) => {
  const {
    assetsForSale,
    lowestPrice,
    template_id,
    collection: { collection_name, name: displayName },
    immutable_data: { name, image, video },
  } = template;
  const router = useRouter();

  const formattedSaleCount = assetsForSale
    ? assetsForSale.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')
    : '';

  const videoSrc = `${IPFS_RESOLVER}${video}`;
  const imageSrc = !image
    ? image
    : `${RESIZER_IMAGE_SM}${IPFS_RESOLVER}${image}`;
  const fallbackImageSrc = image ? `${IPFS_RESOLVER}${image}` : '';
  const cardHeaderText =
    type === 'featured' ? nftCardText.nftsLeft : nftCardText.nftsOwned;
  const onClickRoute =
    type === 'featured' ? `/${template_id}` : `/my-items/${template_id}`;

  return (
    <CardContainer onClick={() => router.push(onClickRoute)}>
      <QuantityText>
        {formattedSaleCount ? (
          `${formattedSaleCount} ${cardHeaderText}`
        ) : (
          <ShimmerBlock width="75px" />
        )}
      </QuantityText>

      {video ? (
        <TemplateVideo src={videoSrc} autoPlay={false} />
      ) : (
        <TemplateImage
          templateImgSrc={imageSrc}
          templateName={name}
          fallbackImgSrc={fallbackImageSrc}
        />
      )}

      <Name>{name}</Name>
      <CollectionName>{displayName || collection_name}</CollectionName>
      <PriceSection
        lowestPrice={lowestPrice}
        type={type}
        nftCardText={nftCardText}
        saleCount={formattedSaleCount}
      />
    </CardContainer>
  );
};

const PriceSection: FC<{
  lowestPrice: string;
  type: string;
  nftCardText: NftCardTextProps;
  saleCount: string;
}> = ({ lowestPrice, type, nftCardText, saleCount }) => {
  if (type === 'featured') {
    if (lowestPrice === undefined) {
      return <ShimmerBlock position="flex-start" />;
    }
    return lowestPrice || saleCount == '0' ? (
      <Price>{lowestPrice || nftCardText.soldOut}</Price>
    ) : null;
  } else {
    return null;
  }
};
