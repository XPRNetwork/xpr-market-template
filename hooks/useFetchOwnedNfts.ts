import { useState, useEffect } from 'react';
import { Asset, getAllUserAssetsByTemplate } from '../services/assets';
import { SaleData, getSaleDataForTemplate } from '../services/sales';

export const useFetchOwnedNfts = ({
  owner,
  templateId,
}: {
  owner: string;
  templateId: string;
}): {
  assets: Asset[];
  saleData: SaleData;
  isLoading: boolean;
  error: string;
} => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [saleData, setSaleData] = useState<SaleData>({
    saleIds: {},
    salePrices: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (!templateId || !owner) {
        return;
      }

      setIsLoading(true);
      try {
        const userAssets = await getAllUserAssetsByTemplate(templateId, owner);
        setAssets(userAssets);

        const data = await getSaleDataForTemplate(templateId, owner);
        setSaleData(data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    })();
  }, [templateId, owner]);

  return {
    assets,
    saleData,
    isLoading,
    error,
  };
};
