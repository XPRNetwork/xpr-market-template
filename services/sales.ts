import { getFromApi } from '../utils/browser-fetch';
import { toQueryString } from '../utils';
import { TOKEN_SYMBOL } from '../utils/constants';
import { Asset } from './assets';
import { Collection } from './collections';

type Price = {
  token_contract: string;
  token_symbol: string;
  token_precision: number;
  median: number | null;
  amount: number;
};

export type Sale = {
  market_contract: string;
  assets_contract: string;
  sale_id: string;
  seller: string;
  buyer: string;
  offer_id: string;
  price: Price;
  listing_price: string;
  listing_symbol: string;
  assets: Asset[];
  collection_name: string;
  collection: Collection;
  maker_marketplace: string;
  taker_marketplace: string;
  is_seller_contract: boolean;
  updated_at_block: string;
  updated_at_time: string;
  created_at_block: string;
  created_at_time: string;
  state: number;
  asset_serial: string;
};

export const getLowestPriceAsset = async (
  collection: string,
  templateId: string
): Promise<Sale[]> => {
  try {
    const queryObject = {
      collection_name: collection,
      template_id: templateId,
      sort: 'price',
      order: 'asc',
      state: 1, // Assets listed for sale
      limit: 1,
      symbol: TOKEN_SYMBOL,
    };
    const queryString = toQueryString(queryObject);
    const saleRes = await getFromApi<Sale[]>(
      `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicmarket/v1/sales?${queryString}`
    );

    if (!saleRes.success) {
      throw new Error(saleRes.message as unknown as string);
    }

    return saleRes.data;
  } catch (e) {
    throw new Error(e);
  }
};
