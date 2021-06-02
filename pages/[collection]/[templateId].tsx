import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Nft, NftDetails } from '../../components';
import { useAuthContext } from '../../components/Provider';
import { useFetchNft } from '../../hooks';
import {
  NftPageContainer,
  Button,
  ErrorMessage,
} from '../../styles/templateId.styled';
import ProtonSDK from '../../services/proton';
import { RouterQuery } from '../../utils/constants';

const NftDetailPage: FC = () => {
  const {
    currentUser,
    currentUserBalance,
    isLoadingUser,
    updateCurrentUserBalance,
  } = useAuthContext();
  const router = useRouter();
  const { collection: caseSensitiveCollection, templateId } =
    router.query as RouterQuery;
  const collection = caseSensitiveCollection
    ? caseSensitiveCollection.toLowerCase()
    : '';
  const { template, isLoading, error } = useFetchNft({
    collection,
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

  const getContent = () => {
    if (isLoadingUser || isLoading || error) {
      return null;
    }

    const { name, image, video } = template.immutable_data;
    return (
      <>
        <Nft name={name} image={image} video={video} />
        <NftDetails template={template}>
          <Button onClick={buyAsset}>BUY NOW</Button>
          {purchasingError ? (
            <ErrorMessage>{purchasingError}</ErrorMessage>
          ) : null}
        </NftDetails>
      </>
    );
  };

  return <NftPageContainer>{getContent()}</NftPageContainer>;
};

export default NftDetailPage;
