import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingPage, Nft, NftDetails, NftDropdown } from '../../components';
import { useAuthContext } from '../../components/Provider';
import { useFetchNft, useFetchOwnedNfts } from '../../hooks';
import { NftPageContainer, ButtonLink } from '../../styles/templateId.styled';
import { Text } from '../../custom/localization';
import { RouterQuery } from '../../utils/constants';

const MyNftDetailPage: FC<{ text: Text }> = ({ text }) => {
  const { currentUser, isLoadingUser } = useAuthContext();
  const owner = currentUser ? currentUser.actor : '';

  const router = useRouter();
  const { templateId } = router.query as RouterQuery;

  const {
    template,
    isLoading: isTemplateLoading,
    error: templateError,
  } = useFetchNft(templateId);

  const {
    assets,
    saleData: { salePrices, saleIds },
    isLoading: isSaleDataLoading,
    error: saleDataError,
  } = useFetchOwnedNfts({
    templateId,
    owner,
  });

  const [selectedAssetId, setSelectedAssetId] = useState<string>('');

  useEffect(() => {
    if (!currentUser && !isLoadingUser) {
      router.push(`/${templateId}`);
    }
  }, [currentUser, isLoadingUser, templateId]);

  useEffect(() => {
    setSelectedAssetId(assets[0] ? assets[0].asset_id : '');
  }, [assets]);

  if (
    isLoadingUser ||
    isSaleDataLoading ||
    isTemplateLoading ||
    saleDataError ||
    templateError
  ) {
    return <LoadingPage />;
  }

  const {
    template_id,
    collection: { collection_name },
    immutable_data: { name, image, video },
  } = template;

  return (
    <NftPageContainer>
      <Nft name={name} image={image} video={video} />
      <NftDetails template={template} detailPageText={text.detailPage}>
        <NftDropdown
          assets={assets}
          salePrices={salePrices}
          selectedAssetId={selectedAssetId}
          setSelectedAssetId={setSelectedAssetId}
          placeholderDropdownText={text.detailPage.placeholderDropdownText}
        />
        <ButtonLink
          href={`http://protonmarket.com/details/${owner}/${collection_name}/${template_id}`}
          target="_blank"
          rel="noreferrer">
          {saleIds[selectedAssetId]
            ? text.detailPage.cancelSaleButtonText
            : text.detailPage.sellButtonText}
        </ButtonLink>
      </NftDetails>
    </NftPageContainer>
  );
};

export default MyNftDetailPage;
