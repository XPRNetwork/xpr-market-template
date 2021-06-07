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
import { useLocaleContext } from '../Provider';
import { Template } from '../../services/templates';
import localizationJson from '../../custom/localization';
import { TemplateImage, TemplateVideo } from '../index';
import { IPFS_RESOLVER, RESIZER_IMAGE_SM } from '../../utils/constants';

type Props = {
  template: Template;
  type: 'user' | 'featured';
};

export const Card: FC<Props> = ({ template, type }) => {
  const {
    assetsForSale,
    lowestPrice,
    template_id,
    collection: { collection_name, name: collectionName },
    immutable_data: { name, image, video },
  } = template;
  const router = useRouter();

  const { locale } = useLocaleContext();
  const text = Object.keys(localizationJson[locale]).length
    ? localizationJson[locale].nftCard
    : localizationJson['en'].nftCard;

  const formattedSaleCount = assetsForSale
    ? assetsForSale.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')
    : '';

  const videoSrc = `${IPFS_RESOLVER}${video}`;
  const imageSrc = !image
    ? image
    : `${RESIZER_IMAGE_SM}${IPFS_RESOLVER}${image}`;
  const fallbackImageSrc = image ? `${IPFS_RESOLVER}${image}` : '';
  const cardHeaderText = type === 'featured' ? text.nftsLeft : text.nftsOwned;

  return (
    <CardContainer onClick={() => router.push(`/${template_id}`)}>
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
      <CollectionName>{collectionName || collection_name}</CollectionName>
      <PriceSection
        lowestPrice={lowestPrice}
        type={type}
        text={text}
        saleCount={formattedSaleCount}
      />
    </CardContainer>
  );
};

const PriceSection = ({ lowestPrice, type, text, saleCount }) => {
  if (type === 'featured') {
    if (lowestPrice === undefined) {
      return <ShimmerBlock position="flex-start" />;
    }
    return lowestPrice || saleCount == '0' ? (
      <Price>{lowestPrice || text.soldOut}</Price>
    ) : null;
  } else {
    return null;
  }
};
