import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  NFT_DETAIL_PAGE_TYPES,
  NftDetailPage,
  LoadingPage,
} from '../components';
import { useAuthContext } from '../components/Provider';
import { useFetchNft } from '../hooks';
import ProtonSDK from '../services/proton';
import { formatPrice } from '../utils';
import { RouterQuery, TOKEN_PRECISION } from '../utils/constants';
import { Text } from '../custom/localization';
import customizationJson, { Typography } from '../custom/customization';

const BuyNft: FC<{ text: Text; typography: Typography }> = ({
  text,
  typography,
}) => {
  const {
    currentUser,
    currentUserBalance,
    isLoadingUser,
    login,
    updateCurrentUserBalance,
  } = useAuthContext();

  const router = useRouter();
  const { templateId } = router.query as RouterQuery;

  const { template, isLoading, error } = useFetchNft({
    templateId,
    collection: customizationJson.collection,
  });

  const [purchasingError, setPurchasingError] = useState<string>('');

  useEffect(() => {
    if (error.includes('not found')) {
      router.push('/');
    }
  }, [error]);

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
        amount: formatPrice(template.lowestPrice, TOKEN_PRECISION),
        sale_id: template.lowestPriceSaleId,
      });

      if (!purchaseResult.success) {
        throw new Error(purchaseResult.error);
      }

      updateCurrentUserBalance(chainAccount);
      setTimeout(() => router.push('/my-items'), 1000);
    } catch (e) {
      setPurchasingError(e.message);
    }
  };

  if (isLoadingUser || isLoading || error) {
    return <LoadingPage />;
  }

  return (
    <NftDetailPage
      type={NFT_DETAIL_PAGE_TYPES.BUY}
      template={template}
      detailPageStyles={customizationJson.detailPage}
      detailPageText={text.detailPage}
      buyPageProps={{
        onButtonClick: currentUser && !isLoadingUser ? buyAsset : login,
        purchasingError,
      }}
      typography={typography}
    />
  );
};

export default BuyNft;
