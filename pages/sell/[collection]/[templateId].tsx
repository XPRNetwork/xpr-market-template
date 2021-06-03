import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Nft, NftDetails, NftSaleDropdown } from '../../../components';
import {
  useAuthContext,
  useLocaleContext,
  useModalContext,
  MODAL_TYPES,
} from '../../../components/Provider';
import { useFetchNft, useFetchOwnedNfts } from '../../../hooks';
import { NftPageContainer, Button } from '../../../styles/templateId.styled';
import ProtonSDK from '../../../services/proton';
import localizationJson from '../../../custom/localization';
import { RouterQuery } from '../../../utils/constants';

const NftSellPage: FC = () => {
  const { currentUser, isLoadingUser } = useAuthContext();
  const { openModal, setModalProps } = useModalContext();

  const { locale, isLoadingLocale } = useLocaleContext();
  const detailPageText = localizationJson[locale]
    ? localizationJson[locale].detailPage
    : localizationJson['en'].detailPage;

  const router = useRouter();
  const { collection, templateId } = router.query as RouterQuery;

  const {
    template,
    isLoading: isTemplateLoading,
    error: templateError,
  } = useFetchNft({
    collection: collection ? collection.toLowerCase() : '',
    templateId,
  });

  const {
    assets,
    saleData: { salePrices, saleIds },
    isLoading: isSaleDataLoading,
    error: saleDataError,
  } = useFetchOwnedNfts({
    templateId,
    owner: currentUser ? currentUser.actor : '',
  });

  const [selectedAssetId, setSelectedAssetId] = useState<string>('');

  useEffect(() => {
    setSelectedAssetId(assets[0] ? assets[0].asset_id : '');
  }, [assets]);

  const createSale = () => {
    setModalProps({
      reloadPage: () => setTimeout(() => router.reload, 1000),
      assetId: selectedAssetId,
    });
    openModal(MODAL_TYPES.CREATE_SALE);
  };

  const cancelSale = async () => {
    const res = await ProtonSDK.cancelSale({
      actor: currentUser ? currentUser.actor : '',
      sale_id: saleIds[selectedAssetId],
    });

    if (res.success) {
      setTimeout(() => router.reload, 1000);
    }
  };

  if (
    isLoadingUser ||
    isLoadingLocale ||
    isSaleDataLoading ||
    isTemplateLoading ||
    saleDataError ||
    templateError
  ) {
    return null;
  }

  const { name, image, video } = template.immutable_data;
  return (
    <NftPageContainer>
      <Nft name={name} image={image} video={video} />
      <NftDetails template={template} detailPageText={detailPageText}>
        <NftSaleDropdown
          assets={assets}
          salePrices={salePrices}
          selectedAssetId={selectedAssetId}
          setSelectedAssetId={setSelectedAssetId}
        />
        <Button onClick={saleIds[selectedAssetId] ? cancelSale : createSale}>
          {saleIds[selectedAssetId]
            ? detailPageText.cancelSaleButtonText
            : detailPageText.sellButtonText}
        </Button>
      </NftDetails>
    </NftPageContainer>
  );
};

export default NftSellPage;
