import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Nft, NftDetails } from '../../components';
import { useAuthContext, useLocaleContext } from '../../components/Provider';
import { useFetchNft } from '../../hooks';
import {
  NftPageContainer,
  Button,
  ButtonLink,
  ErrorMessage,
} from '../../styles/templateId.styled';
import ProtonSDK from '../../services/proton';
import { RouterQuery } from '../../utils/constants';
import localizationJson from '../../custom/localization';

const NftDetailPage: FC = () => {
  const {
    currentUser,
    currentUserBalance,
    isLoadingUser,
    updateCurrentUserBalance,
  } = useAuthContext();

  const { locale, isLoadingLocale } = useLocaleContext();
  const detailPageText = localizationJson[locale]
    ? localizationJson[locale].detailPage
    : localizationJson['en'].detailPage;

  const router = useRouter();
  const { collection, templateId } = router.query as RouterQuery;

  const { template, isLoading, error } = useFetchNft({
    collection: collection ? collection.toLowerCase() : '',
    templateId,
  });

  const [purchasingError, setPurchasingError] = useState<string>('');

  const buyAsset = async () => {
    try {
      if (!currentUser) {
        setPurchasingError('You must be logged in to buy.');
        return;
      }

      const balanceAmount = parseFloat(
        currentUserBalance.split(' ')[0].replace(/[,]/g, '')
      );
      const lowestPriceAmount = parseFloat(
        template.lowestPrice.split(' ')[0].replace(/[,]/g, '')
      );
      if (balanceAmount < lowestPriceAmount) {
        setPurchasingError(
          `Insufficient funds: this NFT is listed for ${template.lowestPrice} and your account balance is ${currentUserBalance}. Please add more funds to continue this transaction.`
        );
        return;
      }

      const chainAccount = currentUser.actor;
      const purchaseResult = await ProtonSDK.purchaseSale({
        buyer: chainAccount,
        amount: template.lowestPrice,
        sale_id: template.lowestPriceSaleId,
      });

      if (!purchaseResult.success) {
        throw new Error(purchaseResult.error);
      }

      updateCurrentUserBalance(chainAccount);
      setTimeout(() => router.push('/'), 1000); // TODO: Redirect to user's items page
    } catch (e) {
      setPurchasingError(e.message);
    }
  };

  if (isLoadingUser || isLoadingLocale || isLoading || error) {
    return null;
  }

  const { name, image, video } = template.immutable_data;
  return (
    <NftPageContainer>
      <Nft name={name} image={image} video={video} />
      <NftDetails template={template} detailPageText={detailPageText}>
        {template.lowestPrice ? (
          <Button onClick={buyAsset}>{detailPageText.buyButtonText}</Button>
        ) : (
          <ButtonLink
            href={`http://protonmarket.com/${collection}/${templateId}`}
            target="_blank"
            rel="noreferrer">
            {detailPageText.viewButtonText}
          </ButtonLink>
        )}
        {purchasingError ? (
          <ErrorMessage>{purchasingError}</ErrorMessage>
        ) : null}
      </NftDetails>
    </NftPageContainer>
  );
};

export default NftDetailPage;
