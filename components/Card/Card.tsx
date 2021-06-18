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
import {
  NftCardProps,
  Typography,
  FontProps,
} from '../../custom/customization';
import { NftCardTextProps } from '../../custom/localization';
import { TemplateImage, TemplateVideo } from '../index';
import { IPFS_RESOLVER, RESIZER_IMAGE_SM } from '../../utils/constants';

type Props = {
  template: Template;
  type: 'user' | 'featured';
  nftCardText: NftCardTextProps;
  nftCardStyles: NftCardProps;
  typography: Typography;
  isCarousel?: boolean;
};

export const Card: FC<Props> = ({
  template,
  type,
  nftCardText,
  nftCardStyles,
  typography,
  isCarousel,
}) => {
  const {
    assetsForSale,
    lowestPrice,
    template_id,
    max_supply,
    collection: { collection_name, name: displayName },
    immutable_data: { name, image, video },
  } = template;
  const {
    mainBackgroundColor,
    priceFont,
    countFont,
    titleFont,
    collectionNameFont,
    borderColor,
    borderRadius,
    secondaryBackgroundColor,
  } = nftCardStyles;
  const router = useRouter();

  const formattedSaleCount = assetsForSale
    ? assetsForSale.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')
    : '';

  const videoSrc = `${IPFS_RESOLVER}${video}`;
  const imageSrc = !image
    ? image
    : `${RESIZER_IMAGE_SM}${IPFS_RESOLVER}${image}`;
  const fallbackImageSrc = image ? `${IPFS_RESOLVER}${image}` : '';
  const onClickRoute =
    type === 'featured' ? `/${template_id}` : `/my-items/${template_id}`;

  return (
    <CardContainer
      onClick={() => router.push(onClickRoute)}
      borderRadius={borderRadius}
      borderColor={borderColor}
      mainBackgroundColor={mainBackgroundColor}>
      <QuantityText {...countFont} typography={typography}>
        {formattedSaleCount ? (
          type === 'featured' ? (
            `${formattedSaleCount} ${nftCardText.nftsLeft}`
          ) : (
            `${formattedSaleCount}/${max_supply} ${nftCardText.nftsOwnedForSale}`
          )
        ) : (
          <ShimmerBlock width="75px" />
        )}
      </QuantityText>

      {video ? (
        <TemplateVideo
          src={videoSrc}
          autoPlay={false}
          borderRadius={borderRadius}
          secondaryBackgroundColor={secondaryBackgroundColor}
        />
      ) : (
        <TemplateImage
          templateImgSrc={imageSrc}
          templateName={name}
          fallbackImgSrc={fallbackImageSrc}
          borderRadius={borderRadius}
          secondaryBackgroundColor={secondaryBackgroundColor}
        />
      )}

      <Name {...titleFont} isCarousel={isCarousel} typography={typography}>
        {name}
      </Name>
      <CollectionName {...collectionNameFont} typography={typography}>
        {displayName || collection_name}
      </CollectionName>
      <PriceSection
        lowestPrice={lowestPrice}
        type={type}
        nftCardText={nftCardText}
        saleCount={formattedSaleCount}
        priceFont={{
          ...priceFont,
          typography,
        }}
      />
    </CardContainer>
  );
};

const PriceSection: FC<{
  lowestPrice: string;
  type: string;
  nftCardText: NftCardTextProps;
  saleCount: string;
  priceFont: FontProps;
}> = ({ lowestPrice, type, nftCardText, saleCount, priceFont }) => {
  if (type !== 'featured') {
    return null;
  }

  if (lowestPrice === undefined) {
    return <ShimmerBlock position="flex-start" />;
  }

  return lowestPrice || saleCount == '0' ? (
    <Price {...priceFont}>{lowestPrice || nftCardText.soldOut}</Price>
  ) : null;
};
