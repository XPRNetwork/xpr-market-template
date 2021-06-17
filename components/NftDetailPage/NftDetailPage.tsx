import { FC, Dispatch, SetStateAction } from 'react';
import { Nft, NftDetails, NftDropdown } from '../../components';
import {
  NftPageContainer,
  Button,
  ButtonLink,
  ErrorMessage,
} from './NftDetailPage.styled';
import { DetailPageProps } from '../../custom/customization';
import { DetailPageTextProps } from '../../custom/localization';
import { Template } from '../../services/templates';
import { Asset } from '../../services/assets';

export enum NFT_DETAIL_PAGE_TYPES {
  BUY = 'BUY',
  OWNED = 'OWNED',
}

type Props = {
  type: NFT_DETAIL_PAGE_TYPES;
  template: Template;
  detailPageText: DetailPageTextProps;
  detailPageStyles: DetailPageProps;
  ownedPageProps?: {
    owner: string;
    isSelectedAssetOnSale: boolean;
    dropdownProps: {
      assets: Asset[];
      salePrices: {
        [asset_id: string]: string;
      };
      selectedAssetId: string;
      setSelectedAssetId: Dispatch<SetStateAction<string>>;
    };
  };
  buyPageProps?: {
    onButtonClick: () => void;
    purchasingError: string;
  };
};

export const NftDetailPage: FC<Props> = ({
  type,
  template,
  detailPageText,
  detailPageStyles,
  ownedPageProps,
  buyPageProps,
}) => {
  const {
    template_id,
    collection: { collection_name },
    immutable_data: { name, image, video },
  } = template;

  const getContent = () => {
    switch (type) {
      case NFT_DETAIL_PAGE_TYPES.BUY: {
        const { onButtonClick, purchasingError } = buyPageProps;
        return (
          <>
            {template.lowestPrice ? (
              <Button onClick={onButtonClick} {...detailPageStyles.button}>
                {detailPageText.buyButtonText}
              </Button>
            ) : (
              <ButtonLink
                href={`http://protonmarket.com/${collection_name}/${template_id}`}
                target="_blank"
                rel="noreferrer"
                {...detailPageStyles.button}>
                {detailPageText.viewButtonText}
              </ButtonLink>
            )}
            {purchasingError ? (
              <ErrorMessage {...detailPageStyles.errorFont}>
                {purchasingError}
              </ErrorMessage>
            ) : null}
          </>
        );
      }
      case NFT_DETAIL_PAGE_TYPES.OWNED: {
        const { dropdownProps, owner, isSelectedAssetOnSale } = ownedPageProps;
        const {
          placeholderDropdownText,
          cancelSaleButtonText,
          sellButtonText,
        } = detailPageText;
        return (
          <>
            <NftDropdown
              {...dropdownProps}
              placeholderDropdownText={placeholderDropdownText}
            />
            <ButtonLink
              href={`http://protonmarket.com/details/${owner}/${collection_name}/${template_id}`}
              target="_blank"
              rel="noreferrer"
              {...detailPageStyles.button}>
              {isSelectedAssetOnSale ? cancelSaleButtonText : sellButtonText}
            </ButtonLink>
          </>
        );
      }
      default:
        return null;
    }
  };

  const { imageBackgroundColor, imagePlacement, imageShadow } =
    detailPageStyles;

  return (
    <NftPageContainer imagePlacement={imagePlacement}>
      <Nft
        name={name}
        image={image}
        video={video}
        nftStyles={{
          imageBackgroundColor,
          imagePlacement,
          imageShadow,
        }}
      />
      <NftDetails
        template={template}
        detailPageText={detailPageText}
        detailPageStyles={detailPageStyles}>
        {getContent()}
      </NftDetails>
    </NftPageContainer>
  );
};
